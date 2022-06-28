import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent implements OnInit {

  artista:any = {};
  topTracks:any[] = []
  loading:boolean = true;

  constructor(
    private router:ActivatedRoute,
    private spotify:SpotifyService
  ) {
    this.router.params.subscribe(params => {
      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
    })
  }

  getArtista(id:string) {
    this.spotify.getArtista(id)
      .subscribe(artista => {
        this.artista = artista
        this.loading = false
      }) 
  }

  getTopTracks(id:string) {
    this.spotify.getTopTracks(id)
      .subscribe(topTracks => {
        this.topTracks = topTracks;
      })
  }

  ngOnInit(): void {
  }

}
