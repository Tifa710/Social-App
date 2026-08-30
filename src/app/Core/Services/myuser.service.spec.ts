import { TestBed } from '@angular/core/testing';

import { MyuserService } from './myuser.service';

describe('MyuserService', () => {
  let service: MyuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
