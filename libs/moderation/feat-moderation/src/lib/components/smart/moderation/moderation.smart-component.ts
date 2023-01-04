import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, switchMap } from 'rxjs';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Facade } from '../../../facade';
import { loadAndCatch } from '@angular-image-generation/ui-library/util-loading';
import { createVm } from '@angular-image-generation/ui-library/util-vm';
import { Moderation } from '@angular-image-generation/moderation/type-moderation';

type PageViewModel = {
  loading: boolean;
  results: Moderation | null;
  error: string | null;
};
@Component({
  selector: 'app-moderation',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './moderation.smart-component.html',
  styleUrls: ['./moderation.smart-component.scss'],
})
export class ModerationSmartComponent {
  private readonly facade = inject(Facade);

  public readonly form = new FormGroup({
    prompt: new FormControl<string | null>(null, [Validators.required]),
  });

  // Source
  private loading$$ = new BehaviorSubject(false);
  private error$$ = new BehaviorSubject<string | null>(null);
  private prompt$$ = new BehaviorSubject('');
  private prompt$ = this.prompt$$.asObservable();

  // Intermediate
  private results$ = this.prompt$.pipe(
    switchMap((prompt) =>
      loadAndCatch(
        this.facade.getModeration(prompt),
        this.loading$$,
        this.error$$,
      ),
    ),
  );
  private loading$ = this.loading$$.asObservable();
  private error$ = this.error$$.asObservable();

  // Presentation
  public vm$ = createVm<PageViewModel>({
    loading: [this.loading$, false],
    results: [this.results$, null],
    error: [this.error$, null],
  });

  public submit(): void {
    if (this.form.value.prompt) {
      this.prompt$$.next(this.form.value.prompt);
    }
  }
}
