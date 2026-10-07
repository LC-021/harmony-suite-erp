import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";

export const Route = createFileRoute("/logistica-reversa")({
  head: () => ({ meta: [
    { title: "Logística Reversa · Colchões & Cia" },
    { name: "description", content: "Devoluções, trocas e coletas de produtos." },
    { property: "og:title", content: "Logística Reversa · Colchões & Cia" },
    { property: "og:description", content: "Controle de devoluções e trocas." },
  ] }),
  component: () => (
    <ModulePage title="Logística Reversa" description="Devoluções, trocas, coletas e reaproveitamento" novo="Nova coleta"
      kpis={[{ label: "Coletas agendadas", value: "8" }, { label: "Em análise", value: "5" }, { label: "Trocas no mês", value: "21" }, { label: "Taxa de devolução", value: "2,4%" }]}
      headers={["Cliente", "Pedido", "Motivo", "Coleta"]}
      statuses={["Agendada", "Coletado", "Em análise", "Finalizada"]}
      rows={[
        { id: "REV-210", cols: ["Fernanda Gomes", "PED-10201", "Defeito de fabricação", "09/10/2026"], status: "Agendada" },
        { id: "REV-209", cols: ["Marcos Silva", "PED-10187", "Medida errada", "06/10/2026"], status: "Coletado" },
        { id: "REV-208", cols: ["Juliana Reis", "PED-10175", "Arrependimento (7 dias)", "04/10/2026"], status: "Em análise" },
        { id: "REV-207", cols: ["Pedro Nunes", "PED-10160", "Avaria no transporte", "01/10/2026"], status: "Finalizada" },
      ]} />
  ),
});
