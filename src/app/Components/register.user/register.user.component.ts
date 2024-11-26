import { PasswordPolicy } from './../../Models/PasswordPolicy';
import { ControllerService } from '../../Services/controller.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Credentials } from '../../Models/Credentials';
import { MaterialModule } from '../../material/material.module';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
    selector: 'register-add.user',
    imports: [ReactiveFormsModule, CommonModule, MaterialModule],
    templateUrl: './register.user.component.html',
    styleUrl: './register.user.component.css'
})
export class RegisterUserComponent implements OnInit {
  baseUrl = 'https://localhost:7174/auth/';
  emailPlaceholder = 'Email';
  passwordPlaceholder = 'Password';
  registerUserResult = '';
  passwordPolicy = <PasswordPolicy>{};
  constructor(private controllerService: ControllerService) {}

  ngOnInit(): void {
    this.controllerService.getPasswordPolicy(this.baseUrl + 'passwordpolicy/')
    .subscribe(r =>
      {
        this.passwordPolicy = r
      });
  }
  addUserFormGroup = new FormGroup({
    email : new FormControl(''),
    password : new FormControl('')
  });

  onSubmit(){
    let credentials : Credentials = {
      email : this.addUserFormGroup.controls.email.value ?? '',
      password : this.addUserFormGroup.controls.password.value ?? ''
    }
    this.controllerService.registerUser(this.baseUrl + 'register/', credentials)
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

function SubjectBehavior<T>() {
  throw new Error('Function not implemented.');
}

