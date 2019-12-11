const url = backUrl+"task?id=";

const id = readCookie("id");

function setColor(elem, status){
    switch(status){
        case "todo":
            elem.style.color = "#ff0000";
            break;
        case "done":
            elem.style.color = "#00ff00";
            break;
        default:
            elem.style.color = "#000000";
            break;
    }
}

fetch(url + id)
    .then(async function (res) {
        if (res.status === 200) {
            res.json().then(function (datas) {
                datas.forEach(elem => {
                    let br1 = document.createElement("br");
                    let br2 = document.createElement("br");

                    let titre = document.createElement("b");
                    titre.innerHTML = elem["Titre"];

                    let row = document.createElement("div");
                    row.setAttribute("class", "row");

                    let col41 = document.createElement("div");
                    col41.setAttribute("class", "col-sm-4");
                    col41.innerHTML = elem["Description"];

                    let col42 = document.createElement("div");
                    col42.setAttribute("class", "col-sm-4");

                    let col43 = document.createElement("div");
                    col43.setAttribute("class", "col-sm-4");

                    let status = document.createElement("b");
                    status.innerHTML = elem["Statut"].toUpperCase();
                    setColor(status, elem["Statut"]);

                    let del = document.createElement("a");
                    del.setAttribute("type", "button");
                    del.setAttribute("class", "btn btn-danger");
                    del.innerHTML = "Supprimer";

                    let edit = document.createElement("a");
                    edit.setAttribute("type", "button");
                    edit.setAttribute("class", "btn btn-primary");
                    edit.innerHTML = "Éditer";

                    col42.append(status);
                    col43.append(del, edit);
                    row.append(col41, col42, col43);

                    document.querySelector("#tasks").append(br1, titre, br2, row);

                    elem["Projet"]["Clients"].forEach(client => {
                        if(client.Login === readCookie("login")) {
                            document.querySelector("#create").remove();
                            del.remove();
                            edit.remove();
                        }
                    });
                });
            });
        } else
            await Swal.fire({
                icon: "error",
                text: res.statusText
            });
    }).catch(function (err) {
    console.log(err.message);
});
