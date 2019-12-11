function onClick()
{
    const url = backUrl+"project";

    const my_headers = new Headers();
    my_headers.append("Content-Type", "application/json");

    const titre = document.getElementById("titre").value;
    const description = document.getElementById("description").value;
    const login = readCookie("login");

    const params = {titre:titre, description:description, login:login};

    const my_init = {
        method: "POST",
        headers: my_headers,
        mode: "cors",
        cache: "default",
        body: JSON.stringify(params)
    };

    fetch(url, my_init)
        .then(async function(res)
        {
            if(res.status === 201) {
                await Swal.fire({
                    icon: "success",
                    text: "Projet créé !"
                });
                document.location.href = "myprojects.html";
            }else
                await Swal.fire({
                    icon: "error",
                    text: res.statusText
                });
        }).catch(function(err){
            console.log(err.message);
    });
}
