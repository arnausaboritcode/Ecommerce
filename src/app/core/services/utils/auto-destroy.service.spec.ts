import { TestBed } from '@angular/core/testing';

import { AutoDestroyService } from './auto-destroy.service';

describe('AutoDestroyService', () => {
  let service: AutoDestroyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoDestroyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
