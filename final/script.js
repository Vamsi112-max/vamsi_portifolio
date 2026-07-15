// ============================================================
// Portfolio interactions — no framework, vanilla JS only
// ============================================================
(function () {
  "use strict";

  var menuBtn   = document.querySelector("[data-menu-toggle]");
  var sidebar   = document.querySelector("[data-sidebar]");
  var scrim     = document.querySelector("[data-scrim]");
  var navLinks  = document.querySelectorAll("[data-nav-link]");
  var sessionEl = document.querySelector("[data-session-path]");
  var sections  = document.querySelectorAll("section[id]");

  function openDrawer() {
    if (!sidebar) return;
    sidebar.classList.add("open");
    scrim.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeDrawer() {
    if (!sidebar) return;
    sidebar.classList.remove("open");
    scrim.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (menuBtn) menuBtn.addEventListener("click", function () {
    sidebar.classList.contains("open") ? closeDrawer() : openDrawer();
  });
  if (scrim) scrim.addEventListener("click", closeDrawer);
  navLinks.forEach(function (link) {
    link.addEventListener("click", closeDrawer);
  });

  // ---- active-section tracking + terminal "you are here" readout ----
  if (sections.length && navLinks.length) {
    var byId = {};
    navLinks.forEach(function (l) {
      var id = l.getAttribute("href").replace("#", "");
      byId[id] = l;
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.id;
          navLinks.forEach(function (l) { l.classList.remove("active"); });
          if (byId[id]) byId[id].classList.add("active");
          if (sessionEl) {
            sessionEl.textContent = "~/" + id;
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { observer.observe(s); });
  }

  // ---- scroll reveal ----
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  // ---- project card cursor-glow ----
  var cards = document.querySelectorAll(".project-card");
  cards.forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      var rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", ((e.clientX - rect.left) / rect.width) * 100 + "%");
      card.style.setProperty("--my", ((e.clientY - rect.top) / rect.height) * 100 + "%");
    });
  });

  // ---- animated stat counters ----
  var counters = document.querySelectorAll("[data-count-to]");
  if (counters.length) {
    var countObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var target = parseFloat(el.getAttribute("data-count-to"));
          var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
          var duration = 1100;
          var start = null;
          function step(ts) {
            if (start === null) start = ts;
            var progress = Math.min((ts - start) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = (target * eased).toFixed(decimals);
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target.toFixed(decimals);
          }
          requestAnimationFrame(step);
          countObserver.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach(function (el) { countObserver.observe(el); });
  }

  // ---- footer year ----
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
