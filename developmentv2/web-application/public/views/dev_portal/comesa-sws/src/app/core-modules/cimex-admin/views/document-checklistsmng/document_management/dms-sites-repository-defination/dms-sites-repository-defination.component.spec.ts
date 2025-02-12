import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmsSitesRepositoryDefinationComponent } from './dms-sites-repository-defination.component';

describe('DmsSitesRepositoryDefinationComponent', () => {
  let component: DmsSitesRepositoryDefinationComponent;
  let fixture: ComponentFixture<DmsSitesRepositoryDefinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DmsSitesRepositoryDefinationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DmsSitesRepositoryDefinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
