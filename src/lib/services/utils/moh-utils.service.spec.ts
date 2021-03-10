import { TestBed, inject } from '@angular/core/testing';

import { MohUtilsService } from './moh-utils.service';

describe('MohUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MohUtilsService]
    });
  });

  it('should be created', inject([MohUtilsService], (service: MohUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
