import { TestBed, inject } from '@angular/core/testing';

import { CustomTranslateLoader } from './custom-translate-loader.service';

describe('CustomTranslateLoader.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomTranslateLoader]
    });
  });

  it('should be created', inject([CustomTranslateLoader], (service: CustomTranslateLoader) => {
    expect(service).toBeTruthy();
  }));
});
