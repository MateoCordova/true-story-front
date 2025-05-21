import { Component, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-filter-checkbox',
  standalone: false,
  templateUrl: './filter-checkbox.component.html',
  styleUrl: './filter-checkbox.component.css'
})
export class FilterCheckboxComponent {
  @Output() filterEvent = new EventEmitter()
  @Output() closeEvent = new EventEmitter()
  options = [
    { label: 'Académico', value: 'academico', checked: false },
    { label: 'Social', value: 'social', checked: false },
    { label: 'Cultural', value: 'cultural', checked: false },
    { label: 'Movilidad', value: 'movilidad', checked: false },
    { label: 'Seguridad', value: 'seguridad', checked: false },
    { label: 'Tecnología', value: 'tecnologia', checked: false },


  ];

  constructor(private el: ElementRef) { }
  toggleOption(index: number): void {
    this.options[index].checked = !this.options[index].checked;
    this.filterEvent.emit(this.options.filter(o => o.checked).map(o => o.label.toLowerCase()));
  }
}
