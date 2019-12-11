const url = backUrl+"project/";

const login = readCookie("login");

let cpt = 0;
let data = [];

//Owned projects
fetch(url + "proprietaire?login=" + login)
    .then(async function (res) {
        if (res.status === 200) {
            res.json().then(function (datas) {
                data = data.concat(datas);
                datas.forEach(item => {
                    let titre = document.createElement("a");
                    titre.setAttribute("type", "button");
                    titre.setAttribute("id", "titre_"+cpt);
                    titre.setAttribute("class", "btn btn-link");
                    titre.innerHTML = item["Titre"];

                    let deleteButton = document.createElement("a");
                    deleteButton.setAttribute("type", "button");
                    deleteButton.setAttribute("id", "delete_"+cpt);
                    deleteButton.setAttribute("class", "btn btn-danger");
                    deleteButton.innerHTML = "Supprimer";

                    let editButton = document.createElement("a");
                    editButton.setAttribute("type", "button");
                    editButton.setAttribute("id", "edit_"+cpt);
                    editButton.setAttribute("class", "btn btn-primary");
                    editButton.innerHTML = "Éditer";

                    let manageButton = document.createElement("a");
                    manageButton.setAttribute("type", "button");
                    manageButton.setAttribute("id", "manage_"+cpt);
                    manageButton.setAttribute("class", "btn btn-info");
                    manageButton.innerHTML = "Gérer";

                    document.addEventListener("click", function(e){
                        if(e.target && e.target.id.split("_")[0].localeCompare("delete")===0) {
                            const index = parseInt(e.target.id.split("_")[1], 10);
                            const id = data[index]["_id"];
                            document.cookie = "id=" + id + "; path=./*";
                            document.location.href = "deleteproject.html";
                        }
                        else if(e.target && e.target.id.split("_")[0].localeCompare("edit")===0) {
                            const index = parseInt(e.target.id.split("_")[1], 10);
                            const id = data[index]["_id"];
                            document.cookie = "id=" + id + "; path=./*";
                            document.location.href = "editproject.html";
                        }
                        else if(e.target && e.target.id.split("_")[0].localeCompare("manage")===0) {
                            const index = parseInt(e.target.id.split("_")[1], 10);
                            const id = data[index]["_id"];
                            document.cookie = "id=" + id + "; path=./*";
                            document.location.href = "manageproject.html";
                        }else if(e.target && e.target.id.split("_")[0].localeCompare("titre")===0){
                            const index = parseInt(e.target.id.split("_")[1], 10);
                            const id = data[index]["_id"];
                            document.cookie = "id=" + id + "; path=./*";
                            document.location.href = "project.html";
                        }
                    });

                    document.querySelector("#projects").append(titre, deleteButton, editButton, manageButton);
                    document.querySelector("#projects").append(document.createElement("br"));
                    cpt ++;
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

function displayNoOwnerProjects(addr, role) {
    fetch(addr)
        .then(async function (res) {
            if (res.status === 200) {
                res.json().then(function (datas) {
                    data = data.concat(datas);
                    datas.forEach(item => {
                        let titre = document.createElement("a");
                        titre.setAttribute("type", "button");
                        titre.setAttribute("id", "titre_"+cpt);
                        titre.setAttribute("class", "btn btn-link");
                        titre.innerHTML = item["Titre"] + " (" + role + ")\n";
                        document.querySelector("#projects").append(titre);
                        document.querySelector("#projects").append(document.createElement("br"));
                        cpt++;
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
}

displayNoOwnerProjects(url + "developpeur?login=" + login, "Développeur");
displayNoOwnerProjects(url + "client?login=" + login, "Client");
