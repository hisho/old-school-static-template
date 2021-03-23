import { Animation, AnimationOptionsType } from './Animation';
import  { gsap } from 'gsap';

type slideStateType = {
  show: boolean;
  display: {
    show: string;
    hide: 'none';
  };
};

export class Fade extends Animation {
  //Fadeのstateを定義
  private state: slideStateType = {
    show: true,
    display: {
      show: 'block',
      hide: 'none',
    },
  };

  constructor(element: HTMLElement, options?: Partial<AnimationOptionsType>) {
    super(element, options);
    this.state.display.show = this.getPropertyValue('display') ?? this.state.display.show;
    // this.initialize();
  }

  private readonly getPropertyValue = (property: string): string => {
    return window.getComputedStyle(this.element).getPropertyValue(property);
  };

  //初期化する関数
  public readonly initialize = (): void => {
    this.element.style.display = this.state.display.hide;
    gsap.set(this.element, { autoAlpha: 0 });
  };

  //現在のstateを返す関数
  get getState(): slideStateType {
    return this.state;
  }

  //FadeOutの関数
  public readonly out = (options?: Partial<AnimationOptionsType>): void => {
    //is-animatingが付いている場合は早期return
    if (this.isAnimating()) return;

    //_optionsとoptionsをマージする
    const currentOptions: AnimationOptionsType = { ...this.options, ...options };

    //heightをautoから0にするアニメーションを実装し終わったらdisplayをnoneにする
    this.timeline
      .to(this.element, {
        autoAlpha: 0,
        duration: currentOptions.duration,
        ease: currentOptions.ease,
        onStart: () => this.onStart(),
        onComplete: () => this.onComplete(),
      })
      .set(this.element, {
        display: this.state.display.hide,
      });
    this.state.show = false;
  };

  //FadeInの関数
  public readonly in = (options?: Partial<AnimationOptionsType>): void => {
    //is-animatingが付いている場合は早期return
    if (this.isAnimating()) return;

    //_optionsとoptionsをマージする
    const currentOptions: AnimationOptionsType = { ...this.options, ...options };

    //displayをblockにしheightを0からautoにするアニメーションを実行する
    this.timeline
      .set(this.element, {
        display: this.state.display.show,
      })
      .to(this.element, {
        autoAlpha: 1,
        duration: currentOptions.duration,
        ease: currentOptions.ease,
        onStart: () => this.onStart(),
        onComplete: () => this.onComplete(),
      });
    this.state.show = true;
  };
}
