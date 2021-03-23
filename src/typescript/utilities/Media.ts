import variables from '../../data/variables.json';
import { common } from './common';

type mediaType = keyof typeof variables.breakpoints;

//メディアクエリのClass
export class Media {
  //MediaQueryList
  private readonly mediaQuery: MediaQueryList;

  //configを定義する
  //config.mediaの初期値はsm
  private readonly config: {
    media: mediaType;
    mediaMachFunc: () => void;
    mediaUnMachFunc: () => void;
  } = {
    media: 'sm',
    mediaMachFunc: () => console.log('mach'),
    mediaUnMachFunc: () => console.log('unMach'),
  };

  constructor(media?: mediaType, options?: Partial<{ mediaMachFunc: () => void; mediaUnMachFunc: () => void }>) {
    //mediaがあればthis.config.mediaに代入
    this.config.media = media ?? this.config.media;

    //options.mediaUnMachFuncがあればconfig.mediaMachFuncに代入
    this.config.mediaMachFunc = options?.mediaMachFunc ?? this.config.mediaMachFunc;

    //options.mediaUnMachFuncがあればconfig.mediaUnMachFuncに代入
    this.config.mediaUnMachFunc = options?.mediaUnMachFunc ?? this.config.mediaUnMachFunc;

    //MediaQueryListを定義(breakpoints/16)em
    this.mediaQuery = matchMedia(`(min-width: ${variables.breakpoints[this.config.media] / 16}em)`);

    //初期化
    this.initialize();
  }

  //mediaQueryにmachしているか返す関数
  public readonly isMatch = (): boolean => {
    return this.mediaQuery.matches;
  };

  //初期化する関数
  private readonly initialize = (): void => {
    //初回実行
    this.handler();

    //初回登録
    this.register();
  };

  //matchしているかを判定する関数
  private readonly handler = (): void => {
    if (this.isMatch()) {
      this.config.mediaMachFunc();
    } else {
      this.config.mediaUnMachFunc();
    }
  };

  //イベントの登録をする関数
  public readonly register = (): void => {
    try {
      this.mediaQuery.addEventListener(common.events.change, this.handler);
    } catch {
      console.log('MediaQueryList addEventListener does not found');
      this.mediaQuery.addListener(this.handler);
    }
  };

  // 必ず呼ぶとは限らないのでignore
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  //イベントの登録を解除する関数
  public readonly unregister = (): void => {
    try {
      this.mediaQuery.removeEventListener(common.events.change, this.handler);
    } catch {
      console.log('MediaQueryList addEventListener does not found');
      this.mediaQuery.removeListener(this.handler);
    }
  };
}
