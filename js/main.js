// Builds the page from js/data.js. Each block below fills one section.
const $ = (id) => document.getElementById(id);
const li = (t) => `<li>${t}</li>`;

$("interests").innerHTML = interests.map(li).join("");
$("learning").innerHTML = learning.map(li).join("");

$("timeline").innerHTML = education.map(e => `
  <article class="card step ${e.current ? "current" : ""}">
    <h3>${e.year}${e.current ? '<span class="now">Currently Studying</span>' : ""}</h3>
    <p>Bachelor of Science in Information Technology (BSIT)</p>
    <ul>${e.focus.map(li).join("")}</ul>
  </article>`).join("");

$("skillGrid").innerHTML = Object.entries(skills).map(([cat, items]) => `
  <div class="card"><h3>${cat}</h3>
  ${items.map(([n, l]) => `<div class="skill"><span>${n}</span><span>${l}</span></div>`).join("")}</div>`).join("");

$("projectGrid").innerHTML = projects.map(p => `
  <article class="card">
    <span class="tag">${p.category}</span>
    <h3>${p.name}</h3>
    <p>${p.desc}</p>
    <p class="tech">${p.tech}</p>
    ${p.github ? `<a class="btn small" href="${p.github}" target="_blank" rel="noopener">GitHub</a>` : ""}
    ${p.demo ? `<a class="btn small primary" href="${p.demo}" target="_blank" rel="noopener">Live Demo</a>` : ""}
  </article>`).join("");

$("labGrid").innerHTML = labs.map(([t, d]) => `<div class="card"><h3>${t}</h3><p>${d}</p></div>`).join("");

// Mobile menu
const menuBtn = $("menuBtn"), navLinks = $("navLinks");
menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
navLinks.addEventListener("click", () => { navLinks.classList.remove("open"); menuBtn.setAttribute("aria-expanded", false); });

// Contact form. Nothing is sent until contactConfig.endpoint is set in data.js.
$("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const status = $("formStatus"), form = e.target;
  if (!form.checkValidity()) { status.textContent = "Please fill in your name, a valid email, and a message."; return; }
  if (!contactConfig.endpoint) { status.textContent = "The form isn't connected yet. Please email me directly."; return; }
  try {
    const res = await fetch(contactConfig.endpoint, {
      method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    });
    if (!res.ok) throw new Error();
    status.textContent = "Message sent. Thank you!"; form.reset();
  } catch { status.textContent = "Message failed to send. Please try again or email me."; }
});