import { TestBed } from '@angular/core/testing';

import { NearbyPostService } from './nearby-post.service';

describe('NearbyPostService', () => {
  let service: NearbyPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NearbyPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
