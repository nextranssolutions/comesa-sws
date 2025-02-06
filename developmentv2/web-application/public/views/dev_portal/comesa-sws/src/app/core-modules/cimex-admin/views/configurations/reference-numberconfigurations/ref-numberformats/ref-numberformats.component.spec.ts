import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefNumberformatsComponent } from './ref-numberformats.component';

describe('RefNumberformatsComponent', () => {
  let component: RefNumberformatsComponent;
  let fixture: ComponentFixture<RefNumberformatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefNumberformatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RefNumberformatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
