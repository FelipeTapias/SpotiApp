import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: [
  ]
})
export class ArtistaComponent implements OnInit, OnDestroy {

  actiRouteSubscription: Subscription;
  artista: any = {};
  topTracks: Array<{}>;
  loading: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private spotify: SpotifyService) {

  this.loading = true;

  }

  ngOnInit(): void {
    // Es utilizado cuando no necesito escuchar si cambio el parametro de la URL
    // this.idData = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(this.idData);


    //Utilizado cuando necesito observar algun cambio en los parametros de la URL.
    //Devuelve un object
    this.actiRouteSubscription = this.activatedRoute.params.subscribe(params => {
      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
      console.log(params['id']);
    });
  }

  getArtista(id: string) {
    this.spotify.getArtista(id).subscribe(artista => {
      this.artista = artista;
      this.loading = false;
    });
  }

  getTopTracks(id: string){
    this.spotify.getTopTracks(id).subscribe(topTracks => {
        this.topTracks = topTracks;
        console.log(this.topTracks);
    });
  }

  ngOnDestroy() {
    this.actiRouteSubscription.unsubscribe();
  }

}
