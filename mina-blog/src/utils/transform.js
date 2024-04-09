import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// 利用jsp来进行盒子的动画
/**
 *
 * @param {*} list 盒子类名
 * @param {*} x 位移
 * @param {*} duration 持续时间 s
 * @param {*} ease 动画过渡 详情见 https://gsap.com/docs/v3/Eases/
 */
function gsapTransX(list, x, duration = 1, ease = "power1.inOut") {
  gsap.registerPlugin(ScrollTrigger);
  list.map((v) => {
    gsap.fromTo(
      v,
      {
        scrollTrigger: v,
        x,
      },
      {
        scrollTrigger: v,
        x: 0,
        duration,
        ease,
      }
    );
  });
}

/**
 *
 * @param {*} list 盒子类名
 * @param {*} y 位移
 * @param {*} duration 持续时间 s
 * @param {*} ease 动画过渡 详情见 https://gsap.com/docs/v3/Eases/
 */
function gsapTransY(list, y, duration = 1, ease = "power1.inOut") {
  gsap.registerPlugin(ScrollTrigger);
  list.map((v) => {
    gsap.fromTo(
      v,
      {
        scrollTrigger: v,
        y,
      },
      {
        scrollTrigger: v,
        y: 0,
        duration,
        ease,
      }
    );
  });
}

/**
 *
 * @param {*} list 盒子类名
 * @param {*} from 从多小开始scale
 * @param {*} duration 持续时间 s
 * @param {*} ease 动画过渡 详情见 https://gsap.com/docs/v3/Eases/
 */
function gsapTransXScale(list, from = 0.5, duration = 0.8, ease = "power1.inOut") {
  gsap.registerPlugin(ScrollTrigger);
  list.map((v) => {
    gsap.fromTo(
      v,
      {
        scrollTrigger: v,
        scale: from,
        duration: 0,
      },
      {
        scrollTrigger: v,
        scale: 1,
        duration,
        ease,
      }
    );
  });
}

// 字体动画
function gsapTransFont(name) {
  gsap.to(name, {
    y: -10,
    stagger: 0.3,
  });
}

function gsapTransLyric(name, duration, reverse = false) {
  if (!reverse) {
    gsap.fromTo(
      name,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration,
      }
    );
  } else {
    gsap.fromTo(
      name,
      {
        opacity: 1,
      },
      {
        opacity: 0,
        duration,
      }
    );
  }
}

export { gsapTransX, gsapTransXScale, gsapTransY, gsapTransFont, gsapTransLyric };
