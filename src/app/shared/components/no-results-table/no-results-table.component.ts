import {Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-no-results-table',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './no-results-table.component.html',
  styleUrls: ['./no-results-table.component.scss']
})
export class NoResultsTableComponent {
}
