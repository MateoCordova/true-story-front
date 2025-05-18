import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: false,
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Output() clickEvent = new EventEmitter();
  @Input() buttonLabel: string = "Button"
  @Input() size: "small" | "normal" | "large" = "normal"
  @Input() enableButton: boolean = true
  @Input() customeStyle !: object

  onClick() {
    this.clickEvent.emit();
  }

}
