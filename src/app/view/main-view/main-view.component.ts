import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../storage/local-storage.service';
import { Router } from '@angular/router';
import { LoadMapsService } from '../../services/load-maps.service';
import { TokenService } from '../../services/token.service';
import { User } from '@worldcoin/minikit-js';

@Component({
  selector: 'app-main-view',
  standalone: false,
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css'
})
export class MainViewComponent implements OnInit {
  screen: string = "loading"
  showMenu: boolean = false
  user!: User
  constructor(private mapsLoader: LoadMapsService, private storageService: LocalStorageService, private router: Router) {

  }
  ngOnInit(): void {
    // this.storageService.clear()
    if (!this.storageService.getItem("jwt")) {
      this.router.navigate(["/validate"])
    }
    if (TokenService.isTokenExpired(this.storageService.getItem("jwt")!.replace("Bearer ", ""))) {
      this.router.navigate(["/login"])
    }
    this.mapsLoader.loadGoogleMaps().then(() => {
      this.screen = "main"
      this.user = JSON.parse(sessionStorage.getItem("user")!)
    }).catch(() => {
    });

  }

  selectScreen(flag: string) {
    this.screen = flag
  }

  changeShowMenu() {
    this.showMenu = true
  }
  closeShowMenu() {
    this.showMenu = false
  }

}
