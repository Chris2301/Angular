import { TestBed } from '@angular/core/testing';

import { BackendServiceWithTestsService } from './backend-service-with-tests.service';
import {provideHttpClient} from "@angular/common/http";
import {HttpTestingController, provideHttpClientTesting} from "@angular/common/http/testing";

describe('BackendServiceWithTestsService', () => {
  let service: BackendServiceWithTestsService;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ provideHttpClient(), provideHttpClientTesting()]
    });
    httpMock = TestBed.inject(HttpTestingController)
    service = TestBed.inject(BackendServiceWithTestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return Person name', (done) => {
    const id = 1
    const name: string = 'Henk'

    service.getPersonName(id).subscribe(name => {
      expect(name).toBe(name);
      done()
    });

    const req = httpMock.expectOne(`${service['BASE_URL']}/rest/v1/person-name/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(name);
  })

  it('should return Person name and use cache second time', (done) => {
    const id = 1
    const name: string = 'Henk'

    service.getPersonName(id).subscribe(name => {
      expect(name).toBe(name);

      // Use Cache
      service.getPersonName(id).subscribe(cachedName => {
        expect(cachedName).toBe(name);
        done();
      });

    });

    // Verify cache
    const req = httpMock.expectOne(`${service['BASE_URL']}/rest/v1/person-name/${id}`);
    req.flush(name);
  })


  it('should return person name from cache if available', (done) => {
    const id = 1;
    const name: string = 'Henk';

    (service as any).responseCache.set(id, name);
    service.getPersonName(id).subscribe(name => {
      expect(name).toBe(name);
      done();
    });

    // Verify that no HTTP request was made
    httpMock.expectNone(`${service['BASE_URL']}/rest/v1/person-name/${id}`);
  });
});
