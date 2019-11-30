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
  const url = 'http://localhost:3000/issue';

  const my_headers = new Headers();
  my_headers.append("Content-Type", "application/json");

  const idprojet = readCookie("projet");
  const role = document.getElementById('role');
  const action = document.getElementById('action');
  const raison = document.getElementById('raison');

  var params = {idprojet: idprojet, role: role, action: action, raison: raison};

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
      if (res.status === 201) {
        alert("Issue créée !");
        document.location.href = "issue.html";
      }else 
        alert(res.statusText);
    }).catch(function (err) {
      console.log(err.message);
    });
}