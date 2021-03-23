import { Aria, Slide } from '../utilities';
import { common } from '~/utilities/common';

type accordionType = Readonly<{
  root: HTMLElement;
  summary: HTMLElement;
  details: HTMLElement;
}>;

type AccordionStateType = {
  open: boolean;
};

/**
 * TODO easingのoptionを投げれるようにする
 * TODO wrapperのclassを実装する
 */
export class Accordion {
  //stateのdefault値を設定する
  private state: AccordionStateType = {
    open: false,
  };

  private readonly elements: accordionType;

  private readonly slide: Slide;

  constructor(elements: accordionType) {
    this.elements = elements;
    this.slide = new Slide(this.elements.details);
    this.register();
  }

  //初期化する関数
  // private readonly initialize = (): void => {
  //
  // };

  //イベントを登録する関数
  private readonly register = (): void => {
    this.elements.summary.addEventListener('click', this.clickEvent, false);
    this.elements.summary.addEventListener('keypress', this.keyEvent, false);
  };

  // 必ず呼ぶとは限らないのでignore
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  //イベントの登録を解除する関数
  private readonly unRegister = (): void => {
    this.elements.summary.removeEventListener('click', this.clickEvent, false);
    this.elements.summary.removeEventListener('keypress', this.keyEvent, false);
  };

  //キーボードイベント
  private readonly keyEvent = (event: KeyboardEvent): void => {
    if (event.code.toLowerCase() === 'enter') this.clickEvent();
  };

  //クリックイベント
  private readonly clickEvent = (): void => {
    this.toggle();
  };

  //トグルイベント
  private readonly toggle = (): void => {
    //アニメーション中だったら早期returnする
    if (this.elements.details.classList.contains(common.classes.animating)) return;
    switch (this.state.open) {
      case true:
        this.up();
        break;
      case false:
        this.down();
        break;
      default:
        throw new Error('no!');
    }
  };

  //slideUpの関数
  public readonly up = (): void => {
    //this.state.openをfalseにする
    this.state.open = false;
    //this.elements.summaryのaria-expandedをfalseにする
    Aria.setState(this.elements.summary, 'aria-expanded', false);
    Aria.setState(this.elements.details, 'aria-hidden', true);
    this.slide.up();
  };

  //slideDownの関数
  public readonly down = (): void => {
    //this.state.openをtrueにする
    this.state.open = true;
    //this.elements.summaryのaria-expandedをtrueにする
    Aria.setState(this.elements.summary, 'aria-expanded', true);
    //this.elements.detailsのaria-hiddenをfalseにする
    Aria.setState(this.elements.details, 'aria-hidden', false);
    //this.elements.detailsをslideDownする
    this.slide.down();
  };
}
