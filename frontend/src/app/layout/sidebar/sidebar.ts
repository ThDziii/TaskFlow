import { Component } from '@angular/core';

type MenuIcon = 'dashboard' | 'statistics' | 'calendar' | 'notifications';

type MenuItem = {
  icon: MenuIcon;
  label: string;
  active?: boolean;
  badge?: number;
};

type ProjectItem = {
  name: string;
  color: string;
  count: number;
};

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  readonly menuItems: MenuItem[] = [
    { icon: 'dashboard', label: 'Dashboard', active: true },
    { icon: 'statistics', label: 'Statistics' },
    { icon: 'calendar', label: 'Calendar', badge: 3 },
    { icon: 'notifications', label: 'Notifications', badge: 5 },
  ];

  readonly projects: ProjectItem[] = [
    { name: 'Website Redesign', color: 'var(--active-state)', count: 8 },
    { name: 'Mobile App', color: '#3B82F6', count: 12 },
    { name: 'Marketing', color: '#10B981', count: 5 },
    { name: 'Research', color: '#F59E0B', count: 3 },
  ];
}
