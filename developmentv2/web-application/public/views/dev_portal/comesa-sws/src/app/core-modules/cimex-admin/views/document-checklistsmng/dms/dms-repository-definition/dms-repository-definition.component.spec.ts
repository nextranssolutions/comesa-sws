import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmsRepositoryDefinitionComponent } from './dms-repository-definition.component';

describe('DmsRepositoryDefinitionComponent', () => {
  let component: DmsRepositoryDefinitionComponent;
  let fixture: ComponentFixture<DmsRepositoryDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DmsRepositoryDefinitionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DmsRepositoryDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
