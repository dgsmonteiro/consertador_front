import { TestBed, inject } from '@angular/core/testing';

import { GoogleMapsService } from './googlemaps.service';

describe('GoogleMapsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleMapsService]
    });
  });

  it('should be created', inject([GoogleMapsService], (service: GoogleMapsService) => {
    expect(service).toBeTruthy();
  }));
});
