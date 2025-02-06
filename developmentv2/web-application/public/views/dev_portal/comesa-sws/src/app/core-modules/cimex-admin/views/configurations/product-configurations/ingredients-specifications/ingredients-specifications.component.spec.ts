import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsSpecificationsComponent } from './ingredients-specifications.component';

describe('IngredientsSpecificationsComponent', () => {
  let component: IngredientsSpecificationsComponent;
  let fixture: ComponentFixture<IngredientsSpecificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientsSpecificationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngredientsSpecificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
