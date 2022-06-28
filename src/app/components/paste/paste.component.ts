import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-paste',
  templateUrl: './paste.component.html'
})
export class PasteComponent implements OnInit {

  constructor(
    private spotify: SpotifyService
  ) 
  { }

  sendKey(value: string) {
    if(value != '') {
      this.spotify.setPasteKey(value);
    }
  }

  ngOnInit(): void {
  }

}
