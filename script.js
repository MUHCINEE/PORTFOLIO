(function () {
  "use strict";

  var body = document.body;
  var burger = document.querySelector(".burger");
  var nav = document.getElementById("site-nav");
  var appear = Array.prototype.slice.call(document.querySelectorAll(".appear"));
  var photo = document.querySelector(".hero-photo");

  // 1. Each .appear adds .is-in on its own animationend
  appear.forEach(function (el) {
    el.addEventListener("animationend", function (e) {
      if (e.target === el) el.classList.add("is-in");
    }, { once: true });
  });

  // 2. Fallback: if animations never run, force the final state
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      var probe = appear[0];
      var ok = false;
      if (probe && typeof probe.getAnimations === "function") {
        ok = probe.getAnimations().some(function (a) {
          return a.playState === "running" || a.playState === "finished";
        });
      }
      if (!ok) {
        appear.forEach(function (el) { el.classList.add("is-in"); });
        if (photo) photo.classList.add("is-in");
      }
    });
  });

  // 3–5. Menu
  function setMenu(open) {
    body.classList.toggle("menu-open", open);
    if (burger) {
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
  }

  if (burger) {
    burger.addEventListener("click", function () {
      setMenu(!body.classList.contains("menu-open"));
    });
  }
  if (nav) {
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });
  var mq = window.matchMedia("(min-width: 901px)");
  var onChange = function (e) { if (e.matches) setMenu(false); };
  if (mq.addEventListener) mq.addEventListener("change", onChange);
  else if (mq.addListener) mq.addListener(onChange);
})();