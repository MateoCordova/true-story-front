import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../storage/local-storage.service';
import { Router } from '@angular/router';
import { MiniKit, verifySiweMessage } from '@worldcoin/minikit-js';

@Component({
  selector: 'app-main-view',
  standalone: false,
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css'
})
export class MainViewComponent implements OnInit {
  screen: string = "main"
  constructor(private storageService: LocalStorageService, private router: Router) {

  }
  ngOnInit(): void {
    // this.storageService.clear()
    if (!this.storageService.getItem("jwt")) {
      this.router.navigate(["/validate"])
    }
  }

  selectScreen(flag: string) {
    this.screen = flag
  }

}
