// ==UserScript==
// @name        StealTheMonke
// @namespace   https://github.com/4ndv/StealTheMonke
// @match       https://twitter.com/*
// @grant       none
// @version     1.0
// @author      @libneko
// @description Adds missing feature that even Twitter Blue doesn't have: click on hexagonal avatar to open it in a new tab and save yourself a couple of clicks while stealing it!
// @downloadURL https://raw.githubusercontent.com/4ndv/StealTheMonke/main/StealTheMonke.user.js
// @homepageURL https://github.com/4ndv/StealTheMonke
// @supportURL  https://github.com/4ndv/StealTheMonke/issues
// @license     MIT
// ==/UserScript==

console.log('Init StealTheMonke');

function debounce(func, timeout = 300){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

function addMonkeHeistEvent() {
  console.log('Looking for monkes');

  const elements = document.querySelectorAll('div[style*="hex-hw-shapeclip-clipconfig"]:not(.stolen) a');

  for (let link of elements) {
    // Saying goodbye to associated events
    linkClone = link.cloneNode(true);
    link.parentNode.replaceChild(linkClone, link);

    linkClone.classList.add('stolen');

    let monke = linkClone.querySelector(':scope img[src*="profile_images"]');

    if (!monke) continue;

    monke = monke.src.replaceAll('_x96', '_400x400');

    linkClone.href = monke;
    linkClone.target = '_blank';
  }
}

const debouncedFn = debounce(() => {
  setTimeout(addMonkeHeistEvent, 500);
  setTimeout(addMonkeHeistEvent, 2000);
  setTimeout(addMonkeHeistEvent, 5000);
}, 1000);

window.addEventListener('scroll', debouncedFn);
window.addEventListener('locationchange', debouncedFn);

setTimeout(addMonkeHeistEvent, 1000);
setTimeout(addMonkeHeistEvent, 2000);
setTimeout(addMonkeHeistEvent, 5000);
