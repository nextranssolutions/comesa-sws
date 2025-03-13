import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftExportlicensedashComponent } from './draft-exportlicensedash.component';

describe('DraftExportlicensedashComponent', () => {
  let component: DraftExportlicensedashComponent;
  let fixture: ComponentFixture<DraftExportlicensedashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftExportlicensedashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DraftExportlicensedashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
