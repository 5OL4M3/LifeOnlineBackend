document.getElementById("submit").addEventListener("click", async () => {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    let res;
    let body;
    try {
        res = await fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"username": user, "password": pass})
        });
        console.log(res.status);
        if (res.status >= 400){
            body = await res.json();
            console.log(body)
            document.getElementById("message").textContent = body["error"];
        } else {
            body = res.json();
            window.location.href = body["url"];
        };
    } catch (error){
        console.log(error);
    };
});
