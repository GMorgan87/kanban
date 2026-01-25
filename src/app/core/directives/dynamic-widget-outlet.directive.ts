import {
  ComponentRef,
  Directive,
  EmbeddedViewRef,
  Input,
  OnDestroy,
  TemplateRef,
  Type,
  ViewContainerRef,
  inject,
  isSignal,
  effect,
  EffectRef,
} from '@angular/core';
import { WidgetConfig } from '../models/widget-config.model';
import { Observable, isObservable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appDynamicWidgetOutlet]',
})
export class DynamicWidgetOutletDirective implements OnDestroy {
  private readonly vcr = inject(ViewContainerRef);
  private readonly templateRef = inject(TemplateRef);
  private readonly destroy$ = new Subject<void>();

  private componentRefs: ComponentRef<any>[] = [];
  private effectRefs: EffectRef[] = [];

  @Input('appDynamicWidgetOutlet') set configs(
    value: WidgetConfig | WidgetConfig[] | null | undefined
  ) {
    this.clear();
    if (!value) return;

    const configArray = Array.isArray(value) ? value : [value];
    configArray.forEach((config) => this.renderComponent(config));
  }

  private renderComponent(config: WidgetConfig): void {
    const componentRef = this.vcr.createComponent(config.component);
    this.componentRefs.push(componentRef);

    this.updateInputs(componentRef, config.inputs);
    this.connectOutputs(componentRef, config.outputs);

    componentRef.changeDetectorRef.detectChanges();
  }

  private updateInputs(
    componentRef: ComponentRef<any>,
    inputs?: WidgetConfig['inputs']
  ): void {
    if (!inputs) return;

    Object.entries(inputs).forEach(([key, value]) => {
      if (isSignal(value)) {
        const ref = effect(() => {
          componentRef.setInput(key, value());
        });
        this.effectRefs.push(ref);
      } else if (isObservable(value)) {
        (value as Observable<any>)
          .pipe(takeUntil(this.destroy$))
          .subscribe((val) => {
            componentRef.setInput(key, val);
          });
      } else {
        componentRef.setInput(key, value);
      }
    });
  }

  private connectOutputs(
    componentRef: ComponentRef<any>,
    outputs?: WidgetConfig['outputs']
  ): void {
    if (!outputs) return;

    Object.entries(outputs).forEach(([key, handler]) => {
      const output = componentRef.instance[key];
      if (output && typeof output.subscribe === 'function') {
        output.pipe(takeUntil(this.destroy$)).subscribe(handler);
      }
    });
  }

  private clear(): void {
    this.vcr.clear();
    this.componentRefs.forEach((ref) => ref.destroy());
    this.componentRefs = [];
    this.effectRefs.forEach((ref) => ref.destroy());
    this.effectRefs = [];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.clear();
  }
}
