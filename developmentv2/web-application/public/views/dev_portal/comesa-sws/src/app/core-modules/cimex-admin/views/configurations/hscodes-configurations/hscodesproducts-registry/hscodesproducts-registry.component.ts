import { Component } from '@angular/core';

@Component({
  selector: 'app-hscodesproducts-registry',
  templateUrl: './hscodesproducts-registry.component.html',
  styleUrl: './hscodesproducts-registry.component.css'
})
export class HscodesproductsRegistryComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'tra_hscodesproducts_registry';
    this.parameter_name = "hscodes_products_registry";
  }
}
