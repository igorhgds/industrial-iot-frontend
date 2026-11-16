# 🎨 Design System & Diretrizes de UI/UX — Industrial IIoT (Angular)

> **Instrução para Assistentes de IA (Antigravity / Copilot / Cursor):**
> Este documento define o padrão visual, tokens de cores, tipografia, arquitetura de layout e bibliotecas oficiais do frontend Angular deste projeto. **Todas as telas, componentes e estilos gerados devem seguir estritamente estas especificações**, garantindo consistência visual de nível industrial (*Dark Command Center*), alta legibilidade e baixa fadiga ocular.

---

## 1. Filosofia Visual & Conceito
- **Estilo:** Industrial Dark Mode / Command Center SCADA moderno.
- **Objetivo:** Permitir leitura instantânea ($O(1)$) de telemetria crítica, estados de equipamentos e alertas em tempo real sem poluição visual.
- **Contraste:** Fundo escuro profundo com superfícies elevadas em cinza ardósia (*Slate*), bordas sutis de 1px e cores vibrantes **exclusivamente** para indicar status operacionais, alertas ou ações primárias.

---

## 2. Paleta de Cores & Tokens (Tailwind CSS)

Utilize as classes padrão do **Tailwind CSS** mapeadas abaixo. Nunca utilize cores hardcoded aleatórias.

### 2.1. Superfícies & Fundos (Backgrounds)
| Uso | Token / Classe Tailwind | Hex | Descrição |
| :--- | :--- | :--- | :--- |
| **Fundo Principal (App Canvas)** | `bg-slate-950` ou `bg-slate-900` | `#020617` / `#0F172A` | Fundo geral atrás dos cards e tabelas. |
| **Superfície Elevada (Cards / Modais)** | `bg-slate-800` | `#1E293B` | Cartões de motores, colunas do Kanban, containers. |
| **App Shell (Sidebar & Topbar)** | `bg-slate-900` | `#0F172A` | Barra lateral fixa e cabeçalho superior. |
| **Superfície Interativa (Hover / Inputs)** | `bg-slate-700/50` | `#334155` | Hover em linhas de tabela, inputs de formulário e dropdowns. |
| **Bordas e Divisores** | `border-slate-700` | `#334155` | Borda padrão de `1px` para separar cards e seções. |

### 2.2. Tipografia (Textos)
| Uso | Classe Tailwind | Hex | Descrição |
| :--- | :--- | :--- | :--- |
| **Texto Primário (Títulos / Valores)** | `text-slate-100` | `#F1F5F9` | Nomes de máquinas, valores numéricos de sensores. |
| **Texto Secundário (Labels / Subtítulos)** | `text-slate-400` | `#94A3B8` | Rótulos de métricas, nomes de setores, timestamps. |
| **Texto Desabilitado / Mudo** | `text-slate-500` | `#64748B` | Placeholders, ícones inativos. |

### 2.3. Cores Semânticas de Estado (IIoT / Telemetria)
| Estado | Cor Base | Fundo Sutil (Badge/Card) | Texto / Ícone | Borda Destaque | Uso |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Operacional / Online** | Emerald (`#10B981`) | `bg-emerald-500/10` | `text-emerald-400` | `border-emerald-500/30` | Motor normal, SSE conectado, Gateway online. |
| **Atenção / Warning** | Amber (`#F59E0B`) | `bg-amber-500/10` | `text-amber-400` | `border-amber-500/40` | Vibração elevada, alerta preventivo, OS média. |
| **Crítico / Emergência** | Red (`#EF4444`) | `bg-red-500/15` | `text-red-400` | `border-red-500/50` | Superaquecimento, falha grave, trip de disjuntor. |
| **Informativo / Neutro** | Cyan (`#06B6D4`) | `bg-cyan-500/10` | `text-cyan-400` | `border-cyan-500/30` | Telemetria neutra, gráficos secundários, tags. |

### 2.4. Ações & Interatividade
- **Botão Primário (Salvar, Criar, Confirmar):** `bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg px-4 py-2 transition-colors`
- **Botão Secundário (Cancelar, Filtrar, Voltar):** `bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg px-4 py-2`
- **Botão de Emergência / Destrutivo (Desarmar, Excluir):** `bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg px-4 py-2`

---

## 3. Tipografia & Formatação de Dados

- **Fonte Principal (UI):** `Inter`, `system-ui`, `sans-serif`.
- **Fonte Monoespaçada (Telemetria, IDs, MAC, Timestamps):** `JetBrains Mono`, `Fira Code`, `monospace`.
  - **Regra Crítica:** Todo valor numérico de sensor (`88.5 °C`, `18.4 A`, `4.8 mm/s`) e código de equipamento/OS (`OS #402`, `GW-USIN-01`) **DEVE** usar a classe `font-mono tabular-nums` para evitar que o layout "pule" quando os números atualizarem via SSE a cada segundo.

---

## 4. Stack Oficial & Bibliotecas Angular

Ao gerar código Angular (Standalone Components, Signals, Tailwind CSS), utilize exclusivamente esta stack:

1. **Estilização:** `tailwindcss` (v3 ou v4) com dark mode ativado por padrão.
2. **Ícones:** `lucide-angular` (ícones limpos de 1.5px/2px stroke, ex: `Activity`, `AlertTriangle`, `Cpu`, `Fan`, `Power`, `Wrench`).
3. **Gráficos & Gauges em Tempo Real:** `ngx-echarts` (`echarts`) — obrigatório para gráficos de série temporal contínua (últimos 50 pontos) e mostradores radiais (*gauges*) sem perda de FPS.
4. **Drag & Drop (Kanban):** `@angular/cdk/drag-drop` — nativo do Angular para movimentação de cards entre colunas de Ordens de Serviço.
5. **Reatividade:** Angular Signals (`signal()`, `computed()`, `effect()`) conectados aos serviços de HTTP e SSE (`EventSource`).

---

## 5. Arquitetura de Layout & Padrões de Componentes

### 5.1. App Shell (`/shell`)
- **Estrutura:** `flex h-screen overflow-hidden bg-slate-950 text-slate-100`.
- **Sidebar Esquerda:** Largura fixa `w-64` (retrátil para `w-20`), `bg-slate-900 border-r border-slate-800`. Item ativo destacado com `bg-blue-600/15 text-blue-400 border-l-2 border-blue-500`.
- **Topbar Superior:** Altura fixa `h-16`, `bg-slate-900/80 backdrop-blur border-b border-slate-800`. Exibe:
  - Breadcrumb / Título da tela atual à esquerda.
  - Badge de status da conexão em tempo real (`🟢 SSE ATIVO` ou `🔴 RECONECTANDO`), contador de alertas pendentes e perfil do operador à direita.
- **Área Principal (`<router-outlet>`):** `flex-1 overflow-y-auto p-6`.

### 5.2. Cards de Equipamento (`/dashboard`)
- **Grid:** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4`.
- **Anatomia do Card:**
  - Container: `bg-slate-800 border border-slate-700 rounded-xl p-4 hover:border-slate-500 transition-all cursor-pointer`.
  - Se o equipamento estiver em estado **CRITICAL**, aplicar borda destaque `border-red-500/60 shadow-lg shadow-red-500/5`.
  - Cabeçalho: Nome do equipamento (`font-semibold text-slate-100`) + Badge de status no canto superior direito.
  - Corpo: Mini-grid de 2 ou 3 métricas principais (`Temp`, `Vibração`, `Corrente`) com números em `text-xl font-bold font-mono tabular-nums`.
  - Rodapé: Setor + Timestamp relativo (`há 2s`) em `text-xs text-slate-400`.

### 5.3. Visão 360º do Motor (`/plant-assets/equipments/:id`)
- **Topo:** Resumo do equipamento + Badge de saúde + Botão de voltar.
- **Linha 1 (Gauges):** 3 cards lado a lado (`grid-cols-1 md:grid-cols-3 gap-4`) com componentes `echarts` tipo gauge para Temperatura, Vibração e Corrente.
- **Linha 2 (Série Temporal):** Card full-width (`h-80`) com gráfico de linha em tempo real e linha tracejada vermelha (`markLine`) indicando o threshold crítico.
- **Linha 3 (Painel de Atuadores):** Card de controle com switches/botões claros para acionamento manual (ex: Ventilação Forçada) e botão de parada de emergência com modal de confirmação obrigatória.

### 5.4. Central de Alertas (`/alerts`) + Gaveta Lateral (Slide-Over)
- **Tabela:** Compacta (`text-sm`), cabeçalho `bg-slate-900/60 text-slate-400 uppercase text-xs`, linhas com `border-b border-slate-800 hover:bg-slate-800/60`.
- **Sensor Snapshot Drawer:** Ao clicar em um alerta, abrir um painel lateral direito (`fixed inset-y-0 right-0 w-96 bg-slate-900 border-l border-slate-700 shadow-2xl p-6 z-50`) exibindo exatamente os valores dos sensores no segundo do incidente, destacando em vermelho a métrica que violou a regra, além dos botões `[ Reconhecer Alerta ]` e `[ Abrir Ordem de Serviço ]`.

### 5.5. Quadro Kanban (`/work-orders`)
- **Layout:** 3 colunas iguais (`grid-cols-1 lg:grid-cols-3 gap-6 h-full`).
- **Colunas:** `ABERTAS (OPEN)`, `EM ATENDIMENTO (IN_PROGRESS)`, `CONCLUÍDAS (COMPLETED)` com fundo `bg-slate-900/50 border border-slate-800 rounded-xl p-4`.
- **Cards Arrastáveis (`cdkDrag`):** `bg-slate-800 border border-slate-700 rounded-lg p-4 mb-3 shadow-sm cursor-grab active:cursor-grabbing`. Exibe ID da OS, badge de prioridade, nome do motor, resumo da falha e avatar/nome do técnico.

---

## 6. Regras de Ouro para Geração de Código

1. **Zero CSS Inline ou Arquivos `.css` Gigantes:** Use classes utilitárias do Tailwind diretamente nos templates HTML dos componentes Angular.
2. **Responsividade Real:** Todas as grids e tabelas devem funcionar perfeitamente em monitores industriais Full HD (`1920x1080`) e tablets de chão de fábrica (`768px+`).
3. **Feedback Visual Imediato:** Sempre exiba skeletons (`animate-pulse bg-slate-800`) durante o carregamento inicial das APIs e toasts discretos no canto inferior direito após ações (`POST`/`PUT`/`DELETE`).
4. **Acessibilidade de Contraste:** Nunca coloque texto escuro sobre fundo escuro ou texto cinza claro sobre fundo amarelo/verde claro. Mantenha sempre o padrão `text-{cor}-400` sobre `bg-{cor}-500/10`.