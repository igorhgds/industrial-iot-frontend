import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-users-page',
  standalone: true,
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-slate-100">Diretório de Usuários & Técnicos</h1>
        <p class="text-sm text-slate-400">Operadores, Engenheiros e Técnicos autorizados para atuação na planta</p>
      </div>
      <div class="bg-slate-800 border border-slate-700 rounded-xl p-6 text-slate-300">
        <p>Módulo de Usuários (F2-US03) em construção.</p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersPageComponent {}
