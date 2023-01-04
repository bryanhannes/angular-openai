import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Facade } from '../../../facade';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, of, switchMap } from 'rxjs';
import { loadAndCatch } from '@angular-image-generation/ui-library/util-loading';
import { createVm } from '@angular-image-generation/ui-library/util-vm';
import { ChatMessage } from '@angular-image-generation/chat/type-chat';
import { SpinnerUiComponent } from '@angular-image-generation/ui-library/feat-spinner';
import { ChatHistoryUiComponent } from '../../ui/chat-history/chat-history.ui-component';

type PageViewModel = {
  loading: boolean;
  error: string | null;
  chatMessages: ChatMessage[];
};
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerUiComponent,
    ChatHistoryUiComponent,
  ],
  templateUrl: './chat.smart-component.html',
  styleUrls: ['./chat.smart-component.scss'],
})
export class ChatSmartComponent {
  private readonly facade = inject(Facade);

  public readonly form = new FormGroup({
    message: new FormControl<string | null>(null, [Validators.required]),
  });

  // Source
  private loading$$ = new BehaviorSubject(false);
  private error$$ = new BehaviorSubject<string | null>(null);
  private prompt$$ = new BehaviorSubject('');
  private prompt$ = this.prompt$$.asObservable();
  private chatMessages$$ = new BehaviorSubject<ChatMessage[]>([]);

  // Intermediate
  private results$ = this.prompt$.pipe(
    switchMap((message) => {
      if (!message) {
        return of(null);
      }
      return loadAndCatch(
        this.facade.getAnswer(message),
        this.loading$$,
        this.error$$,
      );
    }),
  );
  private loading$ = this.loading$$.asObservable();
  private error$ = this.error$$.asObservable();
  private chatMessages$ = this.results$.pipe(
    switchMap((chatMessage) => {
      if (!chatMessage) {
        return of([]);
      }
      this.chatMessages$$.next([...this.chatMessages$$.value, chatMessage]);
      return this.chatMessages$$.asObservable();
    }),
  );

  public vm$ = createVm<PageViewModel>({
    loading: [this.loading$, false],
    error: [this.error$, null],
    chatMessages: [this.chatMessages$, []],
  });

  public submit(): void {
    if (this.form.value.message) {
      this.prompt$$.next(this.form.value.message);
      this.form.reset();
    }
  }
}
