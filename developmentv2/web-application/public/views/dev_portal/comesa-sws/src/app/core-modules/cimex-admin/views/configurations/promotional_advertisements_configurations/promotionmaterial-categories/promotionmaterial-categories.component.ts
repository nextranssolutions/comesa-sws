import { Component } from '@angular/core';

@Component({
  selector: 'app-promotionmaterial-categories',
  templateUrl: './promotionmaterial-categories.component.html',
  styleUrl: './promotionmaterial-categories.component.css'
})
export class PromotionmaterialCategoriesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_promotionmaterial_categories';
    this.parameter_name = "promotion_material_categories";
  }
}
