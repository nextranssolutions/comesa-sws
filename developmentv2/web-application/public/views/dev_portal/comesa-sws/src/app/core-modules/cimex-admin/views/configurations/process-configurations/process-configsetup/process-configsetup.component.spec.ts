import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessConfigsetupComponent } from './process-configsetup.component';

describe('ProcessConfigsetupComponent', () => {
  let component: ProcessConfigsetupComponent;
  let fixture: ComponentFixture<ProcessConfigsetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessConfigsetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessConfigsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
