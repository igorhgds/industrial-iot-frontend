import { Routes } from '@angular/router';
import { ShellComponent } from './core/layout/shell/shell.component';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        title: 'Dashboard • IIoT Plant Monitor',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard-page.component').then(
            (m) => m.DashboardPageComponent
          ),
      },
      {
        path: 'plant-assets',
        title: 'Ativos da Planta • IIoT Plant Monitor',
        loadComponent: () =>
          import('./features/plant-assets/pages/plant-assets-page.component').then(
            (m) => m.PlantAssetsPageComponent
          ),
      },
      {
        path: 'rules-engine',
        title: 'Motor de Regras • IIoT Plant Monitor',
        loadComponent: () =>
          import('./features/rules-engine/pages/rules-engine-page.component').then(
            (m) => m.RulesEnginePageComponent
          ),
      },
      {
        path: 'alerts',
        title: 'Central de Alertas • IIoT Plant Monitor',
        loadComponent: () =>
          import('./features/alerts/pages/alerts-page.component').then(
            (m) => m.AlertsPageComponent
          ),
      },
      {
        path: 'work-orders',
        title: 'Ordens de Serviço • IIoT Plant Monitor',
        loadComponent: () =>
          import('./features/work-orders/pages/work-orders-page.component').then(
            (m) => m.WorkOrdersPageComponent
          ),
      },
      {
        path: 'users',
        title: 'Usuários & Técnicos • IIoT Plant Monitor',
        loadComponent: () =>
          import('./features/users/pages/users-page.component').then(
            (m) => m.UsersPageComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
