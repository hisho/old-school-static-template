import gsap from "gsap";
import {IntersectionEvent} from "~/libs/IntersectionEvent";

(() => {
  const intersection = new IntersectionEvent(".FadeItem");
  intersection.initialize((element) => {
    gsap.set(element, {
      y: 100,
      autoAlpha: 0
    })
  });

  intersection.onEnter((element) => {
    gsap.to(element, {
      autoAlpha: 1,
      duration: 0.3,
      y: 0
    })
  })
  // const FadeItems = [...document.querySelectorAll<HTMLElement>(".FadeItem")];
  // if (FadeItems.length === 0) {
  //   return;
  // }
  // const scroller = scrollama();
  //
  // scroller.setup({
  //   step: FadeItems,
  //   debug: process.env.NODE_ENV === 'development',
  //   offset: 0.8
  // })
  // 何回もする時
  // scroller.onStepExit(({direction,element}) => {
  //   if(direction === "down") {
  //     return;
  //   }
  //   console.log("up")
  //   gsap.to(element, {
  //     autoAlpha:0,
  //     duration: 0.3,
  //     y:100
  //   })
  // })
  // window.addEventListener("resize", scroller.resize);
})();

