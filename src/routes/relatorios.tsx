import { createFileRoute } from "@tanstack/react-router";
import { FileText, FileSpreadsheet, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/relatorios")({
  head: () => ({ meta: [{ title: "Relatórios · Colchões & Cia" }] }),
  component: Relatorios,
});

const reports = [
  { titulo: "Pedidos", desc: "Vendas, status e ticket médio" },
  { titulo: "Financeiro", desc: "Fluxo de caixa, entradas e saídas" },
  { titulo: "Boletos", desc: "Contas a pagar, pagos e vencidos" },
  { titulo: "Funcionários", desc: "Presença, horas e produtividade" },
  { titulo: "Banco de horas", desc: "Extras, negativas e faltas" },
  { titulo: "Clientes", desc: "Base ativa e histórico de compras" },
  { titulo: "Produtos", desc: "Giro, estoque e margem" },
  { titulo: "Auditoria", desc: "Ações completas do sistema" },
];

function Relatorios() {
  return (
    <div className="space-y-4">
      <PageHeader title="Relatórios" description="Exportação para PDF e Excel" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {reports.map((r) => (
          <Card key={r.titulo} className="shadow-card hover:border-primary/40 transition-colors">
            <CardContent className="p-4">
              <p className="text-base font-semibold">{r.titulo}</p>
              <p className="text-xs text-muted-foreground mt-1 min-h-[32px]">{r.desc}</p>
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline" className="flex-1"><FileText className="h-4 w-4 mr-1" /> PDF</Button>
                <Button size="sm" variant="outline" className="flex-1"><FileSpreadsheet className="h-4 w-4 mr-1" /> Excel</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="shadow-card bg-gradient-surface border-primary/30">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="rounded-lg bg-primary/15 p-2 text-primary"><Download className="h-5 w-5" /></div>
          <div className="text-sm">
            <p className="font-medium">Exportações agendadas</p>
            <p className="text-xs text-muted-foreground">Configure envios automáticos por e-mail para o CEO e diretores.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
