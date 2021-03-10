import { TestBed, inject } from '@angular/core/testing';

import { StickySectionService } from './sticky-section.service';

describe('StickySectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StickySectionService]
    });
  });

  it('should be created', inject([StickySectionService], (service: StickySectionService) => {
    expect(service).toBeTruthy();
  }));
});
