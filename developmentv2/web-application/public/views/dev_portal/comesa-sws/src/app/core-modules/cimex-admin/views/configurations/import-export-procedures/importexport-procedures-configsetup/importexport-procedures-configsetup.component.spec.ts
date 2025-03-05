import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportexportProceduresConfigsetupComponent } from './importexport-procedures-configsetup.component';

describe('ImportexportProceduresConfigsetupComponent', () => {
  let component: ImportexportProceduresConfigsetupComponent;
  let fixture: ComponentFixture<ImportexportProceduresConfigsetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportexportProceduresConfigsetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportexportProceduresConfigsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
