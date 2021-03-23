import {gsap} from "gsap";
import {ScrollToPlugin} from "gsap/ScrollToPlugin"

gsap.registerPlugin(ScrollToPlugin);

export class SmoothScroll {
  private readonly element: HTMLElement;

  constructor(element: HTMLElement | HTMLAnchorElement) {
    this.element = element;
  }

  //初期化する関数
  public readonly initialize = () => {
    this.register();
  }

  //イベントを登録する関数
  public readonly register = () => {
    this.element.addEventListener('click', this.clickEvent, false);
  }

  //イベントを解除する関数
  public readonly unRegister = () => {
    this.element.removeEventListener('click', this.clickEvent, false);
  }

  //クリックイベント
  private readonly clickEvent = (event: MouseEvent) => {
    //defaultのイベントをキャンセル
    event.preventDefault();

    //クリックしたDOMを取得する
    const currentTarget = event.currentTarget as HTMLElement | HTMLAnchorElement | null;

    //DOMが取得できない場合は早期return
    if (!currentTarget) return;

    //currentTargetのhrefかdata-hrefに値があった場合取得する
    const elementHref = currentTarget.getAttribute('href') ?? currentTarget.getAttribute('data-href');

    //elementHrefのDOMがあるかチェックする
    const hasElement = elementHref ? document.getElementById(elementHref.replace(/#/, '')) : null;

    this.scrollTo(hasElement ? elementHref : null);
  }

  //スクロールwindowをさせる関数
  private readonly scrollTo = (href: string | null) => {
    gsap.to(window, {
      duration: .5,
      scrollTo: {
        y: href || 0,
        offsetY: 0
      },
      ease: "power2.easeOut"
    });
  }
}
