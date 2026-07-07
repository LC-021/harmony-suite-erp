import { createFileRoute } from "@tanstack/react-router";
import { Boxes, ArrowDownToLine, ArrowUpFromLine, ClipboardList, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { produtos, currency } from "@/lib/mock-data";

export const Route = createFileRoute("/estoque")({
  head: () => ({ meta: [{ title: "Estoque · Colchões & Cia" }] }),
  component: Estoque,
});

const movs = [
  { id: 1, tipo: "Entrada", produto: "Colchão Bold 1,58", qtd: 4, data: "07/07 09:00", origem: "NF 45231" },
  { id: 2, tipo: "Saída", produto: "Colchão Vitamin 1,58", qtd: 1, data: "07/07 08:30", origem: "PD-10233" },
  { id: 3, tipo: "Separação", produto: "Box Baú MTX 1,93", qtd: 1, data: "07/07 08:12", origem: "PD-10232" },
  { id: 4, tipo: "Entrada", produto: "Poltrona Studio Plus", qtd: 3, data: "06/07 16:20", origem: "NF 45219" },
];

function Estoque() {
  const total = produtos.reduce((s, p) => s + p.estoque, 0);
  const baixo = produtos.filter((p) => p.estoque > 0 && p.estoque <= 2);
  const zerado = produtos.filter((p) => p.estoque === 0);
  const valorTotal = produtos.reduce((s, p) => s + p.estoque * (p.valorPromocional ?? p.valorTabela), 0);

  return (
    <div className="space-y-4">
      <PageHeader title="Estoque" description="Entradas, saídas, separação e inventário" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="shadow-card"><CardContent className="p-4 flex items-start justify-between">
          <div><p className="text-xs uppercase text-muted-foreground">Itens em estoque</p>
          <p className="mt-2 text-2xl font-semibold">{total}</p></div>
          <Boxes className="h-5 w-5 text-primary" />
        </CardContent></Card>
        <Card className="shadow-card"><CardContent className="p-4">
          <p className="text-xs uppercase text-muted-foreground">Valor total</p>
          <p className="mt-2 text-2xl font-semibold">{currency(valorTotal)}</p>
        </CardContent></Card>
        <Card className="shadow-card"><CardContent className="p-4 flex items-start justify-between">
          <div><p className="text-xs uppercase text-muted-foreground">Estoque baixo</p>
          <p className="mt-2 text-2xl font-semibold text-warning">{baixo.length}</p></div>
          <AlertTriangle className="h-5 w-5 text-warning" />
        </CardContent></Card>
        <Card className="shadow-card"><CardContent className="p-4">
          <p className="text-xs uppercase text-muted-foreground">Sob encomenda</p>
          <p className="mt-2 text-2xl font-semibold">{zerado.length}</p>
        </CardContent></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-card">
          <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><ClipboardList className="h-4 w-4" /> Movimentações recentes</CardTitle></CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase text-muted-foreground border-b border-border">
                <tr>
                  <th className="text-left px-4 py-2">Tipo</th>
                  <th className="text-left px-4 py-2">Produto</th>
                  <th className="text-right px-4 py-2">Qtd</th>
                  <th className="text-left px-4 py-2">Origem</th>
                  <th className="text-left px-4 py-2">Data</th>
                </tr>
              </thead>
              <tbody>
                {movs.map((m) => (
                  <tr key={m.id} className="border-b border-border/60 hover:bg-muted/40">
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex items-center gap-1 text-xs ${
                        m.tipo === "Entrada" ? "text-success" : m.tipo === "Saída" ? "text-destructive" : "text-info"
                      }`}>
                        {m.tipo === "Entrada" ? <ArrowDownToLine className="h-3.5 w-3.5" /> : <ArrowUpFromLine className="h-3.5 w-3.5" />}
                        {m.tipo}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">{m.produto}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums">{m.qtd}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{m.origem}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{m.data}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card className="shadow-card border-warning/40">
          <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-warning" /> Estoque crítico</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {baixo.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-md border border-border/60 p-2.5">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{p.nome} {p.medidas && <span className="text-muted-foreground font-normal">· {p.medidas}</span>}</p>
                  <p className="text-xs text-muted-foreground">{p.codigo} · {p.marca}</p>
                </div>
                <span className="text-warning font-semibold text-sm">{p.estoque} un.</span>
              </div>
            ))}
            {zerado.slice(0, 3).map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-md border border-border/60 p-2.5">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{p.nome} {p.medidas && <span className="text-muted-foreground font-normal">· {p.medidas}</span>}</p>
                  <p className="text-xs text-muted-foreground">{p.codigo} · {p.marca}</p>
                </div>
                <StatusBadge status="Sob encomenda" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
