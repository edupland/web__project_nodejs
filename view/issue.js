const url = backUrl+"issue?id=";

const id = readCookie("id");

fetch(url + id)
    .then(async function (res) {
        if (res.status === 200) {
            res.json().then(function (datas) {
                datas.forEach(elem => {
                    let br1 = document.createElement("br");
                    let br2 = document.createElement("br");
                    let br3 = document.createElement("br");

                    let row = document.createElement("div");
                    row.setAttribute("class", "row");

                    let col8 = document.createElement("div");
                    col8.setAttribute("class", "col-sm-8");

                    let role = document.createElement("b");
                    role.innerHTML = "En tant que ";

                    let action = document.createElement("b");
                    action.innerHTML = "Je souhaite ";

                    let raison = document.createElement("b");
                    raison.innerHTML = "Afin de ";

                    col8.append(role, elem["Role"], br1, action, elem["Action"], br2, raison, elem["Raison"]);

                    let col4 = document.createElement("div");
                    col4.setAttribute("class", "col-sm-4");

                    let del = document.createElement("a");
                    del.setAttribute("type", "button");
                    del.setAttribute("class", "btn btn-danger");
                    del.innerHTML = "Supprimer";

                    let edit = document.createElement("a");
                    edit.setAttribute("type", "button");
                    edit.setAttribute("class", "btn btn-primary");
                    edit.innerHTML = "Éditer";

                    col4.append(del, edit);

                    row.append(col8, col4);

                    document.querySelector("#issues").append(br3, row);

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
