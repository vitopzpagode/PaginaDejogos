// script.js

console.log(
  "🎮 Neon Games carregado com sucesso!"
);

const cards =
document.querySelectorAll(".card");

cards.forEach(card=>{

  card.addEventListener(
    "mousemove",
    e=>{

      const rect =
      card.getBoundingClientRect();

      const x =
      e.clientX - rect.left;

      const y =
      e.clientY - rect.top;

      card.style.background =
      `
      radial-gradient(
        circle at ${x}px ${y}px,
        rgba(0,255,255,0.18),
        rgba(15,23,42,0.75)
      )
      `;

    }
  );

  card.addEventListener(
    "mouseleave",
    ()=>{

      card.style.background =
      "rgba(15,23,42,0.65)";

    }
  );

});