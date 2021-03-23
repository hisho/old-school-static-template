// import SweetScroll from 'sweet-scroll';
import {SmoothScroll} from "~/libs/SmoothScroll";

export class ToTopButton {
  private readonly elementName = 'ToTopButton';

  element = document.getElementById(this.elementName);

  constructor() {
    this.element &&
      new SmoothScroll(this.element).initialize();
      // new SweetScroll({
      //   trigger: `#${this.elementName}`,
      //   after: () => this.afterFunction,
      // });
  }

  // private readonly afterFunction = (): void => {
  //   console.log('after');
  //   document.getElementById('ContentsSkip')?.focus();
  // };
}
