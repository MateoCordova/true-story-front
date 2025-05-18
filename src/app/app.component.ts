import { Component } from '@angular/core';
import { MiniKit } from '@worldcoin/minikit-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'true-story';
  constructor() {
    if (!MiniKit.isInstalled()) {
      MiniKit.install("app_160be036f2c85ab313ad497cb5e4e79d")
    }
  }
}
