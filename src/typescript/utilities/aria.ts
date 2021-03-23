type ariaName = 'aria-expanded' | 'aria-hidden' | 'aria-selected' | 'aria-disabled' | 'aria-pressed';
type HTMLElements = HTMLElement | HTMLElement[] | NodeList;

export class Aria {
  static sanitizeElement = ($elements: HTMLElements): HTMLElement[] => {
    return $elements instanceof HTMLElement ? [$elements] : ([...$elements] as HTMLElement[]);
  };

  static toggleState = ($element: HTMLElement, ariaName: ariaName): void => {
    const currentState = Aria.getState($element, ariaName);
    Aria.setState($element, ariaName, !currentState);
    console.log(currentState);
  };

  static toggleStateAll = ($elements: HTMLElements, ariaName: ariaName): void => {
    Aria.sanitizeElement($elements).forEach((element) => {
      Aria.toggleState(element, ariaName);
    });
  };

  static setState = ($element: HTMLElement, ariaName: ariaName, state: boolean): void => {
    $element.setAttribute(ariaName, `${state}`);
  };

  static setStateAll = ($elements: HTMLElement, ariaName: ariaName, state: boolean): void => {
    Aria.sanitizeElement($elements).forEach((element) => {
      Aria.setState(element, ariaName, state);
    });
  };

  static getState = ($element: HTMLElement, ariaName: ariaName): boolean => {
    const currentState = $element.getAttribute(ariaName);
    return currentState === 'true';
  };

  static getStateAll = ($elements: HTMLElement, ariaName: ariaName): boolean[] => {
    return Aria.sanitizeElement($elements).map((element) => {
      const currentState = element.getAttribute(ariaName);
      return currentState === 'true';
    });
  };

  static deleteState = ($element: HTMLElement, ariaName: ariaName): void => {
    $element.removeAttribute(ariaName);
  };
}
