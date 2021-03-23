export type QueryElementsType = string | HTMLElement | HTMLElement[] | NodeList

//DOMを取得しHTMLElementの配列にして返すClass
export class QueryElements {
  private readonly selector: HTMLElement[]

  constructor(selector: QueryElementsType) {
    if (typeof selector === 'string') {
      this.selector = [...(document.querySelectorAll(selector) as NodeListOf<HTMLElement>)];
    } else if (selector instanceof HTMLElement) {
      this.selector = [selector];
    } else {
      this.selector = [...selector] as HTMLElement[];
    }
  }

  //HTMLElementの配列を返すgetter
  get getElements() {
    return this.selector;
  }
}
