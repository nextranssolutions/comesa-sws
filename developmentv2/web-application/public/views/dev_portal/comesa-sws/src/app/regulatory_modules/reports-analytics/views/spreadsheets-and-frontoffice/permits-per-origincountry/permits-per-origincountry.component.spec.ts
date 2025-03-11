import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitsPerOrigincountryComponent } from './permits-per-origincountry.component';

describe('PermitsPerOrigincountryComponent', () => {
  let component: PermitsPerOrigincountryComponent;
  let fixture: ComponentFixture<PermitsPerOrigincountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermitsPerOrigincountryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermitsPerOrigincountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
