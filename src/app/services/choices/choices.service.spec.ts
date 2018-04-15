import { TestBed, inject } from '@angular/core/testing';

import { ChoicesService } from './choices.service';

describe('ChoicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChoicesService]
    });
  });

  it('should be created', inject([ChoicesService], (service: ChoicesService) => {
    expect(service).toBeTruthy();
  }));
});
