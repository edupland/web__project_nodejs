document.querySelector('#create').addEventListener('click', onClick);

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

function onClick()
{
    const url = 'http://localhost:3000/project';

    const my_headers = new Headers();
    my_headers.append("Content-Type", "application/json");

    const titre = document.getElementById('titre').value;
    const description = document.getElementById('description').value;
    const login = readCookie("login");

    var params = {titre:titre, description:description, login:login};

    var my_init = {
        method: 'POST',
        headers: my_headers,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(params)
    };

    fetch(url, my_init)
        .then(function(res)
        {
            if(res.status === 201) {
                alert("Projet créé !");
                document.location.href = "myprojects.html";
            }else
                alert(res.statusText);
        }).catch(function(err){
            console.log(err.message);
    });
}
