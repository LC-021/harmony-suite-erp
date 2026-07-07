import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Printer, Send, Search, FileDown, AlertTriangle, ScanLine } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { boletos as initial, currency, type BoletoStatus } from "@/lib/mock-data";

export const Route = createFileRoute("/boletos")({
  head: () => ({ meta: [{ title: "Boletos · Colchões & Cia" }] }),
  component: Boletos,
});

const statusFilters: (BoletoStatus | "Todos")[] = [
  "Todos", "Pendente", "Enviado ao CEO", "Aguardando Aprovação", "Aprovado", "Pago", "Rejeitado", "Cancelado",
];

function Boletos() {
  const [items, setItems] = useState(initial);
  const [q, setQ] = useState("");
  const [filtro, setFiltro] = useState<(typeof statusFilters)[number]>("Todos");

  const enviarCEO = (id: string) => {
    setItems((prev) => prev.map((b) => (b.id === id ? { ...b, enviadoCEO: true, status: "Enviado ao CEO" } : b)));
    toast.success("Boleto enviado ao CEO", { description: "PDF anexado · e-mail registrado no histórico" });
  };
  const imprimir = () => toast.info("Abrindo boleto para impressão…");

  const filtered = items.filter(
    (b) =>
      (filtro === "Todos" || b.status === filtro) &&
      (q === "" || b.fornecedor.toLowerCase().includes(q.toLowerCase()) || b.numero.includes(q)),
  );

  const hoje = new Date("2026-07-07").getTime();
  const total = items.reduce((s, b) => s + b.valor, 0);
  const vencidos = items.filter((b) => new Date(b.vencimento).getTime() < hoje && b.status !== "Pago").length;
  const vencendoHoje = items.filter((b) => b.vencimento === "2026-07-07").length;
  const semEnvio = items.filter((b) => !b.enviadoCEO).length;

  return (
    <div className="space-y-4">
      <PageHeader
        title="Gestão de Boletos"
        description="Fornecedores, despesas e contas a pagar · aprovação do CEO"
        actions={
          <>
            <Button size="sm" variant="outline"><ScanLine className="h-4 w-4 mr-1.5" /> OCR (PDF/Foto)</Button>
            <Button size="sm" variant="outline"><FileDown className="h-4 w-4 mr-1.5" /> Exportar</Button>
            <Button size="sm" className="bg-gradient-primary shadow-glow"><Plus className="h-4 w-4 mr-1.5" /> Novo boleto</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="shadow-card"><CardContent className="p-4">
          <p className="text-xs uppercase text-muted-foreground">Total a pagar</p>
          <p className="mt-2 text-2xl font-semibold">{currency(total)}</p>
        </CardContent></Card>
        <Card className="shadow-card"><CardContent className="p-4">
          <p className="text-xs uppercase text-muted-foreground">Vencendo hoje</p>
          <p className="mt-2 text-2xl font-semibold text-warning">{vencendoHoje}</p>
        </CardContent></Card>
        <Card className="shadow-card"><CardContent className="p-4">
          <p className="text-xs uppercase text-muted-foreground">Vencidos</p>
          <p className="mt-2 text-2xl font-semibold text-destructive">{vencidos}</p>
        </CardContent></Card>
        <Card className="shadow-card border-warning/40"><CardContent className="p-4 flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
          <div>
            <p className="text-xs uppercase text-muted-foreground">Sem envio ao CEO</p>
            <p className="mt-1 text-2xl font-semibold text-warning">{semEnvio}</p>
          </div>
        </CardContent></Card>
      </div>

      <Card className="shadow-card">
        <CardContent className="p-4 space-y-3">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar fornecedor ou nº do boleto…" className="pl-8" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {statusFilters.map((s) => (
                <button key={s} onClick={() => setFiltro(s)}
                  className={`text-xs px-2.5 py-1.5 rounded-md border transition-colors ${
                    filtro === s ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted/60"
                  }`}>{s}</button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto rounded-md border border-border/60">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase text-muted-foreground bg-muted/30">
                <tr>
                  <th className="text-left px-3 py-2.5">Fornecedor</th>
                  <th className="text-left px-3 py-2.5">Categoria</th>
                  <th className="text-right px-3 py-2.5">Valor</th>
                  <th className="text-left px-3 py-2.5">Vencimento</th>
                  <th className="text-left px-3 py-2.5">Status</th>
                  <th className="text-right px-3 py-2.5">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr key={b.id} className="border-t border-border/60 hover:bg-muted/40">
                    <td className="px-3 py-2.5 font-medium">{b.fornecedor}</td>
                    <td className="px-3 py-2.5 text-muted-foreground">{b.categoria}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums font-medium">{currency(b.valor)}</td>
                    <td className="px-3 py-2.5">{b.vencimento}</td>
                    <td className="px-3 py-2.5"><StatusBadge status={b.status} /></td>
                    <td className="px-3 py-2.5">
                      <div className="flex justify-end gap-1">
                        <Button size="sm" variant="ghost" onClick={imprimir}><Printer className="h-4 w-4" /></Button>
                        <Button size="sm" variant={b.enviadoCEO ? "ghost" : "default"}
                          className={!b.enviadoCEO ? "bg-gradient-primary" : ""}
                          onClick={() => enviarCEO(b.id)} disabled={b.enviadoCEO}>
                          <Send className="h-4 w-4 mr-1" /> {b.enviadoCEO ? "Enviado" : "CEO"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
