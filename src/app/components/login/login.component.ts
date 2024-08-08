import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
        this.validateAllFormFileds(this.loginForm);
        alert("Your Form is invalid");
      }
  }

  private validateAllFormFileds(formGroup : FormGroup)
  {
    Object.keys(formGroup.controls).forEach(field =>{
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFileds(control);
      }
    }); 

  }


}
