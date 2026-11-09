import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
  },
  {
    path: 'application',
    title: 'Antrag',
    loadComponent: () =>
      import('./pages/application/application.component').then(m => m.ApplicationComponent),
  },
  {
    path: 'claim',
    title: 'Schaden melden',
    loadComponent: () => import('./pages/claim/claim.component').then(m => m.ClaimComponent),
  },
  {
    path: 'profile',
    title: 'Profil',
    loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
  },
  {
    path: 'showcase',
    title: 'Showcase',
    loadComponent: () => import('./pages/showcase/showcase.component').then(m => m.ShowcaseComponent),
  },
  { path: '**', redirectTo: '' },
]
