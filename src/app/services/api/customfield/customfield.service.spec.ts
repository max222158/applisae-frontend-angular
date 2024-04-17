import { TestBed } from '@angular/core/testing';

import { CustomfieldService } from './customfield.service';

describe('CustomfieldService', () => {
  let service: CustomfieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomfieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
