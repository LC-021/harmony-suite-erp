import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { financeiroMensal, currency } from "@/lib/mock-data";

export const Route = createFileRoute("/financeiro")({
  head: () => ({ meta: [{ title: "Financeiro · Colchões & Cia" }] }),
  component: Financeiro,
});

const movimentos = [
  { id: 1, tipo: "Entrada", descricao: "Pix · PD-10225", valor: 3200, data: "2026-07-06 17:26" },
  { id: 2, tipo: "Saída", descricao: "Boleto · Imobiliária Central", valor: -12000, data: "2026-07-05 10:12" },
  { id: 3, tipo: "Entrada", descricao: "Cartão · PD-10232", valor: 2390, data: "2026-07-07 09:45" },
  { id: 4, tipo: "Saída", descricao: "Fornecedor · Pikolin", valor: -24500, data: "2026-07-03 14:20" },
  { id: 5, tipo: "Entrada", descricao: "Dinheiro · PD-10230", valor: 3560, data: "2026-07-06 16:30" },
];

export function Financeiro() {
  const entradas = financeiroMensal.at(-1)?.entradas ?? 0;
  const saidas = financeiroMensal.at(-1)?.saidas ?? 0;
  const saldo = entradas - saidas;

  return (
    <div className="space-y-4">
      <PageHeader title="Caixa & Fluxo Financeiro" description="Entradas, saídas, Pix e boletos" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Card className="shadow-card"><CardContent className="p-4">
          <p className="text-xs uppercase text-muted-foreground">Saldo do mês</p>
          <p className="mt-2 text-2xl font-semibold text-primary">{currency(saldo)}</p>
        </CardContent></Card>
        <Card className="shadow-card"><CardContent className="p-4 flex items-start justify-between">
          <div><p className="text-xs uppercase text-muted-foreground">Entradas</p>
          <p className="mt-2 text-2xl font-semibold text-success">{currency(entradas)}</p></div>
          <TrendingUp className="h-5 w-5 text-success" />
        </CardContent></Card>
        <Card className="shadow-card"><CardContent className="p-4 flex items-start justify-between">
          <div><p className="text-xs uppercase text-muted-foreground">Saídas</p>
          <p className="mt-2 text-2xl font-semibold text-destructive">{currency(saidas)}</p></div>
          <TrendingDown className="h-5 w-5 text-destructive" />
        </CardContent></Card>
        <Card className="shadow-card"><CardContent className="p-4 flex items-start justify-between">
          <div><p className="text-xs uppercase text-muted-foreground">Contas a receber</p>
          <p className="mt-2 text-2xl font-semibold">{currency(48900)}</p></div>
          <Wallet className="h-5 w-5 text-primary" />
        </CardContent></Card>
      </div>

      <Card className="shadow-card">
        <CardHeader className="pb-2"><CardTitle className="text-base">Fluxo de caixa</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={financeiroMensal}>
              <defs>
                <linearGradient id="fe" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-success)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--color-success)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-destructive)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--color-destructive)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="mes" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickFormatter={(v) => `${v/1000}k`} />
              <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} formatter={(v: number) => currency(v)} />
              <Area type="monotone" dataKey="entradas" stroke="var(--color-success)" strokeWidth={2} fill="url(#fe)" />
              <Area type="monotone" dataKey="saidas" stroke="var(--color-destructive)" strokeWidth={2} fill="url(#fs)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader className="pb-2"><CardTitle className="text-base">Últimos movimentos</CardTitle></CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase text-muted-foreground border-b border-border">
              <tr>
                <th className="text-left px-4 py-2">Tipo</th>
                <th className="text-left px-4 py-2">Descrição</th>
                <th className="text-left px-4 py-2">Data</th>
                <th className="text-right px-4 py-2">Valor</th>
              </tr>
            </thead>
            <tbody>
              {movimentos.map((m) => (
                <tr key={m.id} className="border-b border-border/60 hover:bg-muted/40">
                  <td className="px-4 py-2.5">
                    <span className={`inline-flex items-center gap-1 text-xs ${m.valor > 0 ? "text-success" : "text-destructive"}`}>
                      {m.valor > 0 ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />} {m.tipo}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">{m.descricao}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{m.data}</td>
                  <td className={`px-4 py-2.5 text-right tabular-nums font-medium ${m.valor > 0 ? "text-success" : "text-destructive"}`}>
                    {currency(m.valor)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
