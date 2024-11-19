import { ControllerService } from '../../Services/controller.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Credentials } from '../../Models/Credentials';

@Component({
  selector: 'register-add.user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.user.component.html',
  styleUrl: './register.user.component.css'
})
export class RegisterUserComponent {
  baseUrl = 'https://localhost:7174/auth/register/';
  emailPlaceholder = 'Email';
  passwordPlaceholder = 'Password';
  registerUserResult = '';
  constructor(private controllerService: ControllerService) {}
  addUserFormGroup = new FormGroup({
    email : new FormControl(''),
    password : new FormControl('')
  });

  onSubmit(){
    let credentials : Credentials = {
      email : this.addUserFormGroup.controls.email.value ?? '',
      password : this.addUserFormGroup.controls.password.value ?? ''
    }
    this.controllerService.registerUser(this.baseUrl, credentials)
    .subscribe({
      next : () => this.registerUserResult = 'Register user successful',
      error : e => {
        if (e.error){
          if (Array.isArray(e.error)){
            let errorMessage = e.error.map((er: { errorMessage: string; }) => er.errorMessage).join(',');
            this.registerUserResult = errorMessage;
          }
          if (typeof e.error === 'string'){
            this.registerUserResult = e.error
          }
        }
      }
    });
  }
}

