const formRegister = document.getElementById('formRegister');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('emailError');

formRegister.onsubmit = (e) => {
    e.preventDefault();

    const oldItems = JSON.parse(localStorage.users ?? "[]");
    const enteredEmail = emailInput.value.trim().toLowerCase();

    const emailExists = oldItems.some(user => user.email.toLowerCase() === enteredEmail);

    if (emailExists) {
        emailError.classList.remove('hidden');
        emailInput.classList.add('border-red-500');
        return;
    } else {
        emailError.classList.add('hidden');
        emailInput.classList.remove('border-red-500');
    }

    let id = generateUUID();
    if (crypto && crypto.randomUUID) {
        id = crypto.randomUUID();
    }

    const formData = {
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        email: enteredEmail,
        password: document.getElementById('password').value,
        avatar: document.getElementById('avatar').src,
        guid: id
    };

    const items = [...oldItems, formData];
    const json = JSON.stringify(items);

    localStorage.setItem("users", json);
    location.href = "/html/users.html";
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}