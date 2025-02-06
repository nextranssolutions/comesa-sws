import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrommaterialBookcataloguesComponent } from './prommaterial-bookcatalogues.component';

describe('PrommaterialBookcataloguesComponent', () => {
  let component: PrommaterialBookcataloguesComponent;
  let fixture: ComponentFixture<PrommaterialBookcataloguesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrommaterialBookcataloguesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrommaterialBookcataloguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
