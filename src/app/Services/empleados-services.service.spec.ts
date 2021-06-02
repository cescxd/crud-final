import { TestBed } from '@angular/core/testing';

import { EmpleadosServicesService } from './empleados-services.service';

describe('EmpleadosServicesService', () => {
  let service: EmpleadosServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpleadosServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
