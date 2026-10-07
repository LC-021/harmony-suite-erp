import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";

export const Route = createFileRoute("/logistica")({
  head: () => ({ meta: [
    { title: "Logística · Colchões & Cia" },
    { name: "description", content: "Rotas, entregas, veículos e motoristas." },
    { property: "og:title", content: "Logística · Colchões & Cia" },
    { property: "og:description", content: "Gestão de entregas e rotas." },
  ] }),
  component: () => (
    <ModulePage title="Logística" description="Rotas de entrega, veículos e motoristas" novo="Nova rota"
      kpis={[{ label: "Rotas hoje", value: "6" }, { label: "Entregas previstas", value: "38" }, { label: "Entregues", value: "22" }, { label: "No prazo", value: "96%" }]}
      headers={["Motorista", "Veículo", "Entregas", "Região"]}
      statuses={["Planejada", "Em rota", "Concluída"]}
      rows={[
        { id: "ROTA-88", cols: ["José Ferreira", "Caminhão ABC-1D23", "8", "Zona Sul"], status: "Em rota" },
        { id: "ROTA-87", cols: ["André Melo", "Van DEF-4G56", "6", "Centro"], status: "Em rota" },
        { id: "ROTA-86", cols: ["Ricardo Luz", "Caminhão GHI-7J89", "10", "Zona Norte"], status: "Planejada" },
        { id: "ROTA-85", cols: ["Sérgio Prado", "Van KLM-0N12", "7", "Zona Leste"], status: "Concluída" },
      ]} />
  ),
});
