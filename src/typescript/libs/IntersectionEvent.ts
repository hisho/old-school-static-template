import scrollama from "scrollama";
import {QueryElements,QueryElementsType} from "./QueryElements";

export type IntersectionEventOptionsType = Readonly<{
  scrollerOptions?: Omit<scrollama.ScrollamaOptions, 'step'>
}>
export type IntersectionEventCallBack = (element: HTMLElement, index: number, array: HTMLElement[]) => void

//スクロールが交差した時に発火するClass
export class IntersectionEvent {
  private readonly elements: HTMLElement[];
  private readonly scroller = scrollama();

  constructor(elements: QueryElementsType, options?: Partial<IntersectionEventOptionsType>) {
    //HTMLElementの配列
    this.elements = new QueryElements(elements).getElements;

    //DOMがない場合は処理を中断する
    if (this.elements.length === 0) return;

    //scrollamaの初期設定
    const scrollerOptionsBase: scrollama.ScrollamaOptions = {
      step: this.elements,
      debug: process.env.NODE_ENV === 'development'
    }

    //scrollamaの初期設定とoptionsの値をmergeする
    this.scroller.setup({
      ...scrollerOptionsBase,
      ...options?.scrollerOptions
    });

    //リサイズイベントに登録
    window.addEventListener('resize', this.scroller.resize);

  }

  //scrollamaのinstanceを返すgetter
  get getScroller() {
    return this.scroller;
  }

  //初期化した時に実行する関数
  public readonly initialize = (callBack: IntersectionEventCallBack) => {
    this.elements.forEach(callBack);
  }

  //Viewportが要素に入った時に発火する関数
  public readonly onEnter = (callBack: IntersectionEventCallBack) => {
    this.scroller.onStepEnter(({direction, element, index}) => {
      if (direction === 'up') return;
      callBack(element, index, this.elements);
    })
  }

  //Viewportが要素を出たときに発火する関数
  public readonly onExit = (callBack: IntersectionEventCallBack) => {
    this.scroller.onStepEnter(({direction, element, index}) => {
      if (direction === 'down') return;
      callBack(element, index, this.elements);
    })
  }
}
