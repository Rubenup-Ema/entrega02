import { Routes } from '@angular/router';
import { RoutePaths } from './shared/utils/routes';

export const routes: Routes = [

    {path: RoutePaths.LOGIN, loadComponent: () => import('./home/login/login').then(m => m.Login) },
     {path: RoutePaths.HOME, loadComponent: () => import('./home/dashboard/dashboard').then(m => m.Dashboard) },

     {path: '', redirectTo: RoutePaths.LOGIN, pathMatch:'full'}

];
