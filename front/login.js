document.querySelector('#aut').addEventListener('click', onClick);

function onClick()
{
    const url = 'http://localhost:3000/user';

    const my_headers = new Headers();
    my_headers.append("Content-Type", "application/json");

    const login = document.getElementById('login').value;
    const mdp = document.getElementById('password').value;

    var params = {login:login, mdp:mdp};

    fetch(url+"?login="+login+"&mdp="+mdp)
        .then(function(res)
        {
            if(res.status === 200){
                document.cookie = "login="+login+"; path=./*";
                document.cookie = "mdp="+mdp+"; path=./*";
                alert("CONNECTE");
                document.location.href = "index.html";
            }
            else
                alert(res.statusText);
        }).catch(function(err){
            console.log(err.message);
    });
}