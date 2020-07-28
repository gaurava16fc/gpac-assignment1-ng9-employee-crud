import { TestBed } from '@angular/core/testing';

import { AuthAdminRoleGuard } from './auth-admin-role.guard';

describe('AuthAdminRoleGuard', () => {
  let guard: AuthAdminRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthAdminRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
