const url = backUrl+"user";

const login = readCookie("login");
const mdp = readCookie("mdp");

fetch(url+"?login="+login+"&mdp="+mdp)
    .then(async function(res)
    {
        if(res.status === 200) {
            res.json().then(function(data){
                document.querySelector("#nom").value = data["Nom"];
                document.querySelector("#prenom").value = data["Prenom"];
                document.querySelector("#mail").value = data["Mail"];
                document.querySelector("#login").value = data["Login"];
                document.querySelector("#password").value = data["Password"];
                document.querySelector("#societe").value = data["Societe"];
            });
        }else
            alert(res.statusText);
    }).catch(function(err){
    console.log(err.message);
});

document.querySelector("#save").addEventListener("click", onClick);

function onClick()
{
    const url = backUrl+"user";

    const my_headers = new Headers();
    my_headers.append("Content-Type", "application/json");

    const oldLogin = readCookie("login");
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const mail = document.getElementById("mail").value;
    const login = document.getElementById("login").value;
    const mdp = document.getElementById("password").value;
    const societe = document.getElementById("societe").value;

    const params = {oldLogin:oldLogin, nom:nom, prenom:prenom, mail:mail, login:login, mdp:mdp, societe:societe};

    const my_init = {
        method: "PUT",
        headers: my_headers,
        mode: "cors",
        cache: "default",
        body: JSON.stringify(params)
    };

    fetch(url, my_init)
        .then(async function(res)
        {
            if(res.status === 409)
                await Swal.fire({
                    icon: "error",
                    text: "Ce login est déjà utilisé, veuillez en choisir un autre"
                });
            else if(res.status === 200) {
                await Swal.fire({
                    icon: "success",
                    text: "Mise à jour réussie !"
                });
                document.location.href = "index.html";
            }
            else
                await Swal.fire({
                    icon: "error",
                    text: res.statusText
                });
        }).catch(function(err){
        console.log(err.message);
    });
}
