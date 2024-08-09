import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import ValidateForm from '../../helpers/validationform';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ 
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule  
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  
})
export class LoginComponent implements OnInit {

  type: string = "password"; 
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}  

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

  onLogin()
  {
    if (this.loginForm.valid) 
    {
     // Send the form data to the server
      console.log(this.loginForm.value);
      this.auth.login(this.loginForm.value).subscribe(
        (res) => { 
          alert(res.message);
          this.loginForm.reset();
          this.router.navigate(['home'])
        },
        (error) => {
          alert(error?.error.message);
        }
      );
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
