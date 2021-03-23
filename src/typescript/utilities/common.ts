export const classes = {
  animating: 'is-animating',
  current: 'is-current',
  active: 'is-active',
  focusable: 'a[href],area[href],input:not([disabled]):not([type="hidden"]):not([aria-hidden]),select:not([disabled]):not([aria-hidden]),textarea:not([disabled]):not([aria-hidden]),button:not([disabled]):not([aria-hidden]),iframe,object,embed,[contenteditable],[tabindex]:not([tabindex^="-"])',
} as const;

export const events = {
  //input
  change: 'change',
  //window
  resize: 'resize',
  scroll: 'scroll',
  //keyboard
  keydown: 'keydown',
  keypress: 'keypress',
  keyup: 'keyup',
  //mouse
  click: 'click',
  dblclick: 'dblclick',
  mouseenter: 'mouseenter',
  mouseleave: 'mouseleave',
  mousemove: 'mousemove',
  mouseover: 'mouseover',
  mouseout: 'mouseup',
  //animation
  animationstart: 'animationstart',
  animationend: 'animationend',
  //transitionend
  transitionstart: 'transitionstart',
  transitionend: 'transitionend',
  //load
  load: 'load',
  DOMContentLoaded: 'DOMContentLoaded',
} as const;

export const common = {
  classes,
  events,
};
