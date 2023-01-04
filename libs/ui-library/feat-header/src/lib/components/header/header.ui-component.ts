import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.ui-component.html',
  styleUrls: ['./header.ui-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderUiComponent {
  public open: boolean = false;
}
