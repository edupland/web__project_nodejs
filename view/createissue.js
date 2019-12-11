function onClick()
{
  const url = backUrl+"issue";

  const my_headers = new Headers();
  my_headers.append("Content-Type", "application/json");

  const id = readCookie("id");
  const role = document.querySelector("#role").value;
  const action = document.querySelector("#action").value;
  const raison = document.querySelector("#raison").value;

  const params = {id: id, role: role, action: action, raison: raison};

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
      if (res.status === 201) {
        await Swal.fire({
          icon: "success",
          text: "Issue créée !"
        });
        document.location.href = "issue.html";
      }else
        await Swal.fire({
          icon: "error",
          text: res.statusText
        });
    }).catch(function (err) {
      console.log(err.message);
    });
}
