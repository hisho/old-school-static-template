import  { gsap } from 'gsap';
import { common } from '../common';

export type AnimationOptionsType = Readonly<{
  duration: gsap.TweenVars['duration'];
  ease: gsap.TweenVars['ease'];
}>;

export class Animation {
  //gsapのtimelineを定義する
  protected readonly timeline = gsap.timeline();

  //targetとなるelementを定義
  protected readonly element: HTMLElement;

  //アニメーションのデフォルトの設定を定義する
  protected readonly options: AnimationOptionsType = {
    duration: 0.5,
    ease: 'power2.inOut',
  };

  constructor(element: HTMLElement, options?: Partial<AnimationOptionsType>) {
    this.element = element;
    this.options = { ...this.options, ...options };
  }

  //gsapのアニメーションが終わったときの関数
  protected readonly onComplete = (): void => {
    //elementのcommon.classes.animatingをremoveする
    this.element.classList.remove(common.classes.animating);
  };

  //gsapのアニメーションが始まる時の関数
  protected readonly onStart = (): void => {
    //elementにcommon.classes.animatingをaddする
    this.element.classList.add(common.classes.animating);
  };

  //elementにcommon.classes.animating(is-animating)が付いているか判定する関数
  protected readonly isAnimating = (): boolean => {
    return this.element.classList.contains(common.classes.animating);
  };
}
