import { TestBed, inject } from '@angular/core/testing';

import { LeaguesService } from './leagues.service';

describe('LeaguesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeaguesService]
    });
  });

  it('should be created', inject([LeaguesService], (service: LeaguesService) => {
    expect(service).toBeTruthy();
  }));
});
