import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";

export const Route = createFileRoute("/compras")({
  head: () => ({ meta: [
    { title: "Compras · Colchões & Cia" },
    { name: "description", content: "Pedidos de compra, cotações e fornecedores." },
    { property: "og:title", content: "Compras · Colchões & Cia" },
    { property: "og:description", content: "Gestão de compras e fornecedores." },
  ] }),
  component: () => (
    <ModulePage title="Compras" description="Cotações, pedidos de compra e recebimento de fornecedores" novo="Novo pedido de compra"
      kpis={[{ label: "Cotações abertas", value: "6" }, { label: "Aguardando aprovação", value: "4" }, { label: "Em trânsito", value: "9" }, { label: "Compras no mês", value: "R$ 186 mil" }]}
      headers={["Fornecedor", "Itens", "Valor", "Previsão"]}
      statuses={["Cotação", "Aguardando aprovação", "Em trânsito", "Recebido"]}
      rows={[
        { id: "OC-3308", cols: ["Ortobom", "40 colchões", "R$ 52.400,00", "15/10/2026"], status: "Aguardando aprovação" },
        { id: "OC-3307", cols: ["Castor", "25 colchões", "R$ 38.750,00", "12/10/2026"], status: "Em trânsito" },
        { id: "OC-3306", cols: ["Móveis Sul", "18 cabeceiras", "R$ 12.600,00", "20/10/2026"], status: "Cotação" },
        { id: "OC-3305", cols: ["Herval", "30 box", "R$ 27.000,00", "02/10/2026"], status: "Recebido" },
      ]} />
  ),
});
