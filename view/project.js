fetch(url + "?id=" + id)
    .then(async function (res) {
        if (res.status === 200) {
            res.json().then(function (datas) {
                document.querySelector("#description").innerHTML = datas[0]["Description"];
            });
        } else
            await Swal.fire({
                icon: "error",
                text: res.statusText
            });
    }).catch(function (err) {
    console.log(err.message);
});
