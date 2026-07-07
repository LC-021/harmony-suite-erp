import { createFileRoute } from "@tanstack/react-router";
import { Bell, AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { notificacoes } from "@/lib/mock-data";

export const Route = createFileRoute("/notificacoes")({
  head: () => ({ meta: [{ title: "Notificações · Colchões & Cia" }] }),
  component: Notificacoes,
});

const icons = {
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle2,
} as const;

const tones = {
  error: "text-destructive bg-destructive/10 border-destructive/30",
  warning: "text-warning bg-warning/10 border-warning/30",
  info: "text-info bg-info/10 border-info/30",
  success: "text-success bg-success/10 border-success/30",
} as const;

function Notificacoes() {
  return (
    <div className="space-y-4">
      <PageHeader title="Notificações" description="Alertas do sistema, financeiro e operações" />
      <Card className="shadow-card">
        <CardContent className="p-4 space-y-2">
          {notificacoes.map((n) => {
            const Icon = icons[n.tipo];
            return (
              <div key={n.id} className={`flex items-start gap-3 rounded-lg border p-3 ${tones[n.tipo]}`}>
                <Icon className="h-5 w-5 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{n.titulo}</p>
                  <p className="text-sm opacity-80 mt-0.5">{n.descricao}</p>
                </div>
                <span className="text-xs opacity-70 whitespace-nowrap">{n.tempo}</span>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
