import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodofUseComponent } from './methodof-use.component';

describe('MethodofUseComponent', () => {
  let component: MethodofUseComponent;
  let fixture: ComponentFixture<MethodofUseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MethodofUseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MethodofUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
