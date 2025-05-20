import { TestBed } from '@angular/core/testing';

import { LoadMapsService } from './load-maps.service';

describe('LoadMapsService', () => {
  let service: LoadMapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadMapsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
