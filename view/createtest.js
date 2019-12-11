function onClick() {
    const url = backUrl+"test";

    const my_headers = new Headers();
    my_headers.append("Content-type", "application/json");

    const id = readCookie("id");
    const testGiven = document.getElementById("given").value;
    const testWhen = document.getElementById("when").value;
    const testThen = document.getElementById("then").value;

    const params = {id: id, testGiven: testGiven, testWhen: testWhen, testThen: testThen};

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
                    text: "Test créé !"
                });
                document.location.href = "test.html";
            }else
                await Swal.fire({
                    icon: "error",
                    text: res.statusText
                });
        }).catch(function (err) {
            console.log(err.message);
        });
}
