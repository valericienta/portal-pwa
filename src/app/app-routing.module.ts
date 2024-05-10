import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/user/login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'liquidaciones',
  
    loadChildren: () => import('./pages/liquidaciones/liquidaciones.module').then( m => m.LiquidacionesPageModule)
  },
  {
    path: 'vacaciones',
    loadChildren: () => import('./pages/vacaciones/vacaciones.module').then( m => m.VacacionesPageModule)
  },
  {
    path: 'certificados',
    loadChildren: () => import('./pages/certificados/certificados.module').then( m => m.CertificadosPageModule)
  },
  {
    path: 'documentos',
    loadChildren: () => import('./pages/documentos/documentos.module').then( m => m.DocumentosPageModule)
  },
  {
    path: 'documentos/:tipo',
    loadChildren: () => import('./pages/documentos/documentos.module').then( m => m.DocumentosPageModule)
  },
  {
    path: 'mi-cuenta',
    loadChildren: () => import('./pages/user/mi-cuenta/mi-cuenta.module').then( m => m.MiCuentaPageModule)
  },
  {
    path: 'permisos',
    loadChildren: () => import('./pages/permisos/permisos.module').then( m => m.PermisosPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
