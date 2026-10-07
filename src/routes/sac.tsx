import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";

export const Route = createFileRoute("/sac")({
  head: () => ({ meta: [
    { title: "SAC · Colchões & Cia" },
    { name: "description", content: "Atendimento ao cliente: chamados, reclamações e garantias." },
    { property: "og:title", content: "SAC · Colchões & Cia" },
    { property: "og:description", content: "Central de atendimento ao cliente." },
  ] }),
  component: () => (
    <ModulePage title="SAC" description="Chamados, reclamações, garantias e assistência técnica" novo="Novo chamado"
      kpis={[{ label: "Abertos", value: "18" }, { label: "Em atendimento", value: "9" }, { label: "Resolvidos (mês)", value: "142" }, { label: "Tempo médio", value: "1,8 dia" }]}
      headers={["Cliente", "Pedido", "Assunto", "Abertura"]}
      statuses={["Aberto", "Em atendimento", "Resolvido"]}
      rows={[
        { id: "SAC-1021", cols: ["Maria Souza", "PED-10234", "Colchão afundando (garantia)", "06/10/2026"], status: "Aberto" },
        { id: "SAC-1020", cols: ["João Lima", "PED-10228", "Atraso na entrega", "05/10/2026"], status: "Em atendimento" },
        { id: "SAC-1019", cols: ["Ana Pereira", "PED-10211", "Troca de medida", "04/10/2026"], status: "Resolvido" },
        { id: "SAC-1018", cols: ["Carlos Dias", "PED-10199", "Avaria na cabeceira", "03/10/2026"], status: "Em atendimento" },
      ]} />
  ),
});
