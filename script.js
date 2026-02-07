const DEV_MODE = true;
const DEV_DATE = "2026-02-07"; // simulate Rose Day

const days = [
  { name: "Rose Day", date: "02-07", status: "active" },
  { name: "Propose Day", date: "02-08", status: "locked" },
  { name: "Chocolate Day", date: "02-09", status: "locked" },
  { name: "Teddy Day", date: "02-10", status: "locked" },
  { name: "Promise Day", date: "02-11", status: "locked" },
  { name: "Hug Day", date: "02-12", status: "locked" },
  { name: "Flirting Day", date: "02-18", status: "locked" },
  { name: "Confession Day", date: "02-19", status: "locked" },
  { name: "Missing Day", date: "02-20", status: "locked" }
];

const container = document.getElementById("checkpoints");

days.forEach(day => {
  const card = document.createElement("div");
  card.className = `day-card ${day.status}`;

  const title = document.createElement("div");
  title.className = "day-title";
  title.innerText = day.name;

  const message = document.createElement("div");
  message.className = "lock-message";
  message.innerText =
    "Some things are meant to arrive at their own time. This one is waiting for its day.";

  card.appendChild(title);
  card.appendChild(message);

  card.addEventListener("click", () => {
    if (day.status === "locked") {
      card.classList.toggle("show-message");
    }

    if (day.status === "active") {
      openRoseDay();
    }
  });

  container.appendChild(card);
});

function openRoseDay() {
  const app = document.getElementById("app");

  // Fade out previous content
  app.style.transition = "opacity 0.5s ease";
  app.style.opacity = 0;

  setTimeout(() => {
    // Clear previous content
    app.innerHTML = `
      <div class="rose-letter-container">
        <div class="rose-letter">
          <h2>🌹 Rose Day</h2>
          <p>Somewhere between ordinary conversations<br>
          and the quiet comfort of knowing you’re there,<br>
          I realized some things feel different — quietly, gently.</p>

          <p>This isn’t a promise, nor a declaration.<br>
          It’s just a rose —<br>
          given softly, without hurry, without expectation.</p>

          <p>Patience has its own beauty,<br>
          and some moments deserve to wait their perfect time.</p>

          <p class="signature">— From someone who cares</p>
        </div>
      </div>
    `;

    app.style.opacity = 1;

    // Remove old style if exists
    const oldStyle = document.getElementById("roseDayStyle");
    if (oldStyle) oldStyle.remove();

    // Add dynamic styles
    const style = document.createElement("style");
    style.id = "roseDayStyle";
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&display=swap');

      body {
        margin: 0;
        font-family: 'Dancing Script', cursive;
        background: #fff2ed; /* page background */
      }

      .rose-letter-container {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30px;
      }

      /* Letter box with definite gradient & contrast */
      .rose-letter-container .rose-letter {
        background: linear-gradient(135deg, #fce0d4 0%, #f8cbb1 50%, #f5b28e 100%);
        border: 1px solid #e0a47a;
        padding: 35px 40px;
        max-width: 500px;
        line-height: 1.7;
        color: #4b3a2b;
        position: relative;
        border-radius: 15px;
        clip-path: polygon(
          5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%
        );
        overflow: hidden;
        opacity: 0;
        transform: scale(0.8);
        box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        font-size: 18px;
      }

      /* Flames */
      .rose-letter-container .rose-letter::before {
        content: '';
        position: absolute;
        top: -30px; left: -30px; right: -30px; bottom: -30px;
        background: radial-gradient(circle at top, #ffb3b3, #ff4d4d, transparent);
        z-index: -1;
        opacity: 0;
        filter: blur(20px);
        animation: burnFlame 2s forwards;
      }

      .rose-letter h2 {
        margin-bottom: 15px;
        font-weight: normal;
      }

      .rose-letter .signature {
        margin-top: 25px;
        font-size: 16px;
        text-align: right;
        color: #6b4e3a;
      }

      @keyframes burnLetter {
        0% { opacity: 0; transform: scale(0.5); }
        60% { opacity: 1; transform: scale(1.1); }
        100% { opacity: 1; transform: scale(1); }
      }

      @keyframes burnFlame {
        0% { opacity: 1; transform: scale(0.5) rotate(-5deg); }
        40% { opacity: 0.9; transform: scale(1.05) rotate(3deg); }
        70% { opacity: 0.6; transform: scale(1) rotate(0deg); }
        100% { opacity: 0; transform: scale(1) rotate(0deg); }
      }
    `;
    document.head.appendChild(style);

    // Trigger letter animation
    const letter = document.querySelector(".rose-letter");
    letter.style.animation = "burnLetter 2s forwards";

  }, 500);
}
