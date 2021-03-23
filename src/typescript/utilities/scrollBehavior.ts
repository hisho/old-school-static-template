import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

type ScrollBehaviorType = {
  lock: boolean;
};

export class ScrollBehavior {
  private readonly html: HTMLElement = document.documentElement;
  private readonly targetElement: HTMLElement;

  private readonly state: ScrollBehaviorType = {
    lock: false,
  };

  constructor(targetElement: HTMLElement) {
    this.targetElement = targetElement;
  }

  public readonly lock = (): void => {
    console.log('lock');
    this.html.style.overflow = 'hidden';
    disableBodyScroll(this.targetElement);
    this.state.lock = true;
  };

  public readonly unLock = (): void => {
    console.log('unLock');
    this.html.style.overflow = '';
    enableBodyScroll(this.targetElement);
    this.state.lock = false;
  };

  public readonly unregister = (): void => {
    this.html.style.overflow = '';
    clearAllBodyScrollLocks();
    this.state.lock = false;
  };
}
