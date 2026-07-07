import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X, MessageSquare, QrCode } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { pixPagamentos as initial, currency } from "@/lib/mock-data";

export const Route = createFileRoute("/pix")({
  head: () => ({ meta: [{ title: "Pix · Colchões & Cia" }] }),
  component: Pix,
});

function Pix() {
  const [items, setItems] = useState(initial);

  const confirmar = (id: string) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, status: "Confirmado" } : p)));
    toast.success("Pagamento confirmado", { description: "Pedido marcado como Pago · registrado no histórico" });
  };
  const rejeitar = (id: string) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, status: "Rejeitado" } : p)));
    toast.error("Pagamento rejeitado");
  };

  const pendentes = items.filter((p) => p.status === "Pendente");
  const historico = items.filter((p) => p.status !== "Pendente");

  return (
    <div className="space-y-4">
      <PageHeader title="Pix · Confirmação de pagamentos" description="Aprovação restrita ao CEO e Financeiro" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <p className="text-xs uppercase text-muted-foreground">Pendentes</p>
            <p className="mt-2 text-2xl font-semibold text-warning">{pendentes.length}</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <p className="text-xs uppercase text-muted-foreground">Valor pendente</p>
            <p className="mt-2 text-2xl font-semibold">{currency(pendentes.reduce((s, p) => s + p.valor, 0))}</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <p className="text-xs uppercase text-muted-foreground">Confirmados hoje</p>
            <p className="mt-2 text-2xl font-semibold text-success">
              {items.filter((p) => p.status === "Confirmado").length}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2"><QrCode className="h-4 w-4" /> Pagamentos pendentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {pendentes.length === 0 && (
            <p className="text-sm text-muted-foreground py-6 text-center">Nenhum pagamento pendente 🎉</p>
          )}
          {pendentes.map((p) => (
            <div key={p.id} className="flex flex-col md:flex-row md:items-center gap-3 rounded-lg border border-border/60 p-3 hover:border-primary/40 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{p.pedido}</span>
                  <StatusBadge status={p.status} />
                </div>
                <p className="text-sm text-muted-foreground">{p.cliente} · {p.data}</p>
              </div>
              <div className="text-lg font-semibold tabular-nums">{currency(p.valor)}</div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline"><MessageSquare className="h-4 w-4 mr-1" /> Observação</Button>
                <Button size="sm" variant="destructive" onClick={() => rejeitar(p.id)}><X className="h-4 w-4 mr-1" /> Rejeitar</Button>
                <Button size="sm" className="bg-success text-success-foreground hover:bg-success/90" onClick={() => confirmar(p.id)}>
                  <Check className="h-4 w-4 mr-1" /> Confirmar
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Histórico</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase text-muted-foreground border-b border-border">
              <tr>
                <th className="text-left px-4 py-2">Pedido</th>
                <th className="text-left px-4 py-2">Cliente</th>
                <th className="text-right px-4 py-2">Valor</th>
                <th className="text-left px-4 py-2">Data</th>
                <th className="text-left px-4 py-2">Status</th>
                <th className="text-left px-4 py-2">Observação</th>
              </tr>
            </thead>
            <tbody>
              {historico.map((p) => (
                <tr key={p.id} className="border-b border-border/60 hover:bg-muted/40">
                  <td className="px-4 py-2.5 font-medium">{p.pedido}</td>
                  <td className="px-4 py-2.5">{p.cliente}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums">{currency(p.valor)}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{p.data}</td>
                  <td className="px-4 py-2.5"><StatusBadge status={p.status} /></td>
                  <td className="px-4 py-2.5 text-muted-foreground">{p.observacao ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
