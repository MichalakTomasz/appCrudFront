import { ControllerService } from './../../Services/controller.service';
import { Component } from '@angular/core';
import { Product } from '../../Models/Product';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get.product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent{
  baseUrl = 'https://localhost:7174/product/';
  PlaceholderProductId = 'Product Id'
  product = <Product>{};

  constructor(private controllerService: ControllerService) {}

  productIdFormGroup = new FormGroup({
    productId : new FormControl('')
  });

  onSubmit(){
  this.controllerService.getProduct(this.baseUrl, +(this.productIdFormGroup.controls.productId.value ?? ''))
    .subscribe(p => this.product = p);
  }
}
