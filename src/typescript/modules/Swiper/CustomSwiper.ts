import Swiper, { SwiperOptions } from 'swiper';

const swiperClassNames = {
  container: '.swiper-container',
  pagination: '.swiper-pagination',
  navigation: {
    next: '.swiper-button-next',
    prev: '.swiper-button-prev',
  },
} as const;

class CustomSwiper {
  private readonly nodes: NodeListOf<HTMLElement>;
  private readonly options: SwiperOptions;
  private readonly swipers: Swiper[];

  constructor(className: string, options?: SwiperOptions) {
    this.options = options ?? {};
    this.nodes = document.querySelectorAll(className);
    if (this.nodes.length < 1) throw new Error(`${className} is null`);
    this.initialize();
    this.swipers = Array.from(this.nodes, (_, index) => this.createSwiper(index, this.options));
  }

  private initialize(): void {
    this.nodes.forEach((node, index) => {
      this.setClassName(node, index, swiperClassNames.container);
      this.setClassName(node, index, swiperClassNames.pagination);
      this.setClassName(node, index, swiperClassNames.navigation.next);
      this.setClassName(node, index, swiperClassNames.navigation.prev);
    });
  }

  public Swipers(callbackFunction: (swiper: Swiper) => void): void {
    this.swipers.forEach((swiper) => callbackFunction(swiper));
  }

  private setClassName(node: HTMLElement, index: number, className: string): void {
    node.querySelector(className)?.classList.add(`${this.replaceDot(className)}-${this.zeroPadding(index)}`);
  }

  private createSwiper(index: number, options?: SwiperOptions): Swiper {
    const currentIndex = this.zeroPadding(index);
    if (options?.pagination?.el) options.pagination.el = `${swiperClassNames.pagination}-${currentIndex}`;
    if (options?.navigation?.nextEl) options.navigation.nextEl = `${swiperClassNames.navigation.next}-${currentIndex}`;
    if (options?.navigation?.prevEl) options.navigation.prevEl = `${swiperClassNames.navigation.prev}-${currentIndex}`;
    const name = `${swiperClassNames.container}-${currentIndex}`;
    return new Swiper(name, options);
  }

  private replaceDot(text: string): string {
    return text.replace(/^\./, '');
  }

  private zeroPadding(index: number): string {
    return String(index).padStart(2, '0');
  }
}

export default function createSwiper(className: string, options: SwiperOptions): CustomSwiper | undefined {
  if (!document.querySelector(className)) return;
  return new CustomSwiper(className, options);
}
