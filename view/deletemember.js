document.querySelector("#cancel").addEventListener("click", onClick);
document.querySelector("#ok").addEventListener("click", onClickOk);

function onClickOk() {
    if (document.cookie.includes("id=")) {

        let url = backUrl+"project";
        const my_headers = new Headers();
        my_headers.append("Content-Type", "application/json");

        const id = readCookie("id");
        let login = readCookie("client");
        let params = { id: id, client: login };
        if(!login){
            login = readCookie("developpeur");
            url += "/developpeur";
            params = {id: id, developpeur: login};
        }else
            url += "/client";

        const my_init = {
            method: "DELETE",
            headers: my_headers,
            mode: "cors",
            cache: "default",
            body: JSON.stringify(params)
        };

        fetch(url, my_init)
            .then(async function (res) {
                if (res.status === 200) {
                    await Swal.fire({
                        icon: "success",
                        text: "Membre supprimé"
                    });
                    document.cookie = "client=no_id; expires=Fri, 01 Jan 2010 00:0:00 UTC; path=./*";
                    document.cookie = "developpeur=no_id; expires=Fri, 01 Jan 2010 00:0:00 UTC; path=./*";
                    document.location.href = "manageproject.html";
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
    document.cookie = "client=no_id; expires=Fri, 01 Jan 2010 00:0:00 UTC; path=./*";
    document.cookie = "developpeur=no_id; expires=Fri, 01 Jan 2010 00:0:00 UTC; path=./*";
    document.location.href = "manageproject.html";
}
