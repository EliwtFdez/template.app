import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Form, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ CommonModule,
             RouterModule
           ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {
  // -- variables
  type: string ="password"; 
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  singUpForm!: FormGroup;
  
  constructor(private fb: FormGroup) {}
 
  ngOnInit() : void
  {
    this.singUpForm = this.fb.group({
      firstName = ['', Validators.required],
      firstName = ['', Validators.required],
      firstName = ['', Validators.required],
      firstName = ['', Validators.required],
      firstName = ['', Validators.required],
      // modificar esto
      
    })
  }

 hideShowPass()
 {
   this.isText = !this.isText;
   this.isText? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
   this.isText? this.type = "text" : this.type = "password"
 }




}
