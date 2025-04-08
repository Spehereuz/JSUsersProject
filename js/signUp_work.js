
const formRegister = document.getElementById('formRegister');
console.log("form", formRegister);
formRegister.onsubmit = (e) => {
    e.preventDefault();
    console.log("Submit form", e);
    let id = generateUUID();
    if (crypto) {
        if (crypto.randomUUID)
            id = crypto.randomUUID();
    }
    const formData = {
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        avatar: document.getElementById('avatar').src,
        guid: id
    };
    const oldItems = JSON.parse(localStorage.users ?? "[]");
    console.log("Old list", oldItems);

    let items = [...oldItems, formData];
    let json = JSON.stringify(items);

    localStorage.setItem("users", json);
    console.log("json", json);
    let users = localStorage.getItem("users");
    console.log("json", users);

    location.href = "/html/users.html";
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}