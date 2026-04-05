import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './layout/sidebar/sidebar';
import { FilterButton } from './shared/filterbutton/filterbutton';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, FilterButton],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}
