import { TestBed } from '@angular/core/testing';

import { ToastyNotificationsService } from './toasty-notifications.service';

describe('ToastyNotificationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToastyNotificationsService = TestBed.get(ToastyNotificationsService);
    expect(service).toBeTruthy();
  });
});
