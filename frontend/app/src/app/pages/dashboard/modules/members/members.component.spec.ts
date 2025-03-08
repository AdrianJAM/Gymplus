import { ComponentFixture, TestBed } from '@angular/core/testing';

import { memberDashboardComponent } from './members.component';

describe('memberDashboardComponent', () => {
  let component: memberDashboardComponent;
  let fixture: ComponentFixture<memberDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [memberDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(memberDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
