import { ElementRef } from '@angular/core';
import { RandomColorDirective } from './random-color.directive';

describe('RandomColorDirective', () => {
  let elementRef: ElementRef;
  let directive: RandomColorDirective;

  beforeEach(() => {
    elementRef = new ElementRef(null); // Provide a mock ElementRef instance
    directive = new RandomColorDirective(elementRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
