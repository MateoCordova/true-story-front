import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainViewComponent } from './view/main-view/main-view.component';
import { SplashComponent } from './components/splash/splash.component';
import { ValidateViewComponent } from './view/validate-view/validate-view.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginViewComponent } from './view/login-view/login-view.component';

const routes: Routes = [{
  path: '',
  component: SplashComponent
}, {
  path: "main",
  component: MainViewComponent
},
{
  path: "validate",
  component: ValidateViewComponent
},
{
  path: "login",
  component: LoginViewComponent
},
{
  path: "error",
  component: ErrorComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
