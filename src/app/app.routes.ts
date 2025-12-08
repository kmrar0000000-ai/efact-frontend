import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';


//Ruta inicial → redirige a /login.
//Tenemos /login y /documents listas para usar.
export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./auth/pages/login/login').then(m => m.Login),
    },
    {
        path: 'documents',
        canActivate: [authGuard],
        loadComponent: () => import('./documents/pages/documents/documents').then(m => m.Documents),
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
    },
    {
        path: '**',
        redirectTo: 'login',
    }
];
