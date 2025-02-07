import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftImportlicensedashComponent } from './draft-importlicensedash.component';

describe('DraftImportlicensedashComponent', () => {
  let component: DraftImportlicensedashComponent;
  let fixture: ComponentFixture<DraftImportlicensedashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftImportlicensedashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DraftImportlicensedashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
