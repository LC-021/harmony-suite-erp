import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Search, FileDown, MoreHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { pedidos, currency, type PedidoStatus } from "@/lib/mock-data";

const statusFilters: (PedidoStatus | "Todos")[] = [
  "Todos",
  "Aguardando pagamento",
  "Pagamento confirmado",
  "Separação",
  "Em transporte",
  "Concluído",
  "Cancelado",
];

export const Route = createFileRoute("/pedidos")({
  head: () => ({ meta: [{ title: "Pedidos · Colchões & Cia" }] }),
  component: Pedidos,
});

function Pedidos() {
  const [q, setQ] = useState("");
  const [filtro, setFiltro] = useState<(typeof statusFilters)[number]>("Todos");

  const filtered = pedidos.filter(
    (p) =>
      (filtro === "Todos" || p.status === filtro) &&
      (q === "" ||
        p.numero.toLowerCase().includes(q.toLowerCase()) ||
        p.cliente.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <div className="space-y-4">
      <PageHeader
        title="Pedidos"
        description="Cadastro, pesquisa e acompanhamento de pedidos"
        actions={
          <>
            <Button variant="outline" size="sm"><FileDown className="h-4 w-4 mr-1.5" /> Exportar</Button>
            <Button size="sm" className="bg-gradient-primary shadow-glow"><Plus className="h-4 w-4 mr-1.5" /> Novo pedido</Button>
          </>
        }
      />

      <Card className="shadow-card">
        <CardContent className="p-4 space-y-3">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por número ou cliente…" className="pl-8" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {statusFilters.map((s) => (
                <button
                  key={s}
                  onClick={() => setFiltro(s)}
                  className={`text-xs px-2.5 py-1.5 rounded-md border transition-colors ${
                    filtro === s
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:bg-muted/60"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto rounded-md border border-border/60">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase text-muted-foreground bg-muted/30">
                <tr>
                  <th className="text-left px-3 py-2.5">Pedido</th>
                  <th className="text-left px-3 py-2.5">Cliente</th>
                  <th className="text-center px-3 py-2.5">Itens</th>
                  <th className="text-right px-3 py-2.5">Valor</th>
                  <th className="text-left px-3 py-2.5">Data</th>
                  <th className="text-left px-3 py-2.5">Status</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-t border-border/60 hover:bg-muted/40">
                    <td className="px-3 py-2.5 font-medium">
                      <Link to="/pedidos" className="hover:text-primary">{p.numero}</Link>
                    </td>
                    <td className="px-3 py-2.5">{p.cliente}</td>
                    <td className="px-3 py-2.5 text-center tabular-nums">{p.itens}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums font-medium">{currency(p.valor)}</td>
                    <td className="px-3 py-2.5 text-muted-foreground">{p.data}</td>
                    <td className="px-3 py-2.5"><StatusBadge status={p.status} /></td>
                    <td className="px-2 py-2.5">
                      <Button size="icon" variant="ghost" className="h-7 w-7">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="text-center py-10 text-sm text-muted-foreground">Nenhum pedido encontrado.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
