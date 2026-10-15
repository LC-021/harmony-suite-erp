# Harmony Suite

PROJETO - SISTEMA DE GESTÃO EMPRESARIAL (ERP)

Objetivo

Desenvolver um sistema desktop moderno em C# (.NET 8) utilizando SQL Server para centralizar todos os processos da empresa.

O sistema deverá possuir interface moderna, com tema escuro, menus laterais e dashboard inicial.

Login

Criar tela de login contendo:

Usuário

Senha

Lembrar usuário

Recuperar senha

Banco de dados SQL Server

Controle de permissões

Após login o sistema identifica o nível do usuário.

Níveis de acesso

Administrador (CEO)

Financeiro

Administrativo

Vendas

RH

Estoque

Cada perfil visualizará apenas os módulos permitidos.

Dashboard

Criar um painel moderno contendo:

Pedidos do dia

Pedidos aguardando pagamento

Pedidos pagos

Pedidos em separação

Pedidos finalizados

Funcionários presentes

Funcionários ausentes

Alertas

Notificações

Gráficos de vendas

Gráfico financeiro

Módulo de Pedidos

Cadastrar pedidos

Pesquisar pedidos

Editar pedidos

Cancelar pedidos

Consultar histórico

Anexar documentos

Status:

Aguardando pagamento

Pagamento confirmado

Separação

Em transporte

Concluído

Cancelado

Módulo Pix

Tela exclusiva para pagamentos.

Lista de pagamentos pendentes.

Cada pagamento possui:

Número do pedido

Cliente

Valor

Data

Status

O CEO poderá:

✔ Confirmar pagamento

✔ Rejeitar pagamento

✔ Inserir observação

✔ Visualizar histórico

Após confirmação:

Pedido muda automaticamente para "Pago"

Sistema registra:

Usuário

Data

Hora

Observação

Boletim

Ao finalizar um pedido:

Gerar automaticamente um PDF contendo:

Dados do cliente

Produtos

Valores

Descontos

Valor final

Observações

QR Code

Botões:

Baixar PDF

Enviar por e-mail

Reenviar

Histórico de envios

Caso o boletim não seja enviado:

Mostrar alerta no Dashboard.

Produtos

Cadastro

Categorias

Preço

Estoque

Imagem

Código interno

Código de barras

Pesquisa rápida

Clientes

Cadastro

CPF/CNPJ

Telefone

Endereço

Histórico de compras

Histórico financeiro

Financeiro

Caixa

Entradas

Saídas

Pix

Boletos

Relatórios

Fluxo de caixa

RH

Cadastro de funcionários

Registro de ponto

Banco de horas

Horas extras

Férias

Holerites

Solicitações

Espelho de ponto

Ponto Eletrônico

Registrar:

Entrada

Saída almoço

Retorno almoço

Saída

Calcular automaticamente:

Horas trabalhadas

Horas extras

Horas negativas

Atrasos

Faltas

Permitir solicitação de ajuste de ponto.

Estoque

Entrada

Saída

Separação

Inventário

Baixa automática quando pedido for faturado.

Notificações

Sistema de notificações internas.

Exemplos:

Pagamento aguardando confirmação.

Pedido sem boletim.

Funcionário esqueceu de bater ponto.

Estoque baixo.

Pedido atrasado.

Auditoria

Registrar todas as ações do sistema.

Quem fez

Quando fez

Qual computador

IP

Data

Hora

Relatórios

Pedidos

Vendas

Financeiro

Funcionários

Banco de horas

Clientes

Produtos

Exportar para:

PDF

Excel

Interface

Visual moderno.

Tema escuro.

Menu lateral.

Ícones.

Dashboard semelhante aos sistemas ERP atuais.

Cartões informativos.

Gráficos.

Animações suaves.

Responsivo.

Banco de Dados

SQL Server

Relacionamentos entre tabelas

Procedures

Views

Triggers

Logs

Backup automático

Tecnologias

Backend:

C#

.NET 8

Entity Framework Core

SQL Server

Frontend:

Windows Forms moderno ou WPF

Material Design

Font Awesome

Gráficos

LiveCharts

Objetivo final

Criar um sistema corporativo profissional que integre os setores:

Administrativo

Financeiro

RH

Estoque

Diretoria

Vendas

com foco em automação, segurança, rastreabilidade e produtividade.

Crie um catálogo de produtos para um ERP de uma loja de colchões e móveis.

Categorias:

- Colchões

- Box

- Box Baú

- Cabeceiras

- Poltronas

- Bicamas

- Sofá Cama

- Sapateiras

- Mesas de Cabeceira

- Cama Pet

Cadastrar os seguintes produtos:

### PIKOLIN

Colchão Bold

- Molas Pocket

- Medidas:

0,88x1,88x31

0,96x2,03x31

1,18x1,88x31

1,20x2,03x31

1,28x1,88x31

1,38x1,88x31

1,58x1,98x31

1,93x2,03x31

Colchão Vitamin

- Molas Pocket

- Medidas:

0,88x1,88x35

0,96x2,03x35

1,38x1,88x35

1,58x1,98x35

1,93x2,03x35

Colchão Vendôme

- Molas Pocket

- Medidas:

1,38x1,88x34

1,58x1,98x34

1,78x1,98x34

1,93x2,03x34

Colchão M36

- Molas Pocket

- Medidas:

1,58x1,98x36

1,93x2,03x36

Cama Pet Boreal

---

### Sleep House

Colchão Kansas

Colchão Atlanta Latex

---

### King Koil

Colchão Marble

Colchão Wish

Colchão Angelica

Colchão Amethyst

Colchão SLX 440

Colchão New Estate

---

### Linha Promocional

Colchão Memphis

Colchão Range

Colchão Adapto

Indiana

Nebraska

---

### Box

Box Padrão

Box Baú H-UP

Box Baú Vittal

Box Baú MTX

Box Baú Vittal Sonho Premium

---

### Cabeceiras

Cabeceiras Vittal

Cabeceiras Chronos

---

### Poltronas

Poltrona Studio Plus

Poltrona Maria

Poltrona Allegra

Poltrona Elite

Poltrona Confort

Poltrona Confort Lift

Poltrona Maxx

Poltrona Herval Promocional

---

### Sofá

Sofá Cama Mannes Flip

---

### Bicamas

Bicama Steel

Bicama Biobox

Bicama Biobox com Baú

Bicama Dundee CBP

Baú com Bicama Steel

Bicama Flat Pilati

---

### Outros

Sapateira Agile

Mesa de Cabeceira Promocional

Mesa de Cabeceira Fast

Picoli Fast

Atenas Fast

Pérola Fast

Nova York Fast

---

Cada produto deve possuir:

- Foto

- Marca

- Categoria

- Código

- Descrição

- Medidas

- Valor de tabela

- Valor promocional

- Estoque

- Prazo de entrega

- Situação:

    - Em estoque

    - Sob encomenda

O sistema deverá reconhecer automaticamente promoções como:

- 10% de desconto por marca.

- Descontos cumulativos.

- Promoção Casadinha.

- Box + Colchão.

- Cabeceira + Colchão.

- Desconto para pagamento via Pix.

- Produtos somente em estoque.

- Produtos que podem ser encomendados.

Ao selecionar um produto durante a venda, exibir automaticamente:

- Valor de tabela.

- Promoções disponíveis.

- Desconto aplicado.

- Valor final.

- Prazo de entrega.

- Disponibilidade.

Módulo Financeiro – Gestão de Boletos

Criar um módulo exclusivo para gerenciamento de boletos financeiros da empresa.

Este módulo será utilizado pelo setor financeiro para controlar boletos de fornecedores, despesas, cancelamentos, aluguel, impostos e demais contas a pagar.

Dashboard Financeiro

Exibir:

Boletos pendentes

Boletos vencendo hoje

Boletos vencidos

Boletos pagos

Valor total a pagar

Valor pago no mês

Fluxo de caixa

Alertas financeiros

Cadastro de Boletos

Permitir cadastrar manualmente ou importar boletos.

Cada boleto deverá possuir:

Número do boleto

Código de barras

Linha digitável

Fornecedor

Categoria da despesa

Centro de custo

Valor

Data de emissão

Data de vencimento

Data de pagamento

Forma de pagamento

Observações

Anexo (PDF do boleto)

Categorias:

Fornecedores

Cancelamentos

Fretes

Impostos

Aluguel

Energia

Água

Internet

Contabilidade

Marketing

Manutenção

Outros

Impressão

Criar botão:

🖨️ Imprimir Boleto

Ao clicar:

Abrir visualização do boleto

Permitir impressão

Permitir salvar em PDF

Envio ao CEO

Criar botão:

📧 Enviar ao CEO

Ao clicar:

Enviar automaticamente por e-mail

Anexar o PDF do boleto

Registrar data e hora do envio

Registrar quem enviou

Caso o boleto ainda não tenha sido enviado ao CEO:

Mostrar alerta no Dashboard Financeiro.

Aprovação

Os boletos poderão possuir os seguintes status:

Pendente

Enviado ao CEO

Aguardando Aprovação

Aprovado

Rejeitado

Pago

Cancelado

Somente usuários com perfil CEO ou Financeiro poderão alterar estes status.

Alertas Automáticos

O sistema deverá gerar notificações para:

Boletos vencendo hoje.

Boletos vencendo em 3 dias.

Boletos vencidos.

Boletos sem aprovação.

Boletos enviados ao CEO.

Boletos pagos.

Histórico

Registrar automaticamente:

Quem cadastrou.

Quem editou.

Quem imprimiu.

Quem enviou ao CEO.

Quem aprovou.

Quem cancelou.

Data e hora de cada ação.

Pesquisa

Permitir pesquisar boletos por:

Número

Fornecedor

Categoria

Valor

Vencimento

Status

Relatórios

Gerar relatórios por:

Contas a pagar

Fornecedor

Categoria

Período

Boletos pagos

Boletos pendentes

Boletos vencidos

Exportar para:

PDF

Excel

Integração

O módulo financeiro deverá estar integrado ao Dashboard principal, exibindo:

Total de contas a pagar.

Total de boletos pendentes.

Valor a vencer.

Valor vencido.

Últimos boletos cadastrados.

Alertas financeiros.
Produtos

Cadastro

Categorias

Preço

Estoque

Imagem

Código interno

Código de barras

Pesquisa rápida

Catálogo Inteligente de Produtos

O sistema deverá possuir um catálogo completo e inteligente para consulta e venda dos produtos.

Cada produto deverá conter:

 Código interno

 Código de barras

 Foto

 Nome do produto

 Marca

 Categoria

 Linha

 Descrição

 Medidas

 Valor de tabela

 Valor promocional

 Custo

 Margem de lucro

 Estoque disponível

 Estoque mínimo

 Prazo de entrega

 Situação (Em estoque ou Sob encomenda)

Categorias

 Colchões

 Box

 Box Baú

 Cabeceiras

 Poltronas

 Bicamas

 Sofá Cama

 Sapateiras

 Mesas de Cabeceira

 Cama Pet

Produtos cadastrados

PIKOLIN

Linha Bold

 0,88x1,88x31

 0,96x2,03x31

 1,18x1,88x31

 1,20x2,03x31

 1,28x1,88x31

 1,38x1,88x31

 1,58x1,98x31

 1,93x2,03x31

Linha Vitamin

 0,88x1,88x35

 0,96x2,03x35

 1,38x1,88x35

 1,58x1,98x35

 1,93x2,03x35

Linha Vendôme

 1,38x1,88x34

 1,58x1,98x34

 1,78x1,98x34

 1,93x2,03x34

Linha M36

 1,58x1,98x36

 1,93x2,03x36

Cama Pet Boreal

Sleep House

 Kansas

 Atlanta Latex

King Koil

 Marble

 Wish

 Angelica

 Amethyst

 SLX 440

 New Estate

Linha Promocional

 Memphis

 Range

 Adapto

 Indiana

 Nebraska

Box

 Box Padrão

 Box Baú H-UP

 Box Baú Vittal

 Box Baú MTX

 Box Baú Vittal Sonho Premium

Cabeceiras

 Vittal

 Chronos

Poltronas

 Studio Plus

 Maria

 Allegra

 Elite

 Confort

 Confort Lift

 Maxx

 Herval Promocional

Sofás

 Sofá Cama Mannes Flip

Bicamas

 Bicama Steel

 Bicama Biobox

 Bicama Biobox com Baú

 Bicama Dundee CBP

 Baú com Bicama Steel

 Bicama Flat Pilati

Outros

 Sapateira Agile

 Mesa de Cabeceira Promocional

 Mesa de Cabeceira Fast

 Picoli Fast

 Atenas Fast

 Pérola Fast

 Nova York Fast

Sistema Inteligente de Promoções

O sistema deverá reconhecer automaticamente:

 Promoções por marca.

 Promoções cumulativas.

 Promoção Casadinha.

 Promoções Box + Colchão.

 Promoções Cabeceira + Colchão.

 Promoções para pagamento via Pix.

 Produtos somente em estoque.

 Produtos sob encomenda.

 Promoções por período.

 Descontos máximos permitidos por perfil de usuário.

Ao selecionar um produto durante uma venda, o sistema deverá calcular automaticamente:

 Valor de tabela.

 Promoções vigentes.

 Percentual de desconto.

 Valor do desconto.

 Valor final.

 Prazo de entrega.

 Disponibilidade em estoque.

Caso o vendedor tente aplicar um desconto acima do permitido, o sistema deverá solicitar aprovação do Gerente ou CEO.

Permitir importação automática de tabelas de preços em PDF ou Excel para atualização dos produtos sem necessidade de alterar o código do sistema.

Financeiro

Caixa

Entradas

Saídas

Pix

Boletos

Relatórios

Fluxo de caixa

Gestão de Boletos

Criar um módulo exclusivo para gerenciamento de boletos financeiros da empresa.

O módulo deverá controlar boletos de:

 Fornecedores

 Cancelamentos

 Fretes

 Impostos

 Aluguel

 Energia

 Água

 Internet

 Contabilidade

 Marketing

 Manutenção

 Outras despesas

Cada boleto deverá possuir:

 Número do boleto

 Linha digitável

 Código de barras

 Fornecedor

 Categoria

 Centro de custo

 Valor

 Data de emissão

 Data de vencimento

 Data prevista para pagamento

 Observações

 PDF anexado

Impressão

Criar botão:

Imprimir Boleto

Ao clicar:

 Visualizar boleto.

 Imprimir.

 Salvar em PDF.

Envio ao CEO

Criar botão:

Enviar ao CEO

Ao clicar:

 Enviar automaticamente por e-mail.

 Anexar o PDF do boleto.

 Registrar data e hora do envio.

 Registrar o usuário responsável.

Aprovação

Status possíveis:

 Pendente

 Enviado ao CEO

 Aguardando Aprovação

 Aprovado

 Rejeitado

 Pago

 Cancelado

Após aprovação do CEO, atualizar automaticamente o status.

OCR Inteligente

Permitir que o usuário faça upload de uma foto ou PDF do boleto.

O sistema deverá utilizar OCR para identificar automaticamente:

 Linha digitável.

 Código de barras.

 Fornecedor.

 Valor.

 Data de vencimento.

Preencher automaticamente o cadastro do boleto.

Alertas

Notificar automaticamente:

 Boletos vencendo hoje.

 Boletos vencendo em até 3 dias.

 Boletos vencidos.

 Boletos pendentes de envio ao CEO.

 Boletos aguardando aprovação.

 Boletos pagos.

Histórico

Registrar automaticamente:

 Quem cadastrou.

 Quem editou.

 Quem imprimiu.

 Quem enviou ao CEO.

 Quem aprovou.

 Quem cancelou.

 Computador utilizado.

 Endereço IP.

 Data e hora de todas as ações.

Relatórios Financeiros

Gerar relatórios de:

 Contas a pagar.

 Boletos pagos.

 Boletos pendentes.

 Boletos vencidos.

 Gastos por fornecedor.

 Gastos por categoria.

 Fluxo de caixa.

Exportar para:

 PDF

 Excel

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://harmony-suite-erp.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7e6a04e8-ca41-4d17-8fa0-2aa98c2e40a6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
