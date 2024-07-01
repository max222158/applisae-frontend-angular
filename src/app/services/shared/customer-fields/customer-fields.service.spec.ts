import { TestBed } from '@angular/core/testing';

import { CustomerFieldsService } from './customer-fields.service';

describe('CustomerFieldsService', () => {
  let service: CustomerFieldsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerFieldsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
