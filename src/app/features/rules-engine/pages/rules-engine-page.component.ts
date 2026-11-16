import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-rules-engine-page',
  standalone: true,
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-slate-100">Studio de Regras & Automação Closed-Loop</h1>
        <p class="text-sm text-slate-400">Construtor visual de regras dinâmicas multi-sensor (AND / OR) e acionamento de atuadores</p>
      </div>
      <div class="bg-slate-800 border border-slate-700 rounded-xl p-6 text-slate-300">
        <p>Módulo de Motor de Regras (F4-US01 / F4-US02) em construção.</p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RulesEnginePageComponent {}
