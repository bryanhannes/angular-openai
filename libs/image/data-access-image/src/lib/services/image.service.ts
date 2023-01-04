import { inject, Injectable } from '@angular/core';
import {
  ImagePrompt,
  ImageResponse,
} from '@angular-image-generation/image/type-image';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private readonly httpClient = inject(HttpClient);

  public getImage(imagePrompt: ImagePrompt): Observable<ImageResponse> {
    if (imagePrompt.prompt) {
      return this.httpClient.get<ImageResponse>(
        `http://localhost:3333/api/image?prompt=${imagePrompt.prompt}&n=${imagePrompt.n}`,
      );
    }

    return of({
      data: [],
    });
  }
}
