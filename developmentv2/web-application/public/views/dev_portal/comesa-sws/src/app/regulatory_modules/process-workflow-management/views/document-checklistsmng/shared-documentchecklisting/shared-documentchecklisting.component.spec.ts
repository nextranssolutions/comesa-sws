import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDocumentchecklistingComponent } from './shared-documentchecklisting.component';

describe('SharedDocumentchecklistingComponent', () => {
  let component: SharedDocumentchecklistingComponent;
  let fixture: ComponentFixture<SharedDocumentchecklistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedDocumentchecklistingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedDocumentchecklistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
