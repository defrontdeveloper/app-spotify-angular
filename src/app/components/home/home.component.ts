import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nuevasCanciones: any[] = [];
  loading: boolean = true;
  error: boolean;
  messageErr: string = '';

  constructor(
    private spotify: SpotifyService
  ) {
    this.loading = true;
    this.error = false;
    this.spotify.getNewReleases()
      .subscribe((data: any) => {
        // console.log(data.albums.items);
        this.nuevasCanciones = data;
        this.loading = false;
      }, (err) => {
        this.error = true;
        this.loading = false;
        this.messageErr = err.error.error.message;
      })
  }

  ngOnInit(): void {
  }

}
