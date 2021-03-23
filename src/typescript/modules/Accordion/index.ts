import { Accordion } from '../../libs/Accordion';

// TODO classに書き換える
(() => {
  const rootElements = document.querySelectorAll<HTMLElement>('.Accordion');
  rootElements.forEach((rootElement, index) => {
    const summaryElement = rootElement.querySelector<HTMLElement>('.AccordionSummary');
    if (!summaryElement) return;
    const detailsElement = rootElement.querySelector<HTMLElement>('.AccordionDetails');
    if (!detailsElement) return;
    const zeroPaddingIndex = String(index).padStart(2, '0');
    const id = `AccordionSummary-${zeroPaddingIndex}`;
    detailsElement.setAttribute('id', id);
    summaryElement.setAttribute('aria-controls', id);
    new Accordion({
      root: rootElement,
      summary: summaryElement,
      details: detailsElement,
    });
  });
})();
