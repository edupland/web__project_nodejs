function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)===' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

document.querySelector("#cancel").addEventListener("click", onClick);
document.querySelector("#save").addEventListener("click", onClickOk);

fetch("http://localhost:3000/project/id?id="+readCookie("id")).then(function (res){
    if(res.status === 200){
        res.json().then(function(data){
            var title = data[0]["Titre"];
            var description = data[0]["Description"];
            document.querySelector("#titre").value = title;
            document.querySelector("#description").value = description;
        });
    }else{
        alert(res.statusText);
    }
}).catch(function(err){
    console.log(err.message);
});

function onClickOk() {
    if (document.cookie.includes("id=")) {

        const url = 'http://localhost:3000/project';
        const my_headers = new Headers();
        my_headers.append("Content-Type", "application/json");

        const id = readCookie("id");
        const titre = document.querySelector("#titre").value;
        const description = document.querySelector("#description").value;

        var params = { id: id, titre: titre, description: description };

        var my_init = {
            method: 'PUT',
            headers: my_headers,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(params)
        };

        fetch(url, my_init)
            .then(function (res) {
                if (res.status === 200) {
                    alert("Projet modifié");
                    document.cookie = 'id=no_id; expires=Fri, 01 Jan 2010 00:0:00 UTC; path=./*';
                    document.location.href = "myprojects.html";
                }
                else
                    alert(res.statusText);
            }).catch(function (err) {
            console.log(err.message);
        });

    }
}

function onClick(){
    document.cookie = 'id=no_id; expires=Fri, 01 Jan 2010 00:0:00 UTC; path=./*';
    document.location.href = "myprojects.html";
}