const urlTitre = backUrl+"project/id";

const idTitre = readCookie("id");

fetch(urlTitre + "?id=" + idTitre)
    .then(async function (res) {
        if (res.status === 200) {
            res.json().then(function (datas) {
                document.querySelector("#titre").innerHTML = datas[0]["Titre"];
            });
        } else
            await Swal.fire({
                icon: "error",
                text: res.statusText
            });
    }).catch(function (err) {
    console.log(err.message);
});
