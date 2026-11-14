// The Unfurl page's globe: the app's own, drawn the same way from the same outlines (`globe.json` is the
// app's `Globe.json`), so it is whole and sharp at any size. It rises over the foot of its band like a
// horizon and goes round a few countries in turn: it turns to one, picks it up as a tap picks one up in the
// app, shows its card, and after a while puts it down and turns to the next.
(() => {
  const canvas = document.querySelector(".globe-canvas");
  if (!canvas) return;
  const band = canvas.parentElement;
  const card = band.querySelector(".country-card");
  const root = document.documentElement;
  const source = new URL("globe.json", document.currentScript.src);

  /** The countries it goes round, written into the page so their names are in its language. */
  const stops = JSON.parse(card.dataset.stops);
  /** How far a picked country stands up, and the width of its white rim, as in the app. */
  const RISE = 3;
  const RIM = 1.8;
  /** A picked country stands this far below the globe's edge, in degrees round the globe, and this far to the
      right of the middle, so its card has room at its upper left. */
  const BELOW = 46;
  const ASIDE = { wide: 16, phone: 8 };
  /** The round, in milliseconds: turning to a country, picking it up, holding it, putting it down. */
  const TURN = 1500, LIFT = 380, HOLD = 3400, DROP = 260;

  // The app's colours: `GlobeColors` by day and at night. Land runs unmet, met, collected, mastered.
  const LOOKS = {
    light: {
      sea: "#A9D9F1", land: ["#FFFAEE", "#C6CAD2", "#3F9B72", "#E2B33C"],
      border: "rgba(28, 33, 45, 0.13)", grid: "rgba(255, 255, 255, 0.55)",
      glow: [169, 217, 241],
    },
    dark: {
      sea: "#234E6E", land: ["#4A5163", "#8A91A0", "#4FAE82", "#E2B33C"],
      border: "rgba(0, 0, 0, 0.35)", grid: "rgba(255, 255, 255, 0.14)",
      glow: [110, 193, 242],
    },
  };
  const rgba = ([r, g, b], a) => `rgba(${r}, ${g}, ${b}, ${a})`;
  const lookNow = () => LOOKS[root.dataset.theme === "dark" ? "dark" : "light"];

  const RAD = Math.PI / 180;
  const onSphere = (longitude, latitude) => {
    const l = longitude * RAD, p = latitude * RAD;
    return [Math.cos(p) * Math.cos(l), Math.cos(p) * Math.sin(l), Math.sin(p)];
  };
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  // A made-up album, the same on every visit: about a seventh mastered, over half collected, a quarter only
  // met. The countries on the round have the stage their cards say.
  const staged = Object.fromEntries(stops.map((stop) => [stop.code, stop.stage]));
  const stageOf = (code) => {
    if (code in staged) return staged[code];
    let hash = 5;
    for (const letter of code) hash = (hash * 131 + letter.charCodeAt(0)) % 997;
    const lot = hash % 100;
    return lot < 14 ? 3 : lot < 70 ? 2 : lot < 94 ? 1 : 0;
  };

  // The grid of the sphere, every thirty degrees, sampled along each line.
  const gridLines = [];
  for (let longitude = 0; longitude < 360; longitude += 30) {
    const line = [];
    for (let latitude = -85; latitude <= 85; latitude += 5) line.push(onSphere(longitude, latitude));
    gridLines.push(line);
  }
  for (let latitude = -60; latitude <= 60; latitude += 30) {
    const line = [];
    for (let longitude = 0; longitude <= 360; longitude += 5) line.push(onSphere(longitude, latitude));
    gridLines.push(line);
  }

  let countries = [];
  let byCode = {};
  let dots = [];

  /** Draws the globe turned to `view`, with `picked` lifted by `lift` (0 lying flat, 1 fully up). Returns
      the upper left of the picked country on the canvas, for its card. */
  const draw = (view, picked, lift) => {
    const look = lookNow();
    const isNight = look === LOOKS.dark;
    const width = band.clientWidth, height = band.clientHeight;
    const density = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== Math.round(width * density) || canvas.height !== Math.round(height * density)) {
      canvas.width = Math.round(width * density);
      canvas.height = Math.round(height * density);
    }
    const ctx = canvas.getContext("2d");
    ctx.setTransform(density, 0, 0, density, 0, 0);
    ctx.clearRect(0, 0, width, height);

    // The globe is far wider than the band shows, so its edge crosses the band as a long, shallow arc. It
    // stands `--head` below the band's top, which leaves the air over its edge room to show.
    const head = parseFloat(getComputedStyle(band).getPropertyValue("--head")) || Math.max(96, Math.min(200, width * 0.15));
    const radius = Math.min(980, Math.max(430, width * 0.72));
    const cx = width / 2, cy = head + radius;

    const latitude = view.latitude * RAD, longitude = view.longitude * RAD;
    const east = [-Math.sin(longitude), Math.cos(longitude), 0];
    const north = [-Math.sin(latitude) * Math.cos(longitude), -Math.sin(latitude) * Math.sin(longitude), Math.cos(latitude)];
    const out = [Math.cos(latitude) * Math.cos(longitude), Math.cos(latitude) * Math.sin(longitude), Math.sin(latitude)];
    const disc = () => { ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); };

    // Adds one outline as seen from this side. A point round the back is pulled to the globe's edge, so an
    // outline that straddles the edge closes along it; one wholly round the back is left out.
    const trace = (points, rise = 0) => {
      if (!points.some((point) => dot(point, out) > 0)) return false;
      let isFirst = true;
      for (const point of points) {
        let x = dot(point, east), y = dot(point, north);
        if (dot(point, out) < 0) {
          const reach = Math.hypot(x, y);
          if (reach < 1e-6) continue;
          x /= reach; y /= reach;
        }
        if (isFirst) ctx.moveTo(cx + radius * x, cy - radius * y - rise);
        else ctx.lineTo(cx + radius * x, cy - radius * y - rise);
        isFirst = false;
      }
      ctx.closePath();
      return true;
    };

    // The air around the globe: at night a band hugging the edge inside a wider, fainter glow, and by day a
    // faint haze of the sea's colour. Both are much dimmer than in the app, where nothing is set above the
    // globe: here the words stand in this light. It reaches no further than `--head`, so it ends inside the band.
    const haze = radius * (isNight ? 1.2 : 1.1);
    const air = ctx.createRadialGradient(cx, cy, radius, cx, cy, haze);
    if (isNight) {
      air.addColorStop(0, rgba(look.glow, 0.17));
      air.addColorStop(0.16, rgba(look.glow, 0.065));
      air.addColorStop(0.5, rgba(look.glow, 0.02));
      air.addColorStop(1, rgba(look.glow, 0));
    } else {
      air.addColorStop(0, rgba(look.glow, 0.3));
      air.addColorStop(1, rgba(look.glow, 0));
    }
    ctx.fillStyle = air;
    ctx.beginPath(); ctx.arc(cx, cy, haze, 0, Math.PI * 2); ctx.fill();

    disc(); ctx.fillStyle = look.sea; ctx.fill();
    ctx.save();
    disc(); ctx.clip();

    ctx.strokeStyle = look.grid; ctx.lineWidth = 0.6;
    ctx.beginPath();
    for (const line of gridLines) {
      let isDown = false;
      for (const point of line) {
        if (dot(point, out) <= 0) { isDown = false; continue; }
        const x = cx + radius * dot(point, east), y = cy - radius * dot(point, north);
        if (isDown) ctx.lineTo(x, y); else ctx.moveTo(x, y);
        isDown = true;
      }
    }
    ctx.stroke();

    // The land, country by country. As one country is picked up the rest stand back, as in the app.
    const others = 1 - 0.45 * lift;
    const chosen = picked ? byCode[picked] : null;
    ctx.lineJoin = "round";
    for (const country of countries) {
      if (country === chosen) continue;
      ctx.beginPath();
      let isSeen = false;
      for (const ring of country.rings) isSeen = trace(ring) || isSeen;
      if (!isSeen) continue;
      ctx.globalAlpha = others; ctx.fillStyle = look.land[country.stage]; ctx.fill();
      ctx.globalAlpha = 1; ctx.strokeStyle = look.border; ctx.lineWidth = 0.6; ctx.stroke();
    }
    // The smallest states, each a dot.
    for (const state of dots) {
      if (dot(state.point, out) <= 0.05) continue;
      ctx.beginPath();
      ctx.arc(cx + radius * dot(state.point, east), cy - radius * dot(state.point, north), 2.6, 0, Math.PI * 2);
      ctx.globalAlpha = others; ctx.fillStyle = look.land[state.stage]; ctx.fill();
      ctx.globalAlpha = 1;
    }

    // The country picked is lifted as a flag tile is: its own colour with a white rim, raised a little from
    // where it lay, which stays under it, darker, as its thickness.
    let corner = null;
    if (chosen) {
      const colour = look.land[chosen.stage];
      ctx.beginPath(); for (const ring of chosen.rings) trace(ring);
      ctx.fillStyle = colour; ctx.fill();
      ctx.fillStyle = `rgba(0, 0, 0, ${0.42 * lift})`; ctx.fill();
      ctx.strokeStyle = look.border; ctx.lineWidth = 0.6; ctx.stroke();
      ctx.beginPath(); for (const ring of chosen.rings) trace(ring, RISE * lift);
      ctx.fillStyle = colour; ctx.fill();
      ctx.save(); ctx.clip();
      ctx.strokeStyle = `rgba(255, 255, 255, ${lift})`; ctx.lineWidth = RIM * 2; ctx.stroke();
      ctx.restore();

      let left = Infinity, top = Infinity;
      for (const point of chosen.rings[0]) {
        if (dot(point, out) <= 0) continue;
        left = Math.min(left, cx + radius * dot(point, east));
        top = Math.min(top, cy - radius * dot(point, north));
      }
      corner = { left, top };
    }

    // The app shades the globe's far edge to round it. That is left out here: only the top of the globe is
    // on the page, all of it inside that shade, which read as a dark veil over the horizon. At night light
    // is still caught in the air at the edge.
    if (isNight) {
      // Kept to a thin rim. The app spreads it over the outer sixth of the globe, which here is the whole
      // upper part of the picture: with the fade at the foot it left a brighter band across the middle.
      const limb = ctx.createRadialGradient(cx, cy, radius * 0.97, cx, cy, radius);
      limb.addColorStop(0, rgba(look.glow, 0)); limb.addColorStop(1, rgba(look.glow, 0.24));
      ctx.fillStyle = limb; disc(); ctx.fill();
    }
    ctx.restore();
    disc();
    ctx.strokeStyle = isNight ? rgba(look.glow, 0.55) : "rgba(28, 33, 45, 0.14)";
    ctx.lineWidth = isNight ? 1.2 : 1;
    ctx.stroke();
    return corner;
  };

  /** Where the globe is turned to for a country to stand in its place. */
  const viewOf = (stop) => {
    const centre = byCode[stop.code].centre;
    const aside = band.clientWidth < 700 ? ASIDE.phone : ASIDE.wide;
    return { longitude: centre[0] - aside, latitude: Math.max(-80, Math.min(60, centre[1] - BELOW)) };
  };

  /** Fills the card for a country and stands it at the country's upper left, kept on the page. */
  const showCard = (stop, corner) => {
    const look = lookNow();
    const flag = card.querySelector("img");
    flag.src = flag.src.replace(/flag-[a-z]+\.png/, `flag-${stop.code.toLowerCase()}.png`);
    // A flag only met is grey, and a mastered one has a gold rim, as in the app.
    flag.style.filter = stop.stage === 1 ? "grayscale(1)" : "";
    card.querySelector(".tile").style.borderColor = stop.stage === 3 ? look.land[3] : "#fff";
    card.querySelector("strong").textContent = stop.name;
    card.querySelector("small").textContent = stop.label;
    card.querySelector("i").style.background = look.land[stop.stage];
    if (corner) {
      card.style.left = `${Math.max(card.offsetWidth + 12, corner.left + 18)}px`;
      card.style.top = `${corner.top - 6}px`;
    }
    card.classList.add("is-shown");
  };

  // The round. `view` is where the globe is turned now; `lift` is how far the country at `index` is up.
  let index = 0, view = null, lift = 1, phase = "hold";
  let from = null, to = null, since = 0, frame = 0, timer = 0;
  let isSeen = false;
  const wantsStill = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const render = () => draw(view, phase === "turn" ? null : stops[index].code, lift);

  const step = (now) => {
    const t = now - since;
    if (phase === "drop") {
      lift = 1 - Math.min(1, t / DROP);
      if (t >= DROP) {
        index = (index + 1) % stops.length;
        from = { ...view }; to = viewOf(stops[index]);
        // The short way round.
        to.longitude = from.longitude + ((to.longitude - from.longitude + 540) % 360 - 180);
        phase = "turn"; since = now; lift = 0;
      }
    } else if (phase === "turn") {
      const e = ease(Math.min(1, t / TURN));
      view = {
        longitude: from.longitude + (to.longitude - from.longitude) * e,
        latitude: from.latitude + (to.latitude - from.latitude) * e,
      };
      if (t >= TURN) { phase = "lift"; since = now; showCard(stops[index], draw(view, stops[index].code, 0)); }
    } else if (phase === "lift") {
      lift = ease(Math.min(1, t / LIFT));
      if (t >= LIFT) {
        phase = "hold"; lift = 1; render();
        timer = setTimeout(leave, HOLD);
        return;
      }
    }
    render();
    frame = requestAnimationFrame(step);
  };
  const leave = () => {
    if (!isSeen || wantsStill) return;
    card.classList.remove("is-shown");
    phase = "drop"; since = performance.now();
    frame = requestAnimationFrame(step);
  };
  /** Stops where it is; `rest` puts it back on the country it was on, held. */
  const rest = () => {
    cancelAnimationFrame(frame); clearTimeout(timer);
    phase = "hold"; lift = 1; view = viewOf(stops[index]);
    showCard(stops[index], render());
  };

  fetch(source).then((response) => response.json()).then((globe) => {
    const box = (ring) => {
      let left = 180, right = -180, foot = 90, top = -90;
      for (let i = 0; i < ring.length; i += 2) {
        left = Math.min(left, ring[i]); right = Math.max(right, ring[i]);
        foot = Math.min(foot, ring[i + 1]); top = Math.max(top, ring[i + 1]);
      }
      return { size: (right - left) * (top - foot), centre: [(left + right) / 2, (foot + top) / 2] };
    };
    countries = Object.entries(globe.countries).map(([code, rings]) => {
      // The largest outline first: it is the mainland, whose middle the globe turns to.
      const measured = rings.map((ring) => ({ ring, ...box(ring) })).sort((a, b) => b.size - a.size);
      return {
        code, stage: stageOf(code), size: measured[0].size, centre: measured[0].centre,
        rings: measured.map(({ ring }) => {
          const points = [];
          for (let i = 0; i < ring.length; i += 2) points.push(onSphere(ring[i], ring[i + 1]));
          return points;
        }),
      };
    // The largest country first, so one that lies inside another is drawn over it.
    }).sort((a, b) => b.size - a.size);
    byCode = Object.fromEntries(countries.map((country) => [country.code, country]));
    dots = Object.entries(globe.dots).map(([code, [longitude, latitude]]) => ({
      code, stage: stageOf(code), point: onSphere(longitude, latitude),
    }));

    rest();
    // Set again when the band changes size or the theme is switched; the round goes on from there.
    const again = () => { rest(); if (isSeen && !wantsStill) timer = setTimeout(leave, HOLD); };
    new ResizeObserver(again).observe(band);
    new MutationObserver(again).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    // It goes round only while it is on the screen.
    new IntersectionObserver(([entry]) => {
      isSeen = entry.isIntersecting;
      rest();
      if (isSeen && !wantsStill) timer = setTimeout(leave, HOLD);
    }, { threshold: 0.25 }).observe(band);
  }).catch(() => {});
})();
