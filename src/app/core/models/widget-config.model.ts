import { Type, Signal } from '@angular/core';
import { Observable } from 'rxjs';

export type WidgetInput<T> = T | Observable<T> | Signal<T>;

export interface WidgetConfig<C = any> {
  component: Type<C>;
  inputs?: {
    [K in keyof Partial<C>]: WidgetInput<C[K]>;
  };
  outputs?: {
    [K in keyof Partial<C>]: (event: any) => void;
  };
}
