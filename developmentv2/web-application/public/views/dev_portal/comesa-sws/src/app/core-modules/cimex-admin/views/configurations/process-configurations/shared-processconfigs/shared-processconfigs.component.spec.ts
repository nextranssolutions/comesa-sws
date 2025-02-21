import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedProcessconfigsComponent } from './shared-processconfigs.component';

describe('SharedProcessconfigsComponent', () => {
  let component: SharedProcessconfigsComponent;
  let fixture: ComponentFixture<SharedProcessconfigsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedProcessconfigsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedProcessconfigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
