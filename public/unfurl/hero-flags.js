// The five flags in the home page's first view change with the day of the week: seven sets, one a day, chosen
// by the visitor's own clock. They are there to show what a day's five look like, and are not that day's
// questions. The page is written with Monday's set, which is what is seen with no script or a clock that fails.
// `?day=0` to `?day=6` shows another day's set (0 is Sunday), to look at one.
(() => {
  const SETS = [
    ["dk", "co", "ph", "tn", "pk"], // Sunday
    ["jp", "br", "se", "ke", "ie"], // Monday
    ["ch", "mx", "gr", "za", "no"], // Tuesday
    ["in", "es", "ua", "nz", "eg"], // Wednesday
    ["ar", "tr", "ca", "fi", "jm"], // Thursday
    ["au", "vn", "gh", "cl", "bd"], // Friday
    ["de", "fr", "gb", "pt", "th"], // Saturday
  ];
  const row = document.querySelector(".five");
  if (!row) return;
  let day = new Date().getDay();
  const asked = new URLSearchParams(location.search).get("day");
  if (asked !== null && /^[0-6]$/.test(asked)) day = Number(asked);
  const images = row.querySelectorAll("img");
  SETS[day].forEach((code, i) => {
    if (images[i]) images[i].src = images[i].src.replace(/flag-[a-z]+\.png/, `flag-${code}.png`);
  });
})();
