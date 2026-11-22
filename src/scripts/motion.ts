// Page motion: scroll reveals + active-section nav indicator.
// Pairs with src/styles/motion.css. All tuning values live in tokens.css.

const root = document.documentElement;

// Tell the head failsafe this script arrived (see Base.astro).
root.classList.add("motion");

/* — scroll reveal — */

function initReveal(): void {
  const items = document.querySelectorAll<HTMLElement>("[data-reveal]");

  // No hidden state was applied, or no observer support: show everything.
  if (!root.classList.contains("js") || !("IntersectionObserver" in window)) {
    for (const el of items) el.classList.add("is-revealed");
    return;
  }

  // Park a hidden element on the side it will enter from. While it's
  // hidden the move is invisible, so skip the transition for it.
  const setSide = (el: HTMLElement, side: "above" | "below") => {
    if (el.dataset.revealFrom === side) return;
    const hidden = !el.classList.contains("is-revealed");
    if (hidden) el.style.transition = "none";
    el.dataset.revealFrom = side;
    if (hidden) {
      void el.offsetWidth; // commit the jump before transitions resume
      el.style.transition = "";
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      // Items entering in the same frame stagger against each other.
      let batch = 0;
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        // top < 0: the element is (entering from / leaving through) the top
        setSide(el, entry.boundingClientRect.top < 0 ? "above" : "below");
        if (entry.isIntersecting) {
          if (el.classList.contains("is-revealed")) continue;
          el.style.setProperty("--i", String(batch++));
          el.classList.add("is-revealed");
        } else {
          el.classList.remove("is-revealed");
        }
      }
    },
    // Fire once an element's top passes 85% of the viewport height. A
    // ratio threshold (0.15 of the element) never fires for elements
    // much taller than the screen, e.g. the About prose on narrow layouts.
    { rootMargin: "0px 0px -15% 0px", threshold: 0 },
  );

  for (const el of items) observer.observe(el);
}

/* — active-section nav indicator — */

function initNav(): void {
  const links = Array.from(
    document.querySelectorAll<HTMLAnchorElement>(
      '.spine__nav a[href^="#"], .m-header__nav a[href^="#"]',
    ),
  );
  const sections = [...new Set(links.map((a) => a.hash.slice(1)))]
    .map((id) => document.getElementById(id))
    .filter((s): s is HTMLElement => s !== null)
    .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
  if (sections.length === 0) return;

  let current = "";
  const setCurrent = (id: string) => {
    if (id === current) return;
    current = id;
    for (const a of links) {
      if (a.hash === `#${id}`) a.setAttribute("aria-current", "location");
      else a.removeAttribute("aria-current");
    }
  };

  // current = last section whose top has passed 35% of the viewport;
  // at the very bottom of the page the last section always wins
  // (it is too short to ever reach the 35% line on its own).
  const sectionInView = (): string => {
    const atBottom = window.innerHeight + window.scrollY >= root.scrollHeight - 4;
    if (atBottom) return sections[sections.length - 1].id;
    const line = window.innerHeight * 0.35;
    let id = "";
    for (const s of sections) {
      if (s.getBoundingClientRect().top <= line) id = s.id;
    }
    return id;
  };

  // After a nav click, hold the indicator on the target until the smooth
  // scroll settles, so it doesn't flicker through the sections in between.
  let locked = false;
  let idleTimer = 0;
  const release = () => {
    window.clearTimeout(idleTimer);
    locked = false;
    setCurrent(sectionInView());
  };
  const releaseWhenIdle = (ms: number) => {
    window.clearTimeout(idleTimer);
    idleTimer = window.setTimeout(release, ms);
  };

  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (locked) {
        releaseWhenIdle(150);
        return;
      }
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        if (!locked) setCurrent(sectionInView());
      });
    },
    { passive: true },
  );
  window.addEventListener("scrollend", () => {
    if (locked) release();
  });
  window.addEventListener("resize", () => {
    if (!locked) setCurrent(sectionInView());
  });

  for (const a of links) {
    a.addEventListener("click", () => {
      locked = true;
      setCurrent(a.hash.slice(1));
      releaseWhenIdle(400); // covers clicks that cause no scroll at all
    });
  }

  setCurrent(sectionInView());
}

initReveal();
initNav();
