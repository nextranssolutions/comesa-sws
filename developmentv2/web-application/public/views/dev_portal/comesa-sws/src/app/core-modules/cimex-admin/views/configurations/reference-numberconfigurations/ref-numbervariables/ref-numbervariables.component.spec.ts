import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefNumbervariablesComponent } from './ref-numbervariables.component';

describe('RefNumbervariablesComponent', () => {
  let component: RefNumbervariablesComponent;
  let fixture: ComponentFixture<RefNumbervariablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefNumbervariablesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RefNumbervariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
