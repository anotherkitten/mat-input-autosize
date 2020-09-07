import { TestBed } from '@angular/core/testing';

import { MatInputAutosizeService } from './mat-input-autosize.service';

describe('MatInputAutosizeService', () => {
  let service: MatInputAutosizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatInputAutosizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
