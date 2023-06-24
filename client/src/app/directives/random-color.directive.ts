import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[randomColor]'
})
export class RandomColorDirective implements OnChanges {

  @Input('randomColor') items: string[] = [];

  constructor(private elementRef: ElementRef) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items'] && changes['items'].currentValue) {
      this.applyRandomColors();
    }
  }

  private applyRandomColors() {
    this.items.forEach((item, index) => {
      const randomColor = this.getRandomLightColor();
      const span = document.createElement('span');
      span.style.color = randomColor;
      span.style.marginRight = "5px";
      span.innerText = item + (this.items.length !== index + 1 ? ", " : "");
      this.elementRef.nativeElement.appendChild(span);
    });
  }

  private getRandomLightColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
