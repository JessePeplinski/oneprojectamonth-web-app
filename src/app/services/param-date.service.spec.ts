import { TestBed, inject } from '@angular/core/testing';

import { ParamDateService } from './param-date.service';

describe('ParamDateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParamDateService]
    });
  });

  it('should be created', inject([ParamDateService], (service: ParamDateService) => {
    expect(service).toBeTruthy();
  }));
});
