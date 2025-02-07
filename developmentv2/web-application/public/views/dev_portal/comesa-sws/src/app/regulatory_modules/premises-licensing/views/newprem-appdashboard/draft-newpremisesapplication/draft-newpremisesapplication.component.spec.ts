import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftNewpremisesapplicationComponent } from './draft-newpremisesapplication.component';

describe('DraftNewpremisesapplicationComponent', () => {
  let component: DraftNewpremisesapplicationComponent;
  let fixture: ComponentFixture<DraftNewpremisesapplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftNewpremisesapplicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DraftNewpremisesapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
