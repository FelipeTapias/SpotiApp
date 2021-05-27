import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnDestroy {

  private buscarSubscrition: Subscription;
  artistas: any[] = [];
  search: boolean;
  loading: boolean;

  constructor(private spotify: SpotifyService) {
    this.search = true;
  }

  buscar(termino: string) {
    this.loading = true;
    this.buscarSubscrition =  this.spotify.getArtistas(termino)
        .subscribe( (data: any) => {
          this.artistas = data;
          this.search = false;
          this.loading = false;
        });
  }

  ngOnDestroy() {
    if(this.buscarSubscrition) {
      this.buscarSubscrition.unsubscribe();
    }
  }

}
