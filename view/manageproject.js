function createElemMember(member, id, cpt){
    let oneMember = document.createElement("p");
    oneMember.innerHTML = member["Login"] + ", " + member["Nom"] + ", " + member["Prenom"];
    let but = document.createElement("a");
    but.type = "button";
    but.className = "btn btn-danger";
    but.href = "deletemember.html";
    but.innerHTML = "Supprimer";
    but.id = id+cpt;
    oneMember.appendChild(but);
    return oneMember;
}

fetch("http://localhost:3000/project/id?id="+readCookie("id")).then(async function(res){
    let cpt=0;
    res.json().then(async function(res) {
        res[0]["Developpeurs"].forEach(dev => {
            let oneDev = createElemMember(dev, "delDev_", cpt);
            document.querySelector("#devs").appendChild(oneDev);
            cpt++;
        });
        res[0]["Clients"].forEach(client => {
            let oneClient = createElemMember(client, "delClient_", cpt);
            document.querySelector("#clients").appendChild(oneClient);
            cpt++;
        });
        document.addEventListener("click", function(e){
            if(e.target && e.target.id.split("_")[0].localeCompare("delDev")===0) {
                const index = parseInt(e.target.id.split("_")[1], 10);
                const login = res[0]["Developpeurs"][index];
                document.cookie = "developpeur=" + login + "; path=./*";
                document.location.href = "deletemember.html";
            }else if(e.target && e.target.id.split("_")[0].localeCompare("delClient")===0) {
                const index = parseInt(e.target.id.split("_")[1], 10);
                const login = res[0]["Clients"][index];
                document.cookie = "client=" + login + "; path=./*";
                document.location.href = "deletemember.html";
            }
        });
    });
});

document.querySelector("#cancel").addEventListener("click", onClick);
document.querySelector("#saveDeveloppeur").addEventListener("click", onClickDeveloppeur);
document.querySelector("#saveClient").addEventListener("click", onClickClient);

function onClickDeveloppeur() {
    if (document.cookie.includes("id=")){
        const url = backUrl+"project/developpeur";
        const my_headers = new Headers();
        my_headers.append("Content-Type", "application/json");

        const id = readCookie("id");
        const developpeur = document.querySelector("#developpeur").value;

        const params = { id: id, developpeur: developpeur };

        const my_init = {
            method: "PUT",
            headers: my_headers,
            mode: "cors",
            cache: "default",
            body: JSON.stringify(params)
        };

        fetch(url, my_init)
            .then(function (res) {
                if (res.status === 201) {
                    alert("Développeur ajouté");
                    document.location.reload();
                }
                else
                    alert(res.statusText);
            }).catch(function (err) {
            console.log(err.message);
        });
    }
}

function onClickClient() {
    if (document.cookie.includes("id=")) {

        const url = backUrl+"project/client";
        const my_headers = new Headers();
        my_headers.append("Content-Type", "application/json");

        const id = readCookie("id");
        const client = document.querySelector("#client").value;

        const params = { id: id, client: client };

        const my_init = {
            method: "PUT",
            headers: my_headers,
            mode: "cors",
            cache: "default",
            body: JSON.stringify(params)
        };

        fetch(url, my_init)
            .then(async function (res) {
                if (res.status === 201) {
                    await Swal.fire({
                        icon: "error",
                        text: "Client ajouté"
                    });
                    document.location.reload();
                }
                else
                    await Swal.fire({
                        icon: "error",
                        text: res.statusText
                    });
            }).catch(function (err) {
            console.log(err.message);
        });
    }
}

function onClick(){
    document.cookie = "id=no_id; expires=Fri, 01 Jan 2010 00:0:00 UTC; path=./*";
    document.location.href = "myprojects.html";
}
