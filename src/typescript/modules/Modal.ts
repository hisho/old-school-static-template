import MicroModal from 'micromodal';

((): void => {
  MicroModal.init({
    openTrigger: 'data-modal-trigger',
    closeTrigger: 'data-modal-close',
    awaitCloseAnimation: true,
  });
})();
