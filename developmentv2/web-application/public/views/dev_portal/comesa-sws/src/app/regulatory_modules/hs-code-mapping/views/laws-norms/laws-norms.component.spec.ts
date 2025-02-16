import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawsNormsComponent } from './laws-norms.component';

describe('LawsNormsComponent', () => {
  let component: LawsNormsComponent;
  let fixture: ComponentFixture<LawsNormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LawsNormsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LawsNormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
