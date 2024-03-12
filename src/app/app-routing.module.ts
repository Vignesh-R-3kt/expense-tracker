import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainBodyComponent } from './components/main-body/main-body.component';
import { authGuardGuard } from './shared/auth-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'main-body', loadChildren: () => import('./components/main-body/main-body.module').then(m => m.MainBodyModule), canActivate: [authGuardGuard] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
