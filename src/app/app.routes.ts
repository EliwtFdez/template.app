import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export const routes: Routes = [
    {
        path:'login', component: LoginComponent
    },
    {
        path:'singup', component: SignupComponent
    },

];

@NgModule({
    imports: [RouterModule,
              CommonModule,
              RouterModule.forRoot(routes),
              ReactiveFormsModule,
              ],

    exports: [RouterModule,
              ReactiveFormsModule, 
             ]
 })
 
 export class AppRoutingModule { }