import {SmoothScroll} from "~/libs/SmoothScroll";

export class AnchorLink {
  private readonly elements = document.querySelectorAll<HTMLElement>('a[href^="#"]');

  constructor() {
    this.elements.length !== 0 &&
    this.elements.forEach((element) => {
      new SmoothScroll(element).initialize();
    });
  }

  // const scroller = new SweetScroll({ trigger: linkElements });
  // const mediaQuery = matchMedia(`(min-width: ${Breakpoints.sm}px)`);
  // const handle = (): void => {
  //   if (!mediaQuery.matches) {
  //     scroller.update({ header: '#header' });
  //   } else {
  //     scroller.update({ header: '#sticky_header' });
  //   }
  // };
  // handle();
  // mediaQuery.addEventListener('change', () => handle());
}
