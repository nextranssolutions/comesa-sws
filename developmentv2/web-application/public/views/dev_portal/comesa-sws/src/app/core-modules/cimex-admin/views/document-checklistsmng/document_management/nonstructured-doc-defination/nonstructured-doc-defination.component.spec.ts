import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonstructuredDocDefinationComponent } from './nonstructured-doc-defination.component';

describe('NonstructuredDocDefinationComponent', () => {
  let component: NonstructuredDocDefinationComponent;
  let fixture: ComponentFixture<NonstructuredDocDefinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NonstructuredDocDefinationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NonstructuredDocDefinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
