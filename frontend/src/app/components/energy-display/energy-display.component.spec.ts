import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyDisplayComponent } from './energy-display.component';

describe('EnergyDisplayComponent', () => {
  let component: EnergyDisplayComponent;
  let fixture: ComponentFixture<EnergyDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnergyDisplayComponent]
    });
    fixture = TestBed.createComponent(EnergyDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
