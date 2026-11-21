import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HighlightDirective } from './highlight.directive';

@Component({
  imports: [HighlightDirective],
  template: `<div [appHighlight]="'#ff0000'">test</div>`,
})
class HostComponent {}

describe('HighlightDirective', () => {
  it('sets background on mouseenter and clears it on mouseleave', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('div');

    el.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    expect(el.style.backgroundColor).not.toBe('');

    el.dispatchEvent(new Event('mouseleave'));
    fixture.detectChanges();
    expect(el.style.backgroundColor).toBe('');
  });
});
