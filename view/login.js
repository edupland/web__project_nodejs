document.querySelector("#aut").addEventListener("click", onClick);

function onClick()
{
    const url = backUrl+"user";

    const my_headers = new Headers();
    my_headers.append("Content-Type", "application/json");

    const login = document.getElementById("login").value;
    const mdp = document.getElementById("password").value;

    fetch(url+"?login="+login+"&mdp="+mdp)
        .then(async function(res)
        {
            if(res.status === 200){
                document.cookie = "login="+login+"; path=./*";
                document.cookie = "mdp="+mdp+"; path=./*";
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
