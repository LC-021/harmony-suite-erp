// Mock data for the ERP demo. Replace with Lovable Cloud queries when backend is wired.

export type PedidoStatus =
  | "Aguardando pagamento"
  | "Pagamento confirmado"
  | "Separação"
  | "Em transporte"
  | "Concluído"
  | "Cancelado";

export interface Pedido {
  id: string;
  numero: string;
  cliente: string;
  valor: number;
  data: string;
  status: PedidoStatus;
  itens: number;
}

export interface PixPagamento {
  id: string;
  pedido: string;
  cliente: string;
  valor: number;
  data: string;
  status: "Pendente" | "Confirmado" | "Rejeitado";
  observacao?: string;
}

export type BoletoStatus =
  | "Pendente"
  | "Enviado ao CEO"
  | "Aguardando Aprovação"
  | "Aprovado"
  | "Rejeitado"
  | "Pago"
  | "Cancelado";

export interface Boleto {
  id: string;
  numero: string;
  fornecedor: string;
  categoria: string;
  valor: number;
  emissao: string;
  vencimento: string;
  status: BoletoStatus;
  enviadoCEO: boolean;
}

export interface Produto {
  id: string;
  codigo: string;
  nome: string;
  marca: string;
  categoria: string;
  medidas?: string;
  valorTabela: number;
  valorPromocional?: number;
  estoque: number;
  prazoEntrega: string;
  situacao: "Em estoque" | "Sob encomenda";
}

export interface Cliente {
  id: string;
  nome: string;
  documento: string;
  telefone: string;
  cidade: string;
  compras: number;
  totalGasto: number;
}

export interface Funcionario {
  id: string;
  nome: string;
  cargo: string;
  setor: string;
  presente: boolean;
  ultimoPonto: string;
}

export const pedidos: Pedido[] = [
  { id: "1", numero: "PD-10234", cliente: "Ana Ribeiro", valor: 4890, data: "2026-07-07", status: "Aguardando pagamento", itens: 2 },
  { id: "2", numero: "PD-10233", cliente: "Carlos Mendes", valor: 12450, data: "2026-07-07", status: "Pagamento confirmado", itens: 4 },
  { id: "3", numero: "PD-10232", cliente: "Juliana Alves", valor: 2390, data: "2026-07-07", status: "Separação", itens: 1 },
  { id: "4", numero: "PD-10231", cliente: "Ricardo Souza", valor: 8790, data: "2026-07-06", status: "Em transporte", itens: 3 },
  { id: "5", numero: "PD-10230", cliente: "Mariana Costa", valor: 3560, data: "2026-07-06", status: "Concluído", itens: 2 },
  { id: "6", numero: "PD-10229", cliente: "Pedro Lima", valor: 1890, data: "2026-07-06", status: "Cancelado", itens: 1 },
  { id: "7", numero: "PD-10228", cliente: "Fernanda Rocha", valor: 6720, data: "2026-07-05", status: "Concluído", itens: 3 },
  { id: "8", numero: "PD-10227", cliente: "Bruno Ferreira", valor: 9450, data: "2026-07-05", status: "Aguardando pagamento", itens: 2 },
];

export const pixPagamentos: PixPagamento[] = [
  { id: "1", pedido: "PD-10234", cliente: "Ana Ribeiro", valor: 4890, data: "2026-07-07 09:14", status: "Pendente" },
  { id: "2", pedido: "PD-10227", cliente: "Bruno Ferreira", valor: 9450, data: "2026-07-07 08:42", status: "Pendente" },
  { id: "3", pedido: "PD-10225", cliente: "Sofia Neves", valor: 3200, data: "2026-07-06 17:22", status: "Confirmado", observacao: "Comprovante ok" },
  { id: "4", pedido: "PD-10224", cliente: "Tiago Barros", valor: 2100, data: "2026-07-06 15:03", status: "Rejeitado", observacao: "Valor divergente" },
];

export const boletos: Boleto[] = [
  { id: "1", numero: "23793.38128 60082.212345 67890.123456 7 98450000012450", fornecedor: "Pikolin Brasil", categoria: "Fornecedores", valor: 24500, emissao: "2026-06-20", vencimento: "2026-07-08", status: "Aguardando Aprovação", enviadoCEO: true },
  { id: "2", numero: "34191.09008 12345.678901 23456.789012 3 98720000005890", fornecedor: "Sleep House", categoria: "Fornecedores", valor: 5890, emissao: "2026-06-25", vencimento: "2026-07-10", status: "Pendente", enviadoCEO: false },
  { id: "3", numero: "00190.00009 03412.345678 90123.456789 0 98630000002100", fornecedor: "Imobiliária Central", categoria: "Aluguel", valor: 12000, emissao: "2026-07-01", vencimento: "2026-07-05", status: "Pago", enviadoCEO: true },
  { id: "4", numero: "84610.00000 12345.678901 23456.789012 3 98700000000420", fornecedor: "Enel Distribuição", categoria: "Energia", valor: 3420, emissao: "2026-06-28", vencimento: "2026-07-15", status: "Aprovado", enviadoCEO: true },
  { id: "5", numero: "84640.00000 87654.321098 76543.210987 6 98720000000180", fornecedor: "Sabesp", categoria: "Água", valor: 480, emissao: "2026-06-28", vencimento: "2026-07-12", status: "Enviado ao CEO", enviadoCEO: true },
  { id: "6", numero: "84610.00000 55555.555555 66666.666666 7 98730000000260", fornecedor: "Vivo Empresas", categoria: "Internet", valor: 780, emissao: "2026-07-01", vencimento: "2026-07-20", status: "Pendente", enviadoCEO: false },
];

export const produtos: Produto[] = [
  // PIKOLIN Bold
  { id: "p1", codigo: "PIK-BOLD-158", nome: "Colchão Bold", marca: "Pikolin", categoria: "Colchões", medidas: "1,58x1,98x31", valorTabela: 6890, valorPromocional: 6201, estoque: 4, prazoEntrega: "Imediato", situacao: "Em estoque" },
  { id: "p2", codigo: "PIK-BOLD-193", nome: "Colchão Bold", marca: "Pikolin", categoria: "Colchões", medidas: "1,93x2,03x31", valorTabela: 8490, valorPromocional: 7641, estoque: 2, prazoEntrega: "Imediato", situacao: "Em estoque" },
  { id: "p3", codigo: "PIK-VIT-158", nome: "Colchão Vitamin", marca: "Pikolin", categoria: "Colchões", medidas: "1,58x1,98x35", valorTabela: 9200, estoque: 0, prazoEntrega: "20 dias", situacao: "Sob encomenda" },
  { id: "p4", codigo: "PIK-VEN-178", nome: "Colchão Vendôme", marca: "Pikolin", categoria: "Colchões", medidas: "1,78x1,98x34", valorTabela: 11400, valorPromocional: 10260, estoque: 1, prazoEntrega: "Imediato", situacao: "Em estoque" },
  { id: "p5", codigo: "PIK-M36-193", nome: "Colchão M36", marca: "Pikolin", categoria: "Colchões", medidas: "1,93x2,03x36", valorTabela: 13800, estoque: 0, prazoEntrega: "30 dias", situacao: "Sob encomenda" },
  { id: "p6", codigo: "PIK-PET-BOR", nome: "Cama Pet Boreal", marca: "Pikolin", categoria: "Cama Pet", valorTabela: 690, valorPromocional: 590, estoque: 12, prazoEntrega: "Imediato", situacao: "Em estoque" },
  // Sleep House
  { id: "p7", codigo: "SH-KAN-158", nome: "Colchão Kansas", marca: "Sleep House", categoria: "Colchões", medidas: "1,58x1,98", valorTabela: 3890, estoque: 6, prazoEntrega: "Imediato", situacao: "Em estoque" },
  { id: "p8", codigo: "SH-ATL-158", nome: "Colchão Atlanta Latex", marca: "Sleep House", categoria: "Colchões", medidas: "1,58x1,98", valorTabela: 5290, valorPromocional: 4761, estoque: 3, prazoEntrega: "Imediato", situacao: "Em estoque" },
  // King Koil
  { id: "p9", codigo: "KK-MAR-193", nome: "Colchão Marble", marca: "King Koil", categoria: "Colchões", medidas: "1,93x2,03", valorTabela: 18900, estoque: 1, prazoEntrega: "Imediato", situacao: "Em estoque" },
  { id: "p10", codigo: "KK-WIS-158", nome: "Colchão Wish", marca: "King Koil", categoria: "Colchões", medidas: "1,58x1,98", valorTabela: 14500, estoque: 0, prazoEntrega: "45 dias", situacao: "Sob encomenda" },
  { id: "p11", codigo: "KK-ANG-158", nome: "Colchão Angelica", marca: "King Koil", categoria: "Colchões", medidas: "1,58x1,98", valorTabela: 12800, valorPromocional: 11520, estoque: 2, prazoEntrega: "Imediato", situacao: "Em estoque" },
  { id: "p12", codigo: "KK-AME-193", nome: "Colchão Amethyst", marca: "King Koil", categoria: "Colchões", medidas: "1,93x2,03", valorTabela: 21500, estoque: 1, prazoEntrega: "Imediato", situacao: "Em estoque" },
  { id: "p13", codigo: "KK-SLX-440", nome: "Colchão SLX 440", marca: "King Koil", categoria: "Colchões", medidas: "1,58x1,98", valorTabela: 9800, estoque: 0, prazoEntrega: "45 dias", situacao: "Sob encomenda" },
  { id: "p14", codigo: "KK-NES-193", nome: "Colchão New Estate", marca: "King Koil", categoria: "Colchões", medidas: "1,93x2,03", valorTabela: 17200, valorPromocional: 15480, estoque: 1, prazoEntrega: "Imediato", situacao: "Em estoque" },
  // Promocional
  { id: "p15", codigo: "PR-MEM-158", nome: "Colchão Memphis", marca: "Promocional", categoria: "Colchões", medidas: "1,58x1,98", valorTabela: 1890, valorPromocional: 1590, estoque: 15, prazoEntrega: "Imediato", situacao: "Em estoque" },
  { id: "p16", codigo: "PR-RAN-158", nome: "Colchão Range", marca: "Promocional", categoria: "Colchões", medidas: "1,58x1,98", valorTabela: 2290, valorPromocional: 1990, estoque: 10, prazoEntrega: "Imediato", situacao: "Em estoque" },
  { id: "p17", codigo: "PR-ADA-138", nome: "Colchão Adapto", marca: "Promocional", categoria: "Colchões", medidas: "1,38x1,88", valorTabela: 1690, estoque: 8, prazoEntrega: "Imediato", situacao: "Em estoque" },
  { id: "p18", codigo: "PR-IND-158", nome: "Indiana", marca: "Promocional", categoria: "Colchões", medidas: "1,58x1,98", valorTabela: 1490, valorPromocional: 1290, estoque: 20, prazoEntrega: "Imediato", situacao: "Em estoque" },
  { id: "p19", codigo: "PR-NEB-158", nome: "Nebraska", marca: "Promocional", categoria: "Colchões", medidas: "1,58x1,98", valorTabela: 1290, valorPromocional: 1090, estoque: 25, prazoEntrega: "Imediato", situacao: "Em estoque" },
  // Box
  { id: "p20", codigo: "BOX-PAD-158", nome: "Box Padrão", marca: "Vittal", categoria: "Box", medidas: "1,58x1,98", valorTabela: 1490, estoque: 8, prazoEntrega: "Imediato", situacao: "Em estoque" },
  { id: "p21", codigo: "BOX-HUP-158", nome: "Box Baú H-UP", marca: "Vittal", categoria: "Box Baú", medidas: "1,58x1,98", valorTabela: 3490, valorPromocional: 3141, estoque: 5, prazoEntrega: "Imediato", situacao: "Em estoque" },
  { id: "p22", codigo: "BOX-VIT-158", nome: "Box Baú Vittal", marca: "Vittal", categoria: "Box Baú", medidas: "1,58x1,98", valorTabela: 2890, estoque: 6, prazoEntrega: "Imediato", situacao: "Em estoque" },
  { id: "p23", codigo: "BOX-MTX-193", nome: "Box Baú MTX", marca: "MTX", categoria: "Box Baú", medidas: "1,93x2,03", valorTabela: 4890, valorPromocional: 4401, estoque: 3, prazoEntrega: "Imediato", situacao: "Em estoque" },
  { id: "p24", codigo: "BOX-VSP-193", nome: "Box Baú Vittal Sonho Premium", marca: "Vittal", categoria: "Box Baú", medidas: "1,93x2,03", valorTabela: 5490, estoque: 2, prazoEntrega: "Imediato", situacao: "Em estoque" },
  // Cabeceiras
  { id: "p25", codigo: "CAB-VIT-158", nome: "Cabeceira Vittal", marca: "Vittal", categoria: "Cabeceiras", medidas: "1,58", valorTabela: 890, valorPromocional: 790, estoque: 12, prazoEntrega: "Imediato", situacao: "Em estoque" },
  { id: "p26", codigo: "CAB-CHR-193", nome: "Cabeceira Chronos", marca: "Chronos", categoria: "Cabeceiras", medidas: "1,93", valorTabela: 1490, estoque: 4, prazoEntrega: "Imediato", situacao: "Em estoque" },
  // Poltronas
  { id: "p27", codigo: "PLT-STU", nome: "Poltrona Studio Plus", marca: "Herval", categoria: "Poltronas", valorTabela: 2490, valorPromocional: 2241, estoque: 3, prazoEntrega: "Imediato", situacao: "Em estoque" },
  { id: "p28", codigo: "PLT-MAR", nome: "Poltrona Maria", marca: "Herval", categoria: "Poltronas", valorTabela: 1890, estoque: 5, prazoEntrega: "Imediato", situacao: "Em estoque" },
  { id: "p29", codigo: "PLT-ALL", nome: "Poltrona Allegra", marca: "Herval", categoria: "Poltronas", valorTabela: 3290, valorPromocional: 2961, estoque: 2, prazoEntrega: "Imediato", situacao: "Em estoque" },
  { id: "p30", codigo: "PLT-ELI", nome: "Poltrona Elite", marca: "Herval", categoria: "Poltronas", valorTabela: 2790, estoque: 3, prazoEntrega: "Imediato", situacao: "Em estoque" },
  { id: "p31", codigo: "PLT-CON", nome: "Poltrona Confort", marca: "Herval", categoria: "Poltronas", valorTabela: 3490, estoque: 2, prazoEntrega: "Imediato", situacao: "Em estoque" },
  { id: "p32", codigo: "PLT-CLI", nome: "Poltrona Confort Lift", marca: "Herval", categoria: "Poltronas", valorTabela: 4890, valorPromocional: 4401, estoque: 1, prazoEntrega: "15 dias", situacao: "Sob encomenda" },
  { id: "p33", codigo: "PLT-MAX", nome: "Poltrona Maxx", marca: "Herval", categoria: "Poltronas", valorTabela: 3990, estoque: 2, prazoEntrega: "Imediato", situacao: "Em estoque" },
  { id: "p34", codigo: "PLT-PRO", nome: "Poltrona Herval Promocional", marca: "Herval", categoria: "Poltronas", valorTabela: 1290, valorPromocional: 1090, estoque: 8, prazoEntrega: "Imediato", situacao: "Em estoque" },
  // Sofá
  { id: "p35", codigo: "SOF-MAN-FLIP", nome: "Sofá Cama Mannes Flip", marca: "Mannes", categoria: "Sofá Cama", valorTabela: 5890, valorPromocional: 5301, estoque: 2, prazoEntrega: "Imediato", situacao: "Em estoque" },
  // Bicamas
  { id: "p36", codigo: "BIC-STE", nome: "Bicama Steel", marca: "Steel", categoria: "Bicamas", valorTabela: 1690, estoque: 5, prazoEntrega: "Imediato", situacao: "Em estoque" },
  { id: "p37", codigo: "BIC-BIO", nome: "Bicama Biobox", marca: "Biobox", categoria: "Bicamas", valorTabela: 1890, estoque: 4, prazoEntrega: "Imediato", situacao: "Em estoque" },
  { id: "p38", codigo: "BIC-BIOB", nome: "Bicama Biobox com Baú", marca: "Biobox", categoria: "Bicamas", valorTabela: 2390, valorPromocional: 2151, estoque: 3, prazoEntrega: "Imediato", situacao: "Em estoque" },
  { id: "p39", codigo: "BIC-DUN", nome: "Bicama Dundee CBP", marca: "Dundee", categoria: "Bicamas", valorTabela: 2790, estoque: 2, prazoEntrega: "Imediato", situacao: "Em estoque" },
  { id: "p40", codigo: "BIC-BSTE", nome: "Baú com Bicama Steel", marca: "Steel", categoria: "Bicamas", valorTabela: 2490, estoque: 2, prazoEntrega: "Imediato", situacao: "Em estoque" },
  { id: "p41", codigo: "BIC-FPL", nome: "Bicama Flat Pilati", marca: "Pilati", categoria: "Bicamas", valorTabela: 3190, valorPromocional: 2871, estoque: 1, prazoEntrega: "Imediato", situacao: "Em estoque" },
  // Outros
  { id: "p42", codigo: "SAP-AGI", nome: "Sapateira Agile", marca: "Agile", categoria: "Sapateiras", valorTabela: 590, estoque: 10, prazoEntrega: "Imediato", situacao: "Em estoque" },
  { id: "p43", codigo: "MC-PRO", nome: "Mesa de Cabeceira Promocional", marca: "Promocional", categoria: "Mesas de Cabeceira", valorTabela: 290, valorPromocional: 249, estoque: 20, prazoEntrega: "Imediato", situacao: "Em estoque" },
  { id: "p44", codigo: "MC-FAST", nome: "Mesa de Cabeceira Fast", marca: "Fast", categoria: "Mesas de Cabeceira", valorTabela: 390, estoque: 15, prazoEntrega: "Imediato", situacao: "Em estoque" },
  { id: "p45", codigo: "MC-PIC", nome: "Picoli Fast", marca: "Fast", categoria: "Mesas de Cabeceira", valorTabela: 450, estoque: 12, prazoEntrega: "Imediato", situacao: "Em estoque" },
  { id: "p46", codigo: "MC-ATE", nome: "Atenas Fast", marca: "Fast", categoria: "Mesas de Cabeceira", valorTabela: 490, estoque: 10, prazoEntrega: "Imediato", situacao: "Em estoque" },
  { id: "p47", codigo: "MC-PER", nome: "Pérola Fast", marca: "Fast", categoria: "Mesas de Cabeceira", valorTabela: 490, estoque: 8, prazoEntrega: "Imediato", situacao: "Em estoque" },
  { id: "p48", codigo: "MC-NYK", nome: "Nova York Fast", marca: "Fast", categoria: "Mesas de Cabeceira", valorTabela: 590, valorPromocional: 501, estoque: 6, prazoEntrega: "Imediato", situacao: "Em estoque" },
];

export const clientes: Cliente[] = [
  { id: "c1", nome: "Ana Ribeiro", documento: "123.456.789-00", telefone: "(11) 99123-4567", cidade: "São Paulo/SP", compras: 4, totalGasto: 18900 },
  { id: "c2", nome: "Carlos Mendes", documento: "234.567.890-11", telefone: "(11) 98123-4567", cidade: "Guarulhos/SP", compras: 7, totalGasto: 42890 },
  { id: "c3", nome: "Juliana Alves", documento: "345.678.901-22", telefone: "(11) 97123-4567", cidade: "São Paulo/SP", compras: 2, totalGasto: 5890 },
  { id: "c4", nome: "Ricardo Souza", documento: "456.789.012-33", telefone: "(11) 96123-4567", cidade: "Campinas/SP", compras: 5, totalGasto: 29890 },
  { id: "c5", nome: "Mariana Costa", documento: "567.890.123-44", telefone: "(11) 95123-4567", cidade: "Osasco/SP", compras: 3, totalGasto: 12450 },
  { id: "c6", nome: "Móveis & Cia LTDA", documento: "12.345.678/0001-99", telefone: "(11) 3456-7890", cidade: "São Paulo/SP", compras: 12, totalGasto: 128900 },
];

export const funcionarios: Funcionario[] = [
  { id: "f1", nome: "Roberto Silva", cargo: "Gerente de Vendas", setor: "Vendas", presente: true, ultimoPonto: "08:02" },
  { id: "f2", nome: "Patrícia Gomes", cargo: "Vendedora", setor: "Vendas", presente: true, ultimoPonto: "08:15" },
  { id: "f3", nome: "Marcos Oliveira", cargo: "Estoquista", setor: "Estoque", presente: true, ultimoPonto: "07:58" },
  { id: "f4", nome: "Camila Santos", cargo: "Financeiro Pleno", setor: "Financeiro", presente: true, ultimoPonto: "08:22" },
  { id: "f5", nome: "Diego Martins", cargo: "Motorista", setor: "Logística", presente: false, ultimoPonto: "—" },
  { id: "f6", nome: "Larissa Pinto", cargo: "Analista RH", setor: "RH", presente: true, ultimoPonto: "08:05" },
  { id: "f7", nome: "Fábio Rocha", cargo: "Vendedor", setor: "Vendas", presente: false, ultimoPonto: "—" },
  { id: "f8", nome: "Beatriz Nunes", cargo: "Auxiliar Administrativo", setor: "Administrativo", presente: true, ultimoPonto: "08:11" },
];

export const vendasSemanais = [
  { dia: "Seg", vendas: 24500, meta: 30000 },
  { dia: "Ter", vendas: 32100, meta: 30000 },
  { dia: "Qua", vendas: 28900, meta: 30000 },
  { dia: "Qui", vendas: 41200, meta: 30000 },
  { dia: "Sex", vendas: 52800, meta: 30000 },
  { dia: "Sáb", vendas: 68400, meta: 30000 },
  { dia: "Dom", vendas: 18900, meta: 15000 },
];

export const financeiroMensal = [
  { mes: "Fev", entradas: 320000, saidas: 245000 },
  { mes: "Mar", entradas: 385000, saidas: 268000 },
  { mes: "Abr", entradas: 412000, saidas: 289000 },
  { mes: "Mai", entradas: 458000, saidas: 312000 },
  { mes: "Jun", entradas: 502000, saidas: 341000 },
  { mes: "Jul", entradas: 268000, saidas: 178000 },
];

export const notificacoes = [
  { id: "n1", tipo: "warning" as const, titulo: "Pagamento aguardando confirmação", descricao: "PD-10234 · Ana Ribeiro · R$ 4.890", tempo: "há 12 min" },
  { id: "n2", tipo: "error" as const, titulo: "Boleto vencido", descricao: "Imobiliária Central · R$ 12.000 · venceu ontem", tempo: "há 1h" },
  { id: "n3", tipo: "info" as const, titulo: "Boletim não enviado", descricao: "PD-10230 · Mariana Costa", tempo: "há 2h" },
  { id: "n4", tipo: "warning" as const, titulo: "Estoque baixo", descricao: "Colchão Bold 1,93x2,03 · 2 unidades", tempo: "há 3h" },
  { id: "n5", tipo: "success" as const, titulo: "Pedido finalizado", descricao: "PD-10228 · Fernanda Rocha", tempo: "há 5h" },
  { id: "n6", tipo: "warning" as const, titulo: "Funcionário sem bater ponto", descricao: "Diego Martins · 08:30", tempo: "há 6h" },
];

export const auditoria = [
  { id: "a1", usuario: "ceo@empresa.com", acao: "Aprovou boleto", detalhe: "Enel R$ 3.420", ip: "192.168.0.10", data: "2026-07-07 09:12" },
  { id: "a2", usuario: "financeiro@empresa.com", acao: "Cadastrou boleto", detalhe: "Vivo Empresas R$ 780", ip: "192.168.0.22", data: "2026-07-07 08:44" },
  { id: "a3", usuario: "vendas@empresa.com", acao: "Criou pedido", detalhe: "PD-10234", ip: "192.168.0.35", data: "2026-07-07 09:14" },
  { id: "a4", usuario: "ceo@empresa.com", acao: "Confirmou Pix", detalhe: "PD-10225 R$ 3.200", ip: "192.168.0.10", data: "2026-07-06 17:26" },
  { id: "a5", usuario: "estoque@empresa.com", acao: "Baixa de estoque", detalhe: "PD-10230 · 2 itens", ip: "192.168.0.41", data: "2026-07-06 15:48" },
];

export function currency(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
