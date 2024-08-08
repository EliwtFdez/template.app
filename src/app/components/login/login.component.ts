import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { RouterModule } from '@angular/router';
import ValidateForm from '../../helpers/validationform';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ 
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule  
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  
})
export class LoginComponent implements OnInit {

  type: string = "password"; 
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {}  

  ngOnInit() 
  {  
  this.loginForm = this.fb.group({
      // Define your form controls here
      username: ['',Validators.required],
      password: ['',Validators.required]
    });
  }
  
  hideShowPass() 
  {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onSubmit()
  {
    if (this.loginForm.valid) 
    {
      //send obj to database
      console.log(this.loginForm.value);
    } 
      else 
      {
        //trhow error
        console.log("Form is not valid");        
        ValidateForm.validateAllFormFields(this.loginForm); //{7}      
         alert("Your Form is invalid");
      }
  }

}
