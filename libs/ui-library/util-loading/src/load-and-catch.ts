import { catchError, finalize, Observable, of, Subject } from 'rxjs';

export const loadAndCatch = <T>(
  observable$: Observable<T>,
  subject$$: Subject<boolean>,
  error$$: Subject<string | null>,
): Observable<T | null> => {
  subject$$.next(true);
  return observable$.pipe(
    catchError((error) => {
      if (error?.error?.error) {
        error$$.next(error.error.error);
      }
      return of(null);
    }),
    finalize(() => subject$$.next(false)),
  );
};
