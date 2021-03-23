//IE11用のポリフィルをここに追記していく
//※IE11以外では読み込みされません。
import 'react-app-polyfill/ie11';
import 'nodelist-foreach-polyfill';
import '@babel/polyfill';
import 'picturefill';
import 'svgxuse';
import 'intersection-observer';
import Stickyfill from 'stickyfilljs';
import objectFitImages from 'object-fit-images';

window.addEventListener('DOMContentLoaded', () => {
  const images: NodeListOf<HTMLImageElement> = document.querySelectorAll('img');
  objectFitImages(images);

  const elements: NodeListOf<HTMLElement> = document.querySelectorAll('.sticky');
  Stickyfill.add(elements);
});
