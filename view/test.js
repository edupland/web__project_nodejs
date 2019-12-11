function readCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)===" ") c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

const url = backUrl+"test?id=";

const id = readCookie("id");

let cpt = 0;

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

                    let given = document.createElement("b");
                    given.innerHTML = "GIVEN : ";

                    let when = document.createElement("b");
                    when.innerHTML = "WHEN : ";

                    let then = document.createElement("b");
                    then.innerHTML = "THEN : ";

                    col8.append(given, elem["TestGiven"], br1, when, elem["TestWhen"], br2, then, elem["TestThen"]);

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

                    document.querySelector("#tests").append(br3, row);

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
