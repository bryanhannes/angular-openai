import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatMessage } from '@angular-image-generation/chat/type-chat';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private httpClient = inject(HttpClient);

  public getAnswer(message: string): Observable<ChatMessage> {
    return this.httpClient.get<ChatMessage>(
      `http://localhost:3333/api/chat?message=${message}`,
    );
  }
}
