import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Input() title = '';
  @Input() subtitle = '';

  /** Right side of the top row. Project with `appHeaderToolbar` on the host element. */
  @Input() showToolbarSlot = true;

  @Input() showFilterSort = true;

  @Input() taskTotal: number | null = null;
  @Input() taskInProgress: number | null = null;

  @Input() filterActive = false;
  @Input() sortActive = false;

  @Output() filterActiveChange = new EventEmitter<boolean>();
  @Output() sortActiveChange = new EventEmitter<boolean>();

  protected get showBottomRow(): boolean {
    return (
      this.showFilterSort ||
      (this.taskTotal != null && this.taskTotal >= 0)
    );
  }

  protected onFilterClick(): void {
    this.filterActiveChange.emit(!this.filterActive);
  }

  protected onSortClick(): void {
    this.sortActiveChange.emit(!this.sortActive);
  }
}
