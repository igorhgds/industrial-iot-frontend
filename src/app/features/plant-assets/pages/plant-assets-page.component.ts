import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-plant-assets-page',
  standalone: true,
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-slate-100">Ativos da Planta & Gateways IoT</h1>
        <p class="text-sm text-slate-400">Hierarquia física: Setores Industriais, Gateways de Comunicação e Máquinas</p>
      </div>
      <div class="bg-slate-800 border border-slate-700 rounded-xl p-6 text-slate-300">
        <p>Módulo de Ativos da Planta (F2-US01 / F2-US02) em construção.</p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlantAssetsPageComponent {}
