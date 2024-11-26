import { GuidRequest } from './../../Models/GuidRequest';
import { ControllerService } from './../../Services/controller.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';

@Component({
    selector: 'app-delete.user',
    imports: [ReactiveFormsModule, CommonModule, MaterialModule],
    templateUrl: './delete.user.component.html',
    styleUrl: './delete.user.component.css'
})
export class DeleteUserComponent {
  baseUrl = 'https://localhost:7174/auth/deleteaccount/';
  idPladeholder = 'Guid';
  deleteUserResult = '';

  constructor(private controllerService : ControllerService) {}

  deleteUserFormGroup = new FormGroup({
    id : new FormControl('')
  });

  onSubmit(){
    let guidRequest : GuidRequest = {
      guid : this.deleteUserFormGroup.controls.id.value ?? ''
    }
    this.controllerService.deleteUser(this.baseUrl, guidRequest)
    .subscribe({
      next : () => this.deleteUserResult = 'Delete user successful',
      error : e => {
        if (e.error){
          if (Array.isArray(e.error)){
            let errorMessage = e.error.map((er: { errorMessage: string; }) => er.errorMessage).join(',');
            this.deleteUserResult = errorMessage;
          }
          if (typeof e.error === 'string'){
            this.deleteUserResult = e.error
          }
        }
      }
    });
  }
}
