import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsComponentComponent } from './cards-component.component';

describe('CardsComponentComponent', () => {
  let component: CardsComponentComponent;
  let fixture: ComponentFixture<CardsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
