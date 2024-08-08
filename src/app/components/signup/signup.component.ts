import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { RouterModule } from '@angular/router';
import ValidateForm from '../../helpers/validationform';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ CommonModule,
             RouterModule,
             CommonModule,
             FormsModule,
             ReactiveFormsModule 
           ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent implements OnInit{
  // -- variables
  type: string ="password"; 
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signUpForm!: FormGroup;
  
  constructor(private fb: FormBuilder) {}
 
  ngOnInit() : void
  {
    this.signUpForm = this.fb.group({
      firstName : ['', Validators.required],
      lastName  : ['', Validators.required],
      userName  : ['', Validators.required],
      email     : ['', Validators.required],
      password  : ['', Validators.required],
      // modificar esto
      
    })
  }

 hideShowPass()
 {
   this.isText = !this.isText;
   this.isText? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
   this.isText? this.type = "text" : this.type = "password"
 }

  onSingUp(){
    if (this.signUpForm.valid) {
      // -- perform logic for singup
      console.log(this.signUpForm.value);
      
    } else
    {
      // -- logic for throwing erro
      ValidateForm.validateAllFormFields(this.signUpForm); //{7}
    }
  }

}
