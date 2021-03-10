import { TestBed, inject } from '@angular/core/testing';

import { TelephoneService } from './telephone.service';

describe('TelephoneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TelephoneService]
    });
  });

  it('should be created', inject([TelephoneService], (service: TelephoneService) => {
    expect(service).toBeTruthy();
  }));
});
