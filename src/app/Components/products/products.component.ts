import { CommonModule } from '@angular/common';
import { Product } from '../../Models/Product';
import { ControllerService } from '../../Services/controller.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-get.products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  baseUrl = 'https://localhost:7174/product'
  products = <Array<Product>>{}

  constructor(private controllerService: ControllerService){ }

  ngOnInit(){
    this.controllerService.getProducts(this.baseUrl)
    .subscribe(d => {
      this.products = d;
    });
  }
}


