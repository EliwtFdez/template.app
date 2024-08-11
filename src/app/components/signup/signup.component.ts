import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import ValidateForm from '../../helpers/validationform';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ 
    CommonModule,
    RouterModule,
    FormsModule ,
    ReactiveFormsModule,
    HttpClientModule,
  ],  animations: [
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
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // -- variables
  type: string = "password"; 
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signUpForm!: FormGroup;
  private toastService = inject(NgToastService); //inject the service

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      // other fields...
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.eyeIcon = this.isText ? "fa-eye" : "fa-eye-slash";
    this.type = this.isText ? "text" : "password";
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      // -- perform logic for signup
      console.log(this.signUpForm.value);
      this.auth.signUp(this.signUpForm.value).subscribe(
        (res) => { 
          alert(res.message);
          this.signUpForm.reset();
          this.router.navigate(['login']); // Use the Router to navigate
        },
        (error) => {
          alert(error?.error.message);
        }
      );
    } else {
      // -- logic for throwing error
      ValidateForm.validateAllFormFields(this.signUpForm);
    }
  }
}
