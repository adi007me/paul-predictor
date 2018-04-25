import { TestBed, inject } from '@angular/core/testing';

import { BetterListService } from './better-list.service';

describe('BetterListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BetterListService]
    });
  });

  it('should be created', inject([BetterListService], (service: BetterListService) => {
    expect(service).toBeTruthy();
  }));
});
