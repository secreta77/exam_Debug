import { Directive, HostBinding, HostListener, input, signal } from '@angular/core';

@Directive({ selector: '[appHighlight]' })
export class HighlightDirective {
  readonly color = input('#fff3cd', { alias: 'appHighlight' });
  private readonly hovered = signal(false);

  @HostBinding('style.backgroundColor')
  get background(): string {
    return this.hovered() ? this.color() : '';
  }

  @HostListener('mouseenter')
  onEnter(): void {
    this.hovered.set(true);
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.hovered.set(true);
  }
}
