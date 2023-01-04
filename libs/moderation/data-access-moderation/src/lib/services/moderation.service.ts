import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Moderation } from '@angular-image-generation/moderation/type-moderation';

@Injectable({
  providedIn: 'root',
})
export class ModerationService {
  private readonly httpClient = inject(HttpClient);

  public getModeration(input: string): Observable<Moderation> {
    return this.httpClient.post<Moderation>(
      'http://localhost:3333/api/moderation',
      { text: input },
    );
  }
}
