document.querySelector('#signup').addEventListener('click', onClick);

function onClick()
{
    const url = 'http://localhost:3000/user';

    const my_headers = new Headers();
    my_headers.append("Content-Type", "application/json");

    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const mail = document.getElementById('mail').value;
    const login = document.getElementById('login').value;
    const mdp = document.getElementById('password').value;
    const societe = document.getElementById('societe').value;

	var params = {nom:nom, prenom:prenom, mail:mail, login:login, mdp:mdp, societe:societe};

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
        if(res.status === 409)
            alert("Ce login est déjà utilisé, veuillez en choisir un autre");
        else if(res.status === 201) {
            alert("Inscription réussie !");
            document.location.href = "index.html";
        }
        else
            alert(res.statusText);
    }).catch(function(err){
		console.log(err.message);
	});
}