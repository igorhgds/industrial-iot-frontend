import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { HealthStatus } from '../../../core/models/domain.enums';

@Component({
  selector: 'app-health-badge',
  standalone: true,
  templateUrl: './health-badge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HealthBadgeComponent {
  /**
   * Status de saúde obrigatório que o componente pai precisa fornecer.
   * Exemplo de uso: <app-health-badge [status]="HealthStatus.OPERATIONAL" />
   */
  readonly status = input.required<HealthStatus>();

  /**
   * Tamanho opcional do badge: 'sm' (para tabelas) ou 'md' (padrão, para cards).
   * Se o pai não passar nada, o padrão é 'md'.
   */
  readonly size = input<'sm' | 'md'>('md');

  /**
   * Label amigável em português para exibição visual.
   */
  protected readonly label = computed(() => {
    switch (this.status()) {
      case HealthStatus.OPERATIONAL:
        return 'OPERACIONAL';
      case HealthStatus.WARNING:
        return 'ATENÇÃO';
      case HealthStatus.CRITICAL:
        return 'CRÍTICO';
      default:
        return 'DESCONHECIDO';
    }
  });

  /**
   * Classes do Tailwind CSS conforme o nosso Design System (design_system_e_guia_ui_ux_antigravity.md).
   * Fundo com opacidade suave (/10 ou /15), texto vibrante e borda sutil.
   */
  protected readonly badgeClasses = computed(() => {
    const baseClasses = 'inline-flex items-center gap-1.5 font-medium rounded-full border transition-colors';
    const sizeClasses = this.size() === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

    switch (this.status()) {
      case HealthStatus.OPERATIONAL:
        return `${baseClasses} ${sizeClasses} bg-emerald-500/10 text-emerald-400 border-emerald-500/30`;
      case HealthStatus.WARNING:
        return `${baseClasses} ${sizeClasses} bg-amber-500/10 text-amber-400 border-amber-500/40`;
      case HealthStatus.CRITICAL:
        return `${baseClasses} ${sizeClasses} bg-red-500/15 text-red-400 border-red-500/50 shadow-sm shadow-red-500/10`;
      default:
        return `${baseClasses} ${sizeClasses} bg-slate-500/10 text-slate-400 border-slate-500/30`;
    }
  });

  /**
   * Cor da bolinha indicadora (led indicador com efeito de pulso).
   */
  protected readonly dotClasses = computed(() => {
    switch (this.status()) {
      case HealthStatus.OPERATIONAL:
        return 'bg-emerald-400';
      case HealthStatus.WARNING:
        return 'bg-amber-400';
      case HealthStatus.CRITICAL:
        return 'bg-red-400 animate-pulse';
      default:
        return 'bg-slate-400';
    }
  });
}
