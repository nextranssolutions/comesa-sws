import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderprocessingImportlicencedashComponent } from './underprocessing-importlicencedash.component';

describe('UnderprocessingImportlicencedashComponent', () => {
  let component: UnderprocessingImportlicencedashComponent;
  let fixture: ComponentFixture<UnderprocessingImportlicencedashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnderprocessingImportlicencedashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnderprocessingImportlicencedashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
