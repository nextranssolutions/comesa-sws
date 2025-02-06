import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineapplicationsinvoicesgenerationQueriesComponent } from './onlineapplicationsinvoicesgeneration-queries.component';

describe('OnlineapplicationsinvoicesgenerationQueriesComponent', () => {
  let component: OnlineapplicationsinvoicesgenerationQueriesComponent;
  let fixture: ComponentFixture<OnlineapplicationsinvoicesgenerationQueriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineapplicationsinvoicesgenerationQueriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnlineapplicationsinvoicesgenerationQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
