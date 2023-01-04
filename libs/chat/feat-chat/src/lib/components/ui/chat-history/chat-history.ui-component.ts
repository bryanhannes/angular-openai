import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMessage } from '@angular-image-generation/chat/type-chat';

@Component({
  selector: 'app-chat-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-history.ui-component.html',
  styleUrls: ['./chat-history.ui-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatHistoryUiComponent {
  @Input() public chatMessages: ChatMessage[] = [];
}
