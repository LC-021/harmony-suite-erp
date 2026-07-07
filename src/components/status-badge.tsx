import { cn } from "@/lib/utils";

const map: Record<string, string> = {
  "Aguardando pagamento": "bg-warning/15 text-warning border-warning/30",
  "Pagamento confirmado": "bg-info/15 text-info border-info/30",
  "Separação": "bg-primary/15 text-primary border-primary/30",
  "Em transporte": "bg-chart-5/15 text-chart-5 border-chart-5/30",
  "Concluído": "bg-success/15 text-success border-success/30",
  "Cancelado": "bg-destructive/15 text-destructive border-destructive/30",
  "Pendente": "bg-warning/15 text-warning border-warning/30",
  "Confirmado": "bg-success/15 text-success border-success/30",
  "Rejeitado": "bg-destructive/15 text-destructive border-destructive/30",
  "Enviado ao CEO": "bg-info/15 text-info border-info/30",
  "Aguardando Aprovação": "bg-warning/15 text-warning border-warning/30",
  "Aprovado": "bg-success/15 text-success border-success/30",
  "Pago": "bg-success/15 text-success border-success/30",
  "Em estoque": "bg-success/15 text-success border-success/30",
  "Sob encomenda": "bg-warning/15 text-warning border-warning/30",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        map[status] ?? "bg-muted text-muted-foreground border-border",
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
