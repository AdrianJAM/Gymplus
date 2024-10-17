import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsComponentButtonComponent } from './cards-component-button.component';

describe('CardsComponentButtonComponent', () => {
  let component: CardsComponentButtonComponent;
  let fixture: ComponentFixture<CardsComponentButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsComponentButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardsComponentButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
