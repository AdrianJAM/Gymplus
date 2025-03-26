import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconServerComponent } from './icon-server.component';

describe('IconServerComponent', () => {
  let component: IconServerComponent;
  let fixture: ComponentFixture<IconServerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconServerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IconServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
