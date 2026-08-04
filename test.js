const MESSAGE = "Hello, World!";

// スキル（名前, 習熟度 0-100）
const SKILLS = [
  { name: "HTML / CSS",  level: 70 },
  { name: "JavaScript",  level: 80 },
  { name: "Python",      level: 80 },
  { name: "C / C++",     level: 50 }
];

// 作品（タイトル, 説明, タグ, リンク）
const WORKS = [
  {
    title: "ヽ(ﾟ∀｡)ﾉｳｪbot",
    desc:  "discordのbot.ヽ(ﾟ∀｡)ﾉｳｪと言った回数をカウントして統計とかいろいろ取ってくれるやつ. renderで作成.",
    tags:  ["JavaScript", "API", "Discord"],
    url:   "https://we-bot-yo1t.onrender.com/"
  }
];

/* ========== 以下は基本的に編集不要 ========== */
document.addEventListener("DOMContentLoaded", () => {

  // --- タイピング演出 ---
  const typing = document.getElementById("typing");
  if (typing) {
    let i = 0;
    (function type() {
      if (i <= MESSAGE.length) {
        typing.textContent = MESSAGE.slice(0, i++);
        setTimeout(type, 70);
      }
    })();
  }

  // --- スキル描画 ---
  const skillList = document.getElementById("skill-list");
  if (skillList) {
    skillList.innerHTML = SKILLS.map(s => `
      <li>
        <span class="skill-name">${s.name}</span>
        <span class="bar"><span data-level="${s.level}"></span></span>
        <span class="skill-val">${s.level}%</span>
      </li>`).join("");

    // 画面に入ったらバーを伸ばす
    const bars = skillList.querySelectorAll(".bar > span");
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.width = e.target.dataset.level + "%";
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    bars.forEach(b => io.observe(b));
  }

  // --- 作品描画 ---
  const workList = document.getElementById("work-list");
  if (workList) {
    workList.innerHTML = WORKS.map(w => `
      <article class="card">
        <h3><a href="${w.url}" target="_blank" rel="noopener">${w.title}</a></h3>
        <p>${w.desc}</p>
        <div class="tags">${w.tags.map(t => `<span class="tag">#${t}</span>`).join("")}</div>
      </article>`).join("");
  }

  // --- ハンバーガーメニュー ---
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", e => {
      if (e.target.tagName === "A") nav.classList.remove("open");
    });
  }

  // --- 現在地のナビをハイライト ---
  const links = [...document.querySelectorAll('.nav a[href^="#"]')];
  const targets = links.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(a => a.classList.toggle("active",
          a.getAttribute("href") === "#" + e.target.id));
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  targets.forEach(t => spy.observe(t));

  // --- 西暦を自動更新 ---
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
