import { TestBed } from '@angular/core/testing';

import { Cursos2Service } from './cursos-2.service';

describe('Cursos2Service', () => {
  let service: Cursos2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cursos2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
