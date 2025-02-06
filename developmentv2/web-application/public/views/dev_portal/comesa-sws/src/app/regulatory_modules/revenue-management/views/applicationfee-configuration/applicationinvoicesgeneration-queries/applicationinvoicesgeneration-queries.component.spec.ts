import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationinvoicesgenerationQueriesComponent } from './applicationinvoicesgeneration-queries.component';

describe('ApplicationinvoicesgenerationQueriesComponent', () => {
  let component: ApplicationinvoicesgenerationQueriesComponent;
  let fixture: ComponentFixture<ApplicationinvoicesgenerationQueriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationinvoicesgenerationQueriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationinvoicesgenerationQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
