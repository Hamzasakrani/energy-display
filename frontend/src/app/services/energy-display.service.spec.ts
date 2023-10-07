import { TestBed } from '@angular/core/testing';

import { EnergyDisplayService } from './energy-display.service';

describe('EnergyDisplayService', () => {
  let service: EnergyDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnergyDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
