import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-work-orders-page',
  standalone: true,
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-slate-100">Quadro Kanban de Ordens de Serviço</h1>
        <p class="text-sm text-slate-400">Fluxo de manutenção: Abertas (OPEN) -> Em Atendimento (IN_PROGRESS) -> Concluídas (COMPLETED)</p>
      </div>
      <div class="bg-slate-800 border border-slate-700 rounded-xl p-6 text-slate-300">
        <p>Módulo de Ordens de Serviço (F5-US02) em construção.</p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkOrdersPageComponent {}
