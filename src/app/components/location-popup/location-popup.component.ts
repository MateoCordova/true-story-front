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

  @Output() close = new EventEmitter<void>();
  constructor() {
    console.log(this.imageUrl)
  }
  onOpenBuy() {
    this.buyOpen.emit();
  }
  onClose() {
    this.close.emit();
  }
}
