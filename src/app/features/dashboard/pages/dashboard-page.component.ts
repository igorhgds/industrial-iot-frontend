import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HealthBadgeComponent } from '../../../shared/components/health-badge/health-badge.component';
import { HealthStatus } from '../../../core/models/domain.enums';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [HealthBadgeComponent],
  template: `
    <div class="space-y-6">
      <!-- Cabeçalho da Página -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-slate-100">Painel Geral da Planta</h1>
          <p class="text-sm text-slate-400">Monitoramento instantâneo O(1) de motores e telemetria crítica</p>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs text-slate-400 font-mono">Última atualização: há 2s</span>
        </div>
      </div>

      <!-- KPI Summary Cards (Fiel ao Mockup model.jpeg) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div class="text-xs text-slate-400 uppercase font-semibold">Total Motores</div>
          <div class="text-3xl font-bold font-mono tabular-nums text-slate-100 mt-2">24</div>
        </div>

        <div class="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div class="text-xs text-emerald-400 uppercase font-semibold">Operacionais</div>
          <div class="text-3xl font-bold font-mono tabular-nums text-emerald-400 mt-2">20</div>
        </div>

        <div class="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div class="text-xs text-amber-400 uppercase font-semibold">Atenção</div>
          <div class="text-3xl font-bold font-mono tabular-nums text-amber-400 mt-2">3</div>
        </div>

        <div class="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div class="text-xs text-red-400 uppercase font-semibold">Críticos</div>
          <div class="text-3xl font-bold font-mono tabular-nums text-red-400 mt-2">1</div>
        </div>
      </div>

      <!-- Exemplo de Demonstração dos Badges de Saúde -->
      <div class="bg-slate-800/60 border border-slate-700/80 rounded-xl p-6">
        <h2 class="text-lg font-semibold text-slate-100 mb-2">Equipamentos em Destaque</h2>
        <p class="text-xs text-slate-400 mb-4">Integrado com o componente <code class="text-blue-400 font-mono">&lt;app-health-badge /&gt;</code> criado na Issue #3.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-slate-900 border border-red-500/50 rounded-lg p-4 shadow-sm shadow-red-500/10">
            <div class="flex items-center justify-between mb-2">
              <span class="font-mono font-semibold text-slate-100">MOTOR-EXTRUSORA-01</span>
              <app-health-badge [status]="HealthStatus.CRITICAL" />
            </div>
            <p class="text-xs text-slate-400">Setor: Usinagem • Temp: 88.5 °C</p>
          </div>

          <div class="bg-slate-900 border border-slate-700 rounded-lg p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="font-mono font-semibold text-slate-100">MOTOR-PRENSA-03</span>
              <app-health-badge [status]="HealthStatus.WARNING" />
            </div>
            <p class="text-xs text-slate-400">Setor: Estamparia • Vib: 4.8 mm/s</p>
          </div>

          <div class="bg-slate-900 border border-slate-700 rounded-lg p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="font-mono font-semibold text-slate-100">MOTOR-BOMBA-02</span>
              <app-health-badge [status]="HealthStatus.OPERATIONAL" />
            </div>
            <p class="text-xs text-slate-400">Setor: Resfriamento • Normal</p>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent {
  protected readonly HealthStatus = HealthStatus;
}
