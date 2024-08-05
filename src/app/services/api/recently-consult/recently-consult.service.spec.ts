import { TestBed } from '@angular/core/testing';

import { RecentlyConsultService } from './recently-consult.service';

describe('RecentlyConsultService', () => {
  let service: RecentlyConsultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecentlyConsultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
