import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MiniKit } from '@worldcoin/minikit-js';

@Component({
  selector: 'app-splash',
  standalone: false,
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.css'

})
export class SplashComponent implements OnInit {
  constructor(private router: Router) {

  }
  ngOnInit(): void {

    setTimeout(() => {
      // if (MiniKit.isInstalled()) {
      this.router.navigate(["/main"])
      // }
    }, 2000)
  }



}
