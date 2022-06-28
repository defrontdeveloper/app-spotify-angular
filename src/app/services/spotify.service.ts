import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SpotifyService {

  constructor(
    private http: HttpClient
  ) { 
    console.log("servicio listo!");
  }

  //Centralizar las peticiones
  getQuery(query:string, keyValue?:string) {
    const url = `https://api.spotify.com/v1/${query}`;
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('keyAPI')}`
    });

    return this.http.get(url, {headers});

  }

  getNewReleases() {
    // https://accounts.spotify.com/api/token

    // this.http.get('https://api.spotify.com/v1/browse/new-releases?limit=20', {headers})
    // .subscribe(data => {
    //   console.log(data);
    // })

    return this.getQuery('browse/new-releases?limit=20')
      .pipe(map((data:any) => {
        return data["albums"].items;
      }))
  }

  getArtistas(termino:string) {
    return this.getQuery(`search?q=${termino}&type=album&include_external=audio`)
      .pipe(map ((data:any) => data['albums'].items));
  }

  getArtista(id:string) {
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id:string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
      .pipe(map ((data:any) => data['tracks']));
  }

  setPasteKey(val: string) {
    localStorage.setItem('keyAPI', val);
  }
}