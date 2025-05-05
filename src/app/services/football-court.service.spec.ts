import { TestBed } from '@angular/core/testing';

import { FootballCourtService } from './football-court.service';

describe('FootballCourtService', () => {
  let service: FootballCourtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FootballCourtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
