import { TestBed, inject } from '@angular/core/testing';

import { CarService } from './participant.service';

describe('CarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarService]
    });
  });

  it('should be created', inject([CarService], (service: CarService) => {
    expect(service).toBeTruthy();
  }));
});
