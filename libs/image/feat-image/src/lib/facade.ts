import { inject, Injectable } from '@angular/core';
import { ImageService } from '@angular-image-generation/image/data-access-image';
import { Observable } from 'rxjs';
import {
  ImagePrompt,
  ImageResponse,
} from '@angular-image-generation/image/type-image';

@Injectable({
  providedIn: 'root',
})
export class Facade {
  private readonly chatService = inject(ImageService);

  public getImage(imagePrompt: ImagePrompt): Observable<ImageResponse> {
    return this.chatService.getImage(imagePrompt);
  }
}
