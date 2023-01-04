import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderUiComponent } from '../../../../../../../ui-library/feat-header/src/lib/components/header/header.ui-component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderUiComponent],
  templateUrl: './shell.smart-component.html',
  styleUrls: ['./shell.smart-component.scss'],
})
export class ShellSmartComponent {}
