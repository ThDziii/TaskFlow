import { Component, output } from '@angular/core';

@Component({
  selector: 'app-filterbutton',
  standalone: true,
  imports: [],
  templateUrl: './filterbutton.html',
  styleUrl: './filterbutton.scss',
})
export class FilterButton {
  readonly clicked = output<MouseEvent>();

  onClick(event: MouseEvent): void {
    this.clicked.emit(event);
  }
}
