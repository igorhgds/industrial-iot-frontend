import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface NavItem {
  readonly path: string;
  readonly label: string;
  readonly icon: string;
  readonly badge?: number;
}

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  /**
   * Estado reativo da barra lateral (expandida ou recolhida).
   */
  readonly isCollapsed = signal(false);

  /**
   * Status simulado da conexão SSE em tempo real.
   */
  readonly isConnected = signal(true);

  /**
   * Contador de alertas pendentes (PENDING) exibido na Topbar e no menu.
   */
  readonly pendingAlertsCount = signal(3);

  /**
   * Itens de navegação do sistema SCADA.
   */
  readonly navItems: readonly NavItem[] = [
    { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/plant-assets', label: 'Ativos da Planta', icon: 'assets' },
    { path: '/rules-engine', label: 'Motor de Regras', icon: 'rules' },
    { path: '/alerts', label: 'Central de Alertas', icon: 'alerts', badge: 3 },
    { path: '/work-orders', label: 'Ordens de Serviço', icon: 'work-orders' },
    { path: '/users', label: 'Usuários & Técnicos', icon: 'users' },
  ];

  toggleSidebar(): void {
    this.isCollapsed.update((collapsed) => !collapsed);
  }
}
