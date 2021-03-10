import { TestBed, inject } from '@angular/core/testing';

import { MohTranslateService } from './moh-translate.service';

describe('MohTranslateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MohTranslateService]
    });
  });

  it('should be created', inject([MohTranslateService], (service: MohTranslateService) => {
    expect(service).toBeTruthy();
  }));
});
