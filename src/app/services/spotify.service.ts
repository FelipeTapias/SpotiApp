import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log('Spotify services ready!');
   }

   getQuery( query: string ) {

    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQDYNn4y2DDuOyOh1QoAAvMrIGBVeL15YXQRL2BGl_3WVHl_e6FrpMY3jE-NZFGfoUZU_LriggT2PO-rZ4E'
    });

    return this.http.get(url, { headers })

   }

  getNewReleases(){

    // const headers = new HttpHeaders({
    //   'Authorization': 'BQDYNn4y2DDuOyOh1QoAAvMrIGBVeL15YXQRL2BGl_3WVHl_e6FrpMY3jE-NZFGfoUZU_LriggT2PO-rZ4E'
    // });

    return this.getQuery('browse/new-releases?limit=20')
                .pipe( map( data => data['albums'].items));

    // this.http.get('https://api.spotify.com/v1/browse/new-releases?limit=20', { headers })
    // .pipe( map( data => {
    //               return data['albums'].items;
    //             }));
  }

  gerArtista( termino: string ) {

    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
                .pipe( map( data => data['artists'].items));
  }
}
