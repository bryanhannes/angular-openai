import { inject, Injectable } from '@angular/core';
import { ChatService } from '@angular-image-generation/chat/data-access-chat';
import { ChatMessage } from '@angular-image-generation/chat/type-chat';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Facade {
  private readonly chatService = inject(ChatService);

  public getAnswer(message: string): Observable<ChatMessage> {
    return this.chatService.getAnswer(message);
  }
}
