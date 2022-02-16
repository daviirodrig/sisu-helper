//let mainUrl = "https://sisu-api-pcr.apps.mec.gov.br/api/v1/oferta/$no_oferta/modalidades"

console.log("SiSU Helper started");
const run = () => {
  let cardsCursos = window.document.querySelectorAll(".card-vaga");

  console.log("peguei cards");

  let texts = {
    0: "Ampla",
    1: "Renda",
    2: "PPI Renda",
    5: "EM Pública",
    6: "PPI",
    9: "Def Renda",
    10: "PPI Def Renda",
    13: "Def EM Pública",
    14: "PPI Def",
  };

  cardsCursos.forEach((v) => {
    let ofertaId = v.href.match(/(\d.*)(#)/)[1];
    let url = `https://sisu-api-pcr.apps.mec.gov.br/api/v1/oferta/${ofertaId}/modalidades`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        data.modalidades.forEach((jsonData) => {
          let notaCorte = jsonData.nu_nota_corte;
          if (notaCorte != ".00") {
            let notaText = texts[jsonData.co_concorrencia];
            let insertHtml = `<span style="padding-top: 1px" class="ies"> ${notaText}: ${notaCorte}</span>`;
            //v.querySelector(".item-footer").remove();
            v.querySelector(".periodo").insertAdjacentHTML(
              "afterend",
              insertHtml
            );
          }
        });
      })
      .catch(console.error);
    let nVagas = v.querySelector(
      ".item-footer > span.nota > strong"
    ).textContent;
    v.insertAdjacentHTML(
      "beforeend",
      `<span style="padding-top: 1px" class="ies"> Total VAGAS: ${nVagas}</span>`
    );
    v.querySelector(".item-footer").remove();
  });
};
setTimeout(() => {
  document
    .querySelector(".open-filtro.pull-right")
    .insertAdjacentHTML("afterend", `<button id="butao">Run</button>`);
  document.querySelector("#butao").addEventListener("click", () => run());

  run();
}, 3000);
