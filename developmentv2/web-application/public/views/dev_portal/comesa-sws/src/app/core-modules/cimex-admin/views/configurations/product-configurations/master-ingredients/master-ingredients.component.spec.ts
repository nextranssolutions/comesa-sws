import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterIngredientsComponent } from './master-ingredients.component';

describe('MasterIngredientsComponent', () => {
  let component: MasterIngredientsComponent;
  let fixture: ComponentFixture<MasterIngredientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterIngredientsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MasterIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
