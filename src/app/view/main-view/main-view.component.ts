import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../storage/local-storage.service';
import { Router } from '@angular/router';
import { LoadMapsService } from '../../services/load-maps.service';

@Component({
  selector: 'app-main-view',
  standalone: false,
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css'
})
export class MainViewComponent implements OnInit {
  screen: string = "loading"
  constructor(private mapsLoader: LoadMapsService, private storageService: LocalStorageService, private router: Router) {

  }
  ngOnInit(): void {
    // this.storageService.clear()
    if (!this.storageService.getItem("jwt")) {
      this.router.navigate(["/validate"])
    }
    this.mapsLoader.loadGoogleMaps().then(() => {
      console.log("ok")
      this.screen = "main"
    }).catch(err => {
      console.error('Failed to load Google Maps', err);
    });

  }

  selectScreen(flag: string) {
    this.screen = flag
  }

}
