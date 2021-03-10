import { TestBed, inject } from '@angular/core/testing';

import { UmbracoDataService } from './umbraco-data.service';

describe('UmbracoDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UmbracoDataService]
    });
  });

  it('should be created', inject([UmbracoDataService], (service: UmbracoDataService) => {
    expect(service).toBeTruthy();
  }));
});
