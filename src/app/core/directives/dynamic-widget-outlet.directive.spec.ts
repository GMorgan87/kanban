import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, of } from 'rxjs';
import { DynamicWidgetOutletDirective } from './dynamic-widget-outlet.directive';
import { WidgetConfig } from '../models/widget-config.model';

@Component({
  selector: 'app-test-widget',
  template: `
    <div class="test-widget">
      <span class="title">{{ title }}</span>
      <button (click)="clicked.emit('data')">Click me</button>
    </div>
  `,
})
class TestWidgetComponent {
  @Input() title = '';
  @Output() clicked = new EventEmitter<string>();
}

@Component({
  template: `
    <ng-container [appDynamicWidgetOutlet]="configs"></ng-container>
  `,
  imports: [DynamicWidgetOutletDirective],
})
class TestHostComponent {
  configs: WidgetConfig | WidgetConfig[] | null | undefined;
}

describe('DynamicWidgetOutletDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, TestWidgetComponent, DynamicWidgetOutletDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
  });

  it('should render a single component', () => {
    hostComponent.configs = {
      component: TestWidgetComponent,
      inputs: { title: 'Static Title' },
    };
    fixture.detectChanges();

    const widget = fixture.debugElement.query(By.directive(TestWidgetComponent));
    expect(widget).toBeTruthy();
    expect(widget.componentInstance.title).toBe('Static Title');

    const titleElement = widget.query(By.css('.title')).nativeElement;
    expect(titleElement.textContent).toBe('Static Title');
  });

  it('should render multiple components', () => {
    hostComponent.configs = [
      { component: TestWidgetComponent, inputs: { title: 'Widget 1' } },
      { component: TestWidgetComponent, inputs: { title: 'Widget 2' } },
    ];
    fixture.detectChanges();

    const widgets = fixture.debugElement.queryAll(By.directive(TestWidgetComponent));
    expect(widgets.length).toBe(2);
    expect(widgets[0].componentInstance.title).toBe('Widget 1');
    expect(widgets[1].componentInstance.title).toBe('Widget 2');
  });

  it('should handle Observable inputs', () => {
    const title$ = new BehaviorSubject('Initial Title');
    hostComponent.configs = {
      component: TestWidgetComponent,
      inputs: { title: title$ },
    };
    fixture.detectChanges();

    const widget = fixture.debugElement.query(By.directive(TestWidgetComponent));
    expect(widget.componentInstance.title).toBe('Initial Title');

    title$.next('Updated Title');
    fixture.detectChanges();
    expect(widget.componentInstance.title).toBe('Updated Title');
  });

  it('should handle Signal inputs', () => {
    const titleSignal = signal('Signal Title');
    hostComponent.configs = {
      component: TestWidgetComponent,
      inputs: { title: titleSignal },
    };
    fixture.detectChanges();

    const widget = fixture.debugElement.query(By.directive(TestWidgetComponent));
    expect(widget.componentInstance.title).toBe('Signal Title');

    titleSignal.set('Updated Signal Title');
    fixture.detectChanges();
    // Effects are asynchronous, so we might need to wait or use flushEffects if available in this environment
    // But in modern Angular tests, detectChanges often triggers effects.
    expect(widget.componentInstance.title).toBe('Updated Signal Title');
  });

  it('should connect output handlers', () => {
    let emittedData = '';
    hostComponent.configs = {
      component: TestWidgetComponent,
      outputs: {
        clicked: (data: string) => (emittedData = data),
      },
    };
    fixture.detectChanges();

    const widget = fixture.debugElement.query(By.directive(TestWidgetComponent));
    const button = widget.query(By.css('button'));
    button.nativeElement.click();

    expect(emittedData).toBe('data');
  });

  it('should cleanup components on destruction', () => {
    hostComponent.configs = { component: TestWidgetComponent };
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.directive(TestWidgetComponent))).toBeTruthy();

    hostComponent.configs = null;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.directive(TestWidgetComponent))).toBeFalsy();
  });
});
