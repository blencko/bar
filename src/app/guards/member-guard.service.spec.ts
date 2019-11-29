import { TestBed } from '@angular/core/testing';

import { MemberGuardService } from './member-guard.service';

describe('MemberGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemberGuardService = TestBed.get(MemberGuardService);
    expect(service).toBeTruthy();
  });
});
