import { inject, Injectable } from '@angular/core';
import { ModerationService } from '@angular-image-generation/moderation/data-access-moderation';
import { Observable } from 'rxjs';
import { Moderation } from '@angular-image-generation/moderation/type-moderation';

@Injectable({
  providedIn: 'root',
})
export class Facade {
  private readonly moderationService = inject(ModerationService);

  public getModeration(input: string): Observable<Moderation> {
    return this.moderationService.getModeration(input);
  }
}
