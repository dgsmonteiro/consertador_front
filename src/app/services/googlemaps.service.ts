import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  constructor(private http: HttpClient) {

   }
   pesquisar(texto) {
    return this.http.get<any>(`${environment.googleMapsUrl}/json?address=${texto}&key=AIzaSyDfPbNnfE5ktwmYBMuI_S7jH04khiAQomM`)
        .pipe(map(resposta => {
          return resposta;
        }));
  }
}
