import createSwiper from './CustomSwiper';

(() => {
  const swiperLv1 = createSwiper('.swiper-lv1', {
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  swiperLv1?.Swipers((swiper) => console.log(swiper));
})();
