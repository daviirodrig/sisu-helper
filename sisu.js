//let mainUrl = "https://sisu-api-pcr.apps.mec.gov.br/api/v1/oferta/$no_oferta/modalidades"

console.log("SiSU Helper started");
setTimeout(function () {
  let cardsCursos = window.document.querySelectorAll(".card-vaga");

  console.log("peguei cards");

  cardsCursos.forEach((v) => {
    let ofertaId = v.href.match(/(\d.*)(#)/)[1];
    let url = `https://sisu-api-pcr.apps.mec.gov.br/api/v1/oferta/${ofertaId}/modalidades`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let jsonRenda = data.modalidades.filter(
          (i) => i.co_concorrencia == "1"
        )[0];
        let notaRenda = jsonRenda.nu_nota_corte;
        let insertHtmlRenda = `<span style="padding-top: 1px" class="ies"> Nota renda: ${notaRenda}</span>`;
        v.querySelector(".periodo").insertAdjacentHTML(
          "afterend",
          insertHtmlRenda
        );
        let jsonAmpla = data.modalidades.filter(
          (i) => i.co_concorrencia == "0"
        )[0];
        let notaAmpla = jsonAmpla.nu_nota_corte;
        let insertHtmlAmpla = `<span style="padding-top: 1px" class="ies"> Nota Ampla: ${notaAmpla}</span>`;
        v.querySelector(".periodo").insertAdjacentHTML(
          "afterend",
          insertHtmlAmpla
        );
      })
      .catch(console.error);
  });
}, 3500);
