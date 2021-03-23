import { Aria, Media, Fade, ScrollBehavior } from '../utilities';
import { common } from '../utilities/common';
import variables from '../../data/variables.json';

interface MenuState {
  open: boolean;
  label: {
    readonly open?: string;
    readonly close?: string;
  };
}

// TODO
// ☐ フォーカストラップを実装する
// ☑ aria-labelを実装する
// ☑ PC版に切り替えで初期化を実装する
// ☑ aria操作するclassを作成する
// ☑ メディアクエリのclassを作成する
// ☑ アンカーリンクを押した時に閉じるようにする
// ☑ スクロールロックを追加する
// ☐ リファクタリング

class GlobalNavigation {
  private readonly menuButton: HTMLElement;
  private readonly globalNavigation: HTMLElement;
  private readonly globalNavigationOverlay: HTMLElement;
  private readonly anchorLinks: NodeListOf<HTMLElement>;
  private readonly fade: Fade;
  private readonly globalNavigationOverlayFade: Fade;
  private readonly menuButtonText: HTMLElement;
  private state: MenuState;
  private readonly media?: keyof typeof variables.breakpoints;

  private readonly scrollBehavior: ScrollBehavior;

  constructor(breakpoint?: keyof typeof variables.breakpoints) {
    this.menuButton = document.getElementById('MenuButton') as HTMLElement;
    this.globalNavigation = document.getElementById('GlobalNavigation') as HTMLElement;
    this.globalNavigationOverlay = document.getElementById('GlobalNavigationOverlay') as HTMLElement;
    this.globalNavigationOverlayFade = new Fade(this.globalNavigationOverlay, { duration: 0.3 });
    this.anchorLinks = this.globalNavigation.querySelectorAll<HTMLElement>('a[href*="#"]');
    this.fade = new Fade(this.globalNavigation, { duration: 0.3 });
    this.menuButtonText = document.getElementById('MenuButtonText') as HTMLElement;
    this.scrollBehavior = new ScrollBehavior(this.globalNavigation);
    this.media = breakpoint;
    this.state = {
      open: false,
      label: {
        open: this.menuButtonText.dataset.open,
        close: this.menuButtonText.dataset.close,
      },
    };
    this.initialize();
  }

  private initialize = () => {
    if (this.media) {
      new Media(this.media, {
        mediaMachFunc: () => this.unregister(),
        mediaUnMachFunc: () => this.register(),
      });
    } else {
      this.register();
    }
  };

  private register = () => {
    console.log('register');
    Aria.setState(this.menuButton, 'aria-expanded', false);
    Aria.setState(this.globalNavigation, 'aria-hidden', true);
    this.menuButton.style.display = 'block';
    this.fade.initialize();
    this.globalNavigationOverlayFade.initialize();
    this.menuButton.addEventListener('click', this.clickEvent, false);
    this.globalNavigationOverlay.addEventListener(common.events.click, this.close, false);
    this.anchorLinks.forEach((n) => n.addEventListener('click', this.close), false);
  };

  private unregister = () => {
    console.log('unregister');
    Aria.deleteState(this.menuButton, 'aria-expanded');
    Aria.deleteState(this.globalNavigation, 'aria-hidden');
    this.menuButton.style.display = 'none';
    this.fade.initialize();
    this.globalNavigationOverlayFade.initialize();
    this.menuButton.removeEventListener('click', this.clickEvent);
    this.globalNavigationOverlay.removeEventListener(common.events.click, this.close, false);
    this.anchorLinks.forEach((n) => n.removeEventListener('click', this.close), false);
    this.scrollBehavior.unregister();
  };

  private toggleState = () => {
    switch (this.state.open) {
      case true:
        this.open();
        break;
      case false:
        this.close();
        break;
      default:
        new Error('a');
    }
  };

  private readonly open = () => {
    if (this.state.label.close) this.menuButtonText.innerText = this.state.label.close;
    Aria.setState(this.menuButton, 'aria-expanded', true);
    Aria.setState(this.globalNavigation, 'aria-hidden', false);
    this.fade.in();
    this.globalNavigationOverlayFade.in();
    this.scrollBehavior.lock();
    this.state.open = this.fade.getState.show;
  };

  private readonly close = () => {
    if (this.state.label.open) this.menuButtonText.innerText = this.state.label.open;
    Aria.setState(this.menuButton, 'aria-expanded', false);
    Aria.setState(this.globalNavigation, 'aria-hidden', true);
    this.fade.out();
    this.globalNavigationOverlayFade.out();
    this.scrollBehavior.unLock();
    this.state.open = this.fade.getState.show;
  };

  private clickEvent = () => {
    const currentMenuState = this.menuButton && Aria.getState(this.menuButton, 'aria-expanded');
    this.state.open = !currentMenuState;
    this.toggleState();
  };
}

new GlobalNavigation('md');
