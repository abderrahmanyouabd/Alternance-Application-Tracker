import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./pages/add-application/add-application.component')
        .then(m => m.AddApplicationComponent)
  },
  {
    path: 'list',
    loadComponent: () => 
      import('./pages/applications-list/applications-list.component')
        .then(m => m.ApplicationsListComponent)
  }
]; 