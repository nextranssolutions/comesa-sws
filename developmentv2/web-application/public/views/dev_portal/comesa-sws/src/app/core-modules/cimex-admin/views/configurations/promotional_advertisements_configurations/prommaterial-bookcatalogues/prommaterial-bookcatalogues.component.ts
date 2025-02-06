import { Component } from '@angular/core';

@Component({
  selector: 'app-prommaterial-bookcatalogues',
  templateUrl: './prommaterial-bookcatalogues.component.html',
  styleUrl: './prommaterial-bookcatalogues.component.css'
})
export class PrommaterialBookcataloguesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_prommaterial_bookcatalogues';
    this.parameter_name = "promotion_material_book_catalogues";
  }
}
