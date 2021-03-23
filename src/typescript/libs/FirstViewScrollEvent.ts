import {Fade} from "~/utilities";
import scrollama, {DecimalType} from "scrollama";
import {common} from "~/utilities/common";

export class FirstViewScrollEvent {
  private readonly fade: Fade;
  private readonly scroller: scrollama.ScrollamaInstance;
  private readonly offset: DecimalType;

  constructor(target: HTMLElement, offset?: DecimalType) {
    this.scroller = scrollama();
    this.offset = offset ?? 0.6
    const box = document.getElementById('box') as HTMLElement;
    if (!box) console.error('box is does not exist');
    this.fade = new Fade(target);
    this.fade.initialize();
    this.scroller.setup({
      step: [box],
      order: true,
      offset: this.offset,
      debug: process.env.NODE_ENV === 'development',
    }).onStepEnter((response) => {
      if (response.direction === 'up') this.fade.out();
    }).onStepExit((response) => {
      if (response.direction === 'down') this.fade.in();
      //初回読み込み
      window.addEventListener(common.events.DOMContentLoaded, () => this.fade.in(), {
        once: true,
      });
    });
  }

  get getScroller() {
    return this.scroller;
  }

  get getFade() {
    return this.fade;
  }
}
