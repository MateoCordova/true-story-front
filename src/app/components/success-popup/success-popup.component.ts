import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-success-popup',
  standalone: false,
  templateUrl: './success-popup.component.html',
  styleUrl: './success-popup.component.css'
})
export class SuccessPopupComponent {
  @Input() title: string = "";
  @Input() subtitle: string = "";


}
