import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '', redirectTo: '/home', pathMatch: 'full'
    },
    {
        path:'login', component: LoginComponent
    },
    {
        path:'singup', component: SignupComponent
    },
    {
        path:'home', component: DashboardComponent
    }

];

@NgModule({
    imports: [RouterModule,
              CommonModule,
              RouterModule.forRoot(routes),
              ReactiveFormsModule,
              BrowserModule,
              HttpClientModule,
              ],

    exports: [RouterModule,
              ReactiveFormsModule,

             ]
 })
 
 export class AppRoutingModule { }