import { common } from '../utilities/common';

((): void => {
  function setViewportProperty(): void {
    const vh: number = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh + 0.01}px`);
  }

  let windowWidth: number = window.innerWidth;

  function updateInnerWidth(): void {
    const isSameWindowWidth: boolean = windowWidth === window.innerWidth;
    if (!isSameWindowWidth) setViewportProperty();
    windowWidth = window.innerWidth;
  }

  window.addEventListener(common.events.resize, updateInnerWidth);

  setViewportProperty();
})();
