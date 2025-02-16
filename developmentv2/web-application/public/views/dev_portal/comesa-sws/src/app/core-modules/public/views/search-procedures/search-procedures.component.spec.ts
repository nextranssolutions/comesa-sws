import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProceduresComponent } from './search-procedures.component';

describe('SearchProceduresComponent', () => {
  let component: SearchProceduresComponent;
  let fixture: ComponentFixture<SearchProceduresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchProceduresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchProceduresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
