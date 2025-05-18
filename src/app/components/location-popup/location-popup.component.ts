import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-location-popup',
  standalone: false,
  templateUrl: './location-popup.component.html',
  styleUrl: './location-popup.component.css'
})
export class LocationPopupComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() imageUrl: string = '';
  @Output() buyOpen = new EventEmitter();
  @Input() post: {
    id: string,
    position: { lat: number, lng: number },
    title: string,
    infoText: string,
    photoUrl: string,
    infoOpen: boolean
  } = {
      id: "",
      position: { lat: 0, lng: 0 },
      title: "",
      infoText: "",
      photoUrl: "",
      infoOpen: false

    }

  @Output() close = new EventEmitter<void>();
  onOpenBuy() {
    this.buyOpen.emit();
  }
  onClose() {
    this.close.emit();
  }
}
