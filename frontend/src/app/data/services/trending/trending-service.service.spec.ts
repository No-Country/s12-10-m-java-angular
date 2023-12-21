import { TestBed } from '@angular/core/testing';

import { TrendingServiceService } from './trending-service.service';

describe('TrendingServiceService', () => {
  let service: TrendingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrendingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
