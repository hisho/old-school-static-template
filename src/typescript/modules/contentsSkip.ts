import { common } from '../utilities/common';

(() => {
  const root = document.getElementById('ContentsSkip');
  const main = document.getElementById('main');

  function clickEvent() {
    main?.querySelector<HTMLElement>(common.classes.focusable)?.focus();
  }

  root?.addEventListener(common.events.click, clickEvent, false);
})();
