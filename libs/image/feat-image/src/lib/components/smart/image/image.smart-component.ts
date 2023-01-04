import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { Facade } from '../../../facade';
import { loadAndCatch } from '@angular-image-generation/ui-library/util-loading';
import { createVm } from '@angular-image-generation/ui-library/util-vm';
import { Image } from '@angular-image-generation/image/type-image';

type PageViewModel = {
  loading: boolean;
  images: Image[];
  error: string | null;
};
@Component({
  selector: 'app-image',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './image.smart-component.html',
  styleUrls: ['./image.smart-component.scss'],
})
export class ImageSmartComponent {
  private readonly facade = inject(Facade);

  public readonly form = new FormGroup({
    prompt: new FormControl<string | null>(null, [Validators.required]),
  });

  // Source
  private readonly loading$$ = new BehaviorSubject(false);
  private readonly error$$ = new BehaviorSubject<string | null>(null);
  private readonly prompt$$ = new BehaviorSubject('');
  private readonly prompt$ = this.prompt$$.asObservable();

  // Intermediate
  public readonly results$ = this.prompt$.pipe(
    switchMap((prompt) =>
      loadAndCatch(
        this.facade.getImage({ prompt, n: 2 }),
        this.loading$$,
        this.error$$,
      ),
    ),
  );
  private readonly images$ = this.results$.pipe(
    map((response) => (response ? response.data : [])),
  );
  private readonly loading$ = this.loading$$.asObservable();
  private readonly error$ = this.error$$.asObservable();

  // Presentation
  public vm$ = createVm<PageViewModel>({
    loading: [this.loading$, false],
    images: [this.images$, []],
    error: [this.error$, null],
  });

  public submit(): void {
    if (this.form.value.prompt) {
      this.prompt$$.next(this.form.value.prompt);
    }
  }
}
