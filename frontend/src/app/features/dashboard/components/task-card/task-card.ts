import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

export type TaskCardPriority = 'high' | 'medium' | 'low';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard {
  @Input() priority: TaskCardPriority = 'medium';
  @Input() title = '';
  @Input() description = '';
  @Input() tags: string[] = [];
  @Input() dueDate = '';

  @Output() editTask = new EventEmitter<void>();
  @Output() moveTask = new EventEmitter<void>();
  @Output() deleteTask = new EventEmitter<void>();

  @ViewChild('menuRoot', { read: ElementRef }) private menuRoot?: ElementRef<HTMLElement>;

  protected menuOpen = false;

  protected get priorityLabel(): string {
    switch (this.priority) {
      case 'high':
        return 'High';
      case 'low':
        return 'Low';
      default:
        return 'Medium';
    }
  }

  protected toggleMenu(event: Event): void {
    event.stopPropagation();
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (!this.menuOpen) {
      return;
    }
    const root = this.menuRoot?.nativeElement;
    if (root && !root.contains(event.target as Node)) {
      this.menuOpen = false;
    }
  }

  protected onEdit(): void {
    this.menuOpen = false;
    this.editTask.emit();
  }

  protected onMove(): void {
    this.menuOpen = false;
    this.moveTask.emit();
  }

  protected onDelete(): void {
    this.menuOpen = false;
    this.deleteTask.emit();
  }
}
