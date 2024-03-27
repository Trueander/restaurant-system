import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { LoginGuard } from './modules/auth/guards/login.guard';
import {AuthGuard} from "./modules/auth/guards/auth.guard";

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canMatch: [AuthGuard],
    loadChildren: () => import(`./modules/home/home.module`).then(m => m.HomeModule)
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
    loadChildren: () => import(`./modules/auth/auth.module`).then(m => m.AuthModule)
  },
  {
    path: '**', redirectTo: '/login', pathMatch: 'full'
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
