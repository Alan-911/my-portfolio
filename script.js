/* ============================================================
   Yves Alain Iragena — portfolio
   Vanilla JS. No dependencies.

   Note on the reveal animation: the previous build set
   opacity:0 inline on every section and relied on a single
   IntersectionObserver to put it back. Any jump-scroll — a nav
   click, a #hash landing, a fast flick on a trackpad — skipped
   the observer and left whole sections permanently invisible.
   This version (a) only ever hides small elements, (b) reveals
   anything already on screen immediately, and (c) runs a
   failsafe that un-hides everything, so a stuck element is
   not possible.
   ============================================================ */

(function () {
    'use strict';

    var root = document.documentElement;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Only opt into the hidden starting state if JS is alive. */
    if (!reduceMotion) root.classList.add('js');

    function ready(fn) {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    }

    ready(function () {

        /* ---------- footer year ---------- */

        var year = document.getElementById('year');
        if (year) year.textContent = new Date().getFullYear();

        /* ---------- reveal on scroll ---------- */

        var revealables = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

        function show(el) { el.classList.add('is-in'); }
        function showAll() { revealables.forEach(show); }

        if (reduceMotion || !('IntersectionObserver' in window)) {
            showAll();
        } else {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    show(entry.target);
                    observer.unobserve(entry.target);
                });
            }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });

            revealables.forEach(function (el) {
                /* Anything already in or above the viewport shows straight away —
                   this is what makes deep links and jump-scrolls safe. */
                if (el.getBoundingClientRect().top < window.innerHeight) show(el);
                else observer.observe(el);
            });

            /* Failsafe: whatever happens, nothing stays hidden. */
            window.addEventListener('load', function () {
                setTimeout(showAll, 2500);
            });
        }

        /* Reveal a target's contents the instant it is jumped to. */
        function revealWithin(target) {
            if (!target) return;
            if (target.classList.contains('reveal')) show(target);
            Array.prototype.forEach.call(target.querySelectorAll('.reveal'), show);
        }

        window.addEventListener('hashchange', function () {
            revealWithin(document.querySelector(location.hash || '#none'));
        });

        if (location.hash) {
            try { revealWithin(document.querySelector(location.hash)); } catch (e) {}
        }

        /* ---------- navigation ---------- */

        var nav = document.getElementById('nav');
        var navLinks = document.getElementById('nav-links');
        var navToggle = document.getElementById('nav-toggle');
        var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));

        function closeMenu() {
            if (!navLinks) return;
            navLinks.classList.remove('is-open');
            if (navToggle) {
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.setAttribute('aria-label', 'Open menu');
            }
        }

        if (navToggle && navLinks) {
            navToggle.addEventListener('click', function () {
                var open = navLinks.classList.toggle('is-open');
                navToggle.setAttribute('aria-expanded', String(open));
                navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
            });
        }

        links.forEach(function (link) {
            link.addEventListener('click', function (e) {
                var id = link.getAttribute('href');
                if (!id || id === '#') return;

                var target = document.querySelector(id);
                if (!target) return;

                e.preventDefault();
                closeMenu();
                revealWithin(target);

                target.scrollIntoView({
                    behavior: reduceMotion ? 'auto' : 'smooth',
                    block: 'start'
                });

                /* Keep the URL shareable without triggering a second jump. */
                if (history.replaceState) history.replaceState(null, '', id);
            });
        });

        document.addEventListener('click', function (e) {
            if (!navLinks || !navLinks.classList.contains('is-open')) return;
            if (navLinks.contains(e.target) || (navToggle && navToggle.contains(e.target))) return;
            closeMenu();
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeMenu();
        });

        /* Shadow under the bar once the page has moved. */
        function onScroll() {
            if (nav) nav.classList.toggle('is-stuck', window.scrollY > 8);
        }
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        /* ---------- active section in the nav ---------- */

        var sections = links
            .map(function (l) { return document.querySelector(l.getAttribute('href')); })
            .filter(Boolean);

        if (sections.length && 'IntersectionObserver' in window) {
            var visible = new Map();

            var spy = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    visible.set(entry.target.id, entry.intersectionRatio);
                });

                var bestId = null;
                var bestRatio = 0;
                visible.forEach(function (ratio, id) {
                    if (ratio > bestRatio) { bestRatio = ratio; bestId = id; }
                });

                links.forEach(function (l) {
                    l.classList.toggle('is-active', bestId !== null && l.getAttribute('href') === '#' + bestId);
                });
            }, {
                /* A spread of thresholds so sections taller than the
                   viewport still report progress — the old single
                   threshold:0.5 never fired for them. */
                threshold: [0, 0.05, 0.15, 0.3, 0.5, 0.75, 1],
                rootMargin: '-72px 0px -45% 0px'
            });

            sections.forEach(function (s) { spy.observe(s); });
        }

        /* ---------- project filters ---------- */

        var chips = Array.prototype.slice.call(document.querySelectorAll('.chip[data-filter]'));
        var cards = Array.prototype.slice.call(document.querySelectorAll('.card[data-cat]'));
        var grid = document.getElementById('projects');

        if (chips.length && cards.length) {
            var empty = document.createElement('p');
            empty.className = 'projects-empty';
            empty.textContent = 'Nothing in that category yet.';
            empty.hidden = true;
            if (grid) grid.appendChild(empty);

            chips.forEach(function (chip) {
                chip.addEventListener('click', function () {
                    var filter = chip.getAttribute('data-filter');

                    chips.forEach(function (c) { c.classList.toggle('is-active', c === chip); });

                    var shown = 0;
                    cards.forEach(function (card) {
                        var match = filter === 'all' || card.getAttribute('data-cat') === filter;
                        card.hidden = !match;
                        if (match) { shown++; show(card); }
                    });

                    empty.hidden = shown !== 0;
                });
            });
        }
    });
})();
