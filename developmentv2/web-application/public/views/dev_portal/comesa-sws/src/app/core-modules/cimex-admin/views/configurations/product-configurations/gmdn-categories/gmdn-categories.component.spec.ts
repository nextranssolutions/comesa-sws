import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GmdnCategoriesComponent } from './gmdn-categories.component';

describe('GmdnCategoriesComponent', () => {
  let component: GmdnCategoriesComponent;
  let fixture: ComponentFixture<GmdnCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GmdnCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GmdnCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
