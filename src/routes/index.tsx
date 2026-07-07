import { createFileRoute } from "@tanstack/react-router";
import {
  ShoppingCart,
  Clock,
  CheckCircle2,
  Package,
  Users,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  UserCheck,
  UserX,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import {
  pedidos,
  funcionarios,
  vendasSemanais,
  financeiroMensal,
  notificacoes,
  currency,
} from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function StatCard({
  title,
  value,
  hint,
  icon: Icon,
  tone = "primary",
}: {
  title: string;
  value: string;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  tone?: "primary" | "success" | "warning" | "info" | "destructive";
}) {
  const toneMap = {
    primary: "text-primary bg-primary/10",
    success: "text-success bg-success/10",
    warning: "text-warning bg-warning/10",
    info: "text-info bg-info/10",
    destructive: "text-destructive bg-destructive/10",
  } as const;
  return (
    <Card className="shadow-card border-border/60 hover:border-primary/40 transition-colors">
      <CardContent className="p-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{title}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
          {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
        </div>
        <div className={`rounded-lg p-2.5 ${toneMap[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  );
}

function Dashboard() {
  const hoje = pedidos.filter((p) => p.data === "2026-07-07");
  const aguardando = pedidos.filter((p) => p.status === "Aguardando pagamento").length;
  const pagos = pedidos.filter((p) => p.status === "Pagamento confirmado").length;
  const separacao = pedidos.filter((p) => p.status === "Separação").length;
  const finalizados = pedidos.filter((p) => p.status === "Concluído").length;
  const presentes = funcionarios.filter((f) => f.presente).length;
  const ausentes = funcionarios.length - presentes;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Visão geral operacional · terça-feira, 7 de julho de 2026"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        <StatCard title="Pedidos do dia" value={String(hoje.length)} hint="+12% vs. ontem" icon={ShoppingCart} tone="primary" />
        <StatCard title="Aguardando Pix" value={String(aguardando)} hint="Requer confirmação" icon={Clock} tone="warning" />
        <StatCard title="Pagos" value={String(pagos)} hint="Prontos p/ separação" icon={CheckCircle2} tone="success" />
        <StatCard title="Em separação" value={String(separacao)} icon={Package} tone="info" />
        <StatCard title="Finalizados" value={String(finalizados)} hint="Hoje" icon={CheckCircle2} tone="success" />
        <StatCard title="Alertas" value={String(notificacoes.filter(n => n.tipo !== "success").length)} hint="Nas últimas 24h" icon={AlertTriangle} tone="destructive" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <StatCard title="Funcionários presentes" value={`${presentes}/${funcionarios.length}`} icon={UserCheck} tone="success" />
        <StatCard title="Ausentes" value={String(ausentes)} icon={UserX} tone="destructive" />
        <StatCard title="Receita do dia" value={currency(hoje.reduce((s, p) => s + p.valor, 0))} icon={DollarSign} tone="primary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Vendas na semana</CardTitle>
                <p className="text-xs text-muted-foreground">Faturamento diário vs. meta</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-success">
                <TrendingUp className="h-4 w-4" /> +18,4%
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={vendasSemanais}>
                <defs>
                  <linearGradient id="gv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="dia" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickFormatter={(v) => `${v/1000}k`} />
                <Tooltip
                  contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }}
                  formatter={(v: number) => currency(v)}
                />
                <Area type="monotone" dataKey="vendas" stroke="var(--color-primary)" strokeWidth={2} fill="url(#gv)" />
                <Area type="monotone" dataKey="meta" stroke="var(--color-muted-foreground)" strokeDasharray="4 4" fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Financeiro · 6 meses</CardTitle>
            <p className="text-xs text-muted-foreground">Entradas vs. saídas</p>
          </CardHeader>
          <CardContent className="pt-2">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={financeiroMensal}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="mes" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickFormatter={(v) => `${v/1000}k`} />
                <Tooltip
                  contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }}
                  formatter={(v: number) => currency(v)}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="entradas" fill="var(--color-success)" radius={[4,4,0,0]} />
                <Bar dataKey="saidas" fill="var(--color-destructive)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Últimos pedidos</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs uppercase text-muted-foreground border-b border-border">
                  <tr>
                    <th className="text-left px-4 py-2">Pedido</th>
                    <th className="text-left px-4 py-2">Cliente</th>
                    <th className="text-right px-4 py-2">Valor</th>
                    <th className="text-left px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.slice(0, 6).map((p) => (
                    <tr key={p.id} className="border-b border-border/60 hover:bg-muted/40">
                      <td className="px-4 py-2.5 font-medium">{p.numero}</td>
                      <td className="px-4 py-2.5">{p.cliente}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums">{currency(p.valor)}</td>
                      <td className="px-4 py-2.5"><StatusBadge status={p.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2 flex-row items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" /> Alertas & notificações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {notificacoes.slice(0, 5).map((n) => (
              <div key={n.id} className="flex items-start gap-3 rounded-md border border-border/60 p-2.5 hover:bg-muted/40 transition-colors">
                <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                  n.tipo === "error" ? "bg-destructive" :
                  n.tipo === "warning" ? "bg-warning" :
                  n.tipo === "success" ? "bg-success" : "bg-info"
                }`} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{n.titulo}</p>
                  <p className="text-xs text-muted-foreground truncate">{n.descricao}</p>
                </div>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap">{n.tempo}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
