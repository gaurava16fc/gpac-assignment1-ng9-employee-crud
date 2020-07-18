import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appStrictNumericDigts]'
})
export class StrictNumericDigtsDirective {
  private regex: RegExp = new RegExp('^[0-9]*$'); // Only Number Digits [] i.e. 0-9 ]

  private arrSpecialAllowedKeys: Array<string> = [
      'Backspace',
      'ArrowLeft',
      'ArrowRight',
      'Delete'
    ];

  constructor(private elementRef: ElementRef) { }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    // console.log('Captured Event Key# ' + event.key);
    if (this.arrSpecialAllowedKeys.indexOf(event.key) !== -1) {
      return;
    }
    const inputStr: string = this.elementRef.nativeElement.value.concat(event.key);
    if (inputStr && !String(inputStr).match(this.regex)) {
      event.preventDefault();
    }
    return;
  }

  @HostListener('paste', ['$event']) onPaste(event) {
    const clipBrd = (event.originalEvent || event).clipboardData.getData('text/plain');
    if (clipBrd) {
      const regex: RegExp = new RegExp('^[0-9]*$');
      if (!this.regex.test(clipBrd)) {
        event.preventDefault();
      }
    }
    return;
  }
}