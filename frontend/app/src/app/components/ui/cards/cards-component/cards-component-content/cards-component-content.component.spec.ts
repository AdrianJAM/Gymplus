import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsComponentContentComponent } from './cards-component-content.component';

describe('CardsComponentContentComponent', () => {
  let component: CardsComponentContentComponent;
  let fixture: ComponentFixture<CardsComponentContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsComponentContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardsComponentContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
