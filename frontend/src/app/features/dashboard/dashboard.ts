import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Header } from '../../layout/header/header';
import { TaskCard, TaskCardPriority } from './components/task-card/task-card';

export type DashboardTask = {
  priority: TaskCardPriority;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
};

export type KanbanColumnId = 'todo' | 'in-progress' | 'done';

export type KanbanColumn = {
  id: KanbanColumnId;
  title: string;
  dot: 'pink' | 'green';
  tasks: DashboardTask[];
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Header, TaskCard, DragDropModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  protected isFilterActive = false;
  protected isSortActive = false;

  protected columns: KanbanColumn[] = [
    {
      id: 'todo',
      title: 'To Do',
      dot: 'pink',
      tasks: [
        {
          priority: 'high',
          title: 'Design new onboarding flow for mobile app',
          description:
            'Create wireframes and high-fidelity mockups for the new user onboarding experience.',
          tags: ['Design', 'UX'],
          dueDate: 'Apr 5, 2026',
        },
        {
          priority: 'medium',
          title: 'Review Q1 marketing report',
          description:
            'Summarize key metrics, compare to targets, and flag anomalies for the leadership sync.',
          tags: ['Marketing', 'Analytics'],
          dueDate: 'Apr 8, 2026',
        },
        {
          priority: 'low',
          title: 'Update team documentation',
          description:
            'Refresh the wiki with current processes, owners, and links to latest design files.',
          tags: ['Documentation'],
          dueDate: 'Apr 12, 2026',
        },
        {
          priority: 'medium',
          title: 'Schedule stakeholder interviews',
          description:
            'Book 45-minute slots with product, design, and engineering leads for discovery.',
          tags: ['Research', 'Planning'],
          dueDate: 'Apr 15, 2026',
        },
      ],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      dot: 'pink',
      tasks: [
        {
          priority: 'high',
          title: 'Implement user authentication system',
          description:
            'OAuth2 login, session handling, and protected routes aligned with security review.',
          tags: ['Development', 'Security'],
          dueDate: 'Apr 6, 2026',
        },
        {
          priority: 'medium',
          title: 'Create brand style guide',
          description:
            'Document typography, color tokens, and component usage for marketing and product.',
          tags: ['Design', 'Brand'],
          dueDate: 'Apr 10, 2026',
        },
        {
          priority: 'low',
          title: 'Set up CI/CD pipeline',
          description:
            'GitHub Actions for lint, test, and deploy to staging with approval gates.',
          tags: ['Development', 'DevOps'],
          dueDate: 'Apr 18, 2026',
        },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      dot: 'green',
      tasks: [
        {
          priority: 'medium',
          title: 'Complete user research interviews',
          description:
            'Synthesize findings into themes and opportunity areas for the roadmap workshop.',
          tags: ['Research', 'UX'],
          dueDate: 'Mar 28, 2026',
        },
        {
          priority: 'low',
          title: 'Set up project repository',
          description:
            'Initialize repo structure, branch rules, and README for contributors.',
          tags: ['Development'],
          dueDate: 'Mar 20, 2026',
        },
        {
          priority: 'high',
          title: 'Finalize project timeline',
          description:
            'Lock milestones and dependencies with owners for Q2 delivery.',
          tags: ['Planning'],
          dueDate: 'Mar 25, 2026',
        },
      ],
    },
  ];

  /** Tổng số task (header + sau khi kéo thả). */
  protected get totalTaskCount(): number {
    return this.columns.reduce((n, c) => n + c.tasks.length, 0);
  }

  /** Số task trong cột In Progress. */
  protected get inProgressTaskCount(): number {
    return this.columns.find((c) => c.id === 'in-progress')?.tasks.length ?? 0;
  }

  protected onTaskDrop(event: CdkDragDrop<DashboardTask[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
