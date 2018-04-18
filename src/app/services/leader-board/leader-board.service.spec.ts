import { TestBed, inject } from '@angular/core/testing';

import { LeaderBoardService } from './leader-board.service';

describe('LeaderBoardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeaderBoardService]
    });
  });

  it('should be created', inject([LeaderBoardService], (service: LeaderBoardService) => {
    expect(service).toBeTruthy();
  }));
});
