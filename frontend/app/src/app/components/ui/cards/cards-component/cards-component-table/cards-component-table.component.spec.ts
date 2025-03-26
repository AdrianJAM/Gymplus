import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsComponentTableComponent } from './cards-component-table.component';

describe('CardsComponentTableComponent', () => {
  let component: CardsComponentTableComponent;
  let fixture: ComponentFixture<CardsComponentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsComponentTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardsComponentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
