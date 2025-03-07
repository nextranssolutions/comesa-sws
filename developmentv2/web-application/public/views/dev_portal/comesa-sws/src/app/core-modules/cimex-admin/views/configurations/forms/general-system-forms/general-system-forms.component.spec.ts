import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSystemFormsComponent } from './general-system-forms.component';

describe('GeneralSystemFormsComponent', () => {
  let component: GeneralSystemFormsComponent;
  let fixture: ComponentFixture<GeneralSystemFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralSystemFormsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralSystemFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
