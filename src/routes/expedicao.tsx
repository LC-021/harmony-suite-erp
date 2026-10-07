import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";

export const Route = createFileRoute("/expedicao")({
  head: () => ({ meta: [
    { title: "Expedição · Colchões & Cia" },
    { name: "description", content: "Separação, conferência e carregamento de pedidos." },
    { property: "og:title", content: "Expedição · Colchões & Cia" },
    { property: "og:description", content: "Controle de expedição de pedidos." },
  ] }),
  component: () => (
    <ModulePage title="Expedição" description="Separação, conferência, embalagem e carregamento" novo="Nova ordem de separação"
      kpis={[{ label: "A separar", value: "24" }, { label: "Em conferência", value: "7" }, { label: "Prontos p/ carregar", value: "12" }, { label: "Expedidos hoje", value: "31" }]}
      headers={["Pedido", "Cliente", "Volumes", "Doca"]}
      statuses={["A separar", "Conferência", "Pronto", "Expedido"]}
      rows={[
        { id: "EXP-552", cols: ["PED-10240", "Paula Rocha", "3", "Doca 1"], status: "A separar" },
        { id: "EXP-551", cols: ["PED-10238", "Rafael Alves", "2", "Doca 2"], status: "Conferência" },
        { id: "EXP-550", cols: ["PED-10235", "Lúcia Martins", "4", "Doca 1"], status: "Pronto" },
        { id: "EXP-549", cols: ["PED-10230", "Bruno Costa", "1", "Doca 3"], status: "Expedido" },
      ]} />
  ),
});
