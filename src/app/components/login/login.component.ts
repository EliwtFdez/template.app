import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import ValidateForm from '../../helpers/validationform';
import { AuthService } from '../../services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ 
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  animations: [
    trigger('showHide', [
      state('show', style({
        opacity: 1,
        display: 'block'
      })),
      state('hide', style({
        opacity: 0,
        display: 'none'
      })),
      transition('show => hide', [
        animate('0.5s')
      ]),
      transition('hide => show', [
        animate('0.5s')
      ]),
    ]),
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  
})
export class LoginComponent implements OnInit {

  type: string = "password"; 
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;
  private toastService = inject(NgToastService); //inject the service

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}  

  ngOnInit() 
  {  
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  hideShowPass() 
  {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.auth.login(this.loginForm.value).subscribe(
        (res) => { 
          this.toastService.success({ detail: "SUCCESS", summary: "Login successful!", duration: 5000});
          this.loginForm.reset();
          this.router.navigate(['home']);
        },
        (error) => {
          this.toastService.warning({ detail: "WARNING", summary: "Something went wrong!", duration: 5000});        
        }
      );
    } else {
      console.log("Form is not valid");        
      ValidateForm.validateAllFormFields(this.loginForm);      
      this.toastService.error({ detail: "ERROR", summary: "Your form is not valid",duration: 5000 });    
    }
  }  
}
