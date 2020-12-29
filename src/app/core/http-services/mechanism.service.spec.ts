import { TestBed } from '@angular/core/testing';

import { MechanismService } from './mechanism.service';

describe('MechanismService', () => {
  let service: MechanismService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MechanismService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
