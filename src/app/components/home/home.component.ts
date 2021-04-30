import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
    .badge-primary {
      margin-bottom: 5px;
    }
    `
  ]
})
export class HomeComponent {

  nuevasCanciones: any[] = [];

  constructor( private spotify: SpotifyService ) {
    this.spotify.getNewReleases()
        .subscribe( (data: any) => {
          console.log(data);
          this.nuevasCanciones = data;
        });
  }


}
