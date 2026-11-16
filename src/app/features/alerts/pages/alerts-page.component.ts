import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-alerts-page',
  standalone: true,
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-slate-100">Central de Alertas & Incidentes</h1>
        <p class="text-sm text-slate-400">Ciclo de vida de anomalias (PENDING -> ACKNOWLEDGED -> RESOLVED) e Sensor Snapshot</p>
      </div>
      <div class="bg-slate-800 border border-slate-700 rounded-xl p-6 text-slate-300">
        <p>Módulo de Alertas (F5-US01) em construção.</p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertsPageComponent {}
