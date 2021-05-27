import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`.badge-primary { margin-bottom: 5px; }`]
})

export class HomeComponent implements OnInit, OnDestroy {

  private newReleasesSubscription: Subscription;
  nuevasCanciones: any[] = [];
  loading: boolean;

  constructor( private spotify: SpotifyService ) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.newReleasesSubscription =  this.spotify.getNewReleases()
        .subscribe( (data: any) => {
          this.nuevasCanciones = data;
          const totalNuevas = this.nuevasCanciones.length;
          this.loading = false;
        });
  }

  ngOnDestroy() {
    this.newReleasesSubscription.unsubscribe();
  }


}
