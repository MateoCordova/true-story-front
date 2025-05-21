import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '@worldcoin/minikit-js';

@Component({
  selector: 'app-side-menu',
  standalone: false,
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent implements OnInit {
  @Input() user: User = {
    username: "N/A"
  }
  @Output() close = new EventEmitter();
  ngOnInit(): void {
    if (!this.user.profilePictureUrl) {
      this.user.profilePictureUrl = "../../../assets/avatar.png"
    }
  }
  logout() {
    console.log('Logging out...');
    // implement your logout logic
  }
  onClose() {
    this.close.emit()
  }
}
