import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { LoginGuard } from './modules/auth/guards/login.guard';

const appRoutes: Routes = [
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: '',
    component: HomeComponent,
    canMatch: [AuthGuard],
    canActivate: [AuthGuard],
    loadChildren: () => import(`./modules/home/home.module`).then(m => m.HomeModule)
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
    loadChildren: () => import(`./modules/auth/auth.module`).then(m => m.AuthModule)
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
