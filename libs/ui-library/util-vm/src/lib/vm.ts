import {
  combineLatest,
  distinctUntilChanged,
  Observable,
  shareReplay,
  startWith,
} from 'rxjs';

type KeyOfObservableAndInitialVal<T> = {
  [Key in keyof T]: [Observable<T[Key]>, T[Key]];
};

export function createVm<T>(
  input: KeyOfObservableAndInitialVal<T>,
): Observable<T> {
  const combined: { [Key in keyof T]: Observable<T[Key]> } = {} as {
    [Key in keyof T]: Observable<T[Key]>;
  };
  (Object.keys(input) as (keyof T)[]).forEach((key: keyof T) => {
    combined[key] = input[key][0].pipe(
      startWith(input[key][1]),
      distinctUntilChanged(),
    );
  });

  return combineLatest(combined).pipe(
    shareReplay({ bufferSize: 1, refCount: true }),
  ) as Observable<T>;
}
