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
  jwt: string = ""
  wallet = JSON.stringify(MiniKit.user)
  constructor(private storageService: LocalStorageService, private router: Router) {

  }
  ngOnInit(): void {
    if (!this.storageService.getItem("jwt")) {
      this.router.navigate(["/validate"])
    } else {
      this.jwt = this.storageService.getItem("jwt")!
      sessionStorage.setItem('walletAddress', MiniKit.user.walletAddress || "");
      // this.jwt = JSON.stringify(MiniKit.user)
      this.storageService.clear()
    }
  }

}
