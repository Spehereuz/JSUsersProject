let userList = document.getElementById('user-list');
let users = JSON.parse(localStorage.users);;
var userCardInUse;
var userInUse;

function LoadUsers() {
    users = JSON.parse(localStorage.users);

    users.forEach(user => {
        let userCard = document.createElement("div");
        userCard.className = "relative flex items-center space-x-4 p-4 bg-gray-50 rounded-lg shadow";
        
        userCard.innerHTML = `
                        <img class="user-avatar w-16 h-16 rounded-full" src="${user.avatar}" alt="${user.name}">
                        <button data-modal-target="editModal" data-modal-toggle="editModal" class="absolute top-0 right-0 p-1 bg-white rounded-full shadow-md" style="cursor:pointer; marging:2px" data-user-id="${user.guid}">
                             <img src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-editor-pen-pencil-write-icon--4.png" class="w-6 h-6">
                        </button>
                        <button class="user-delete absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md" style="cursor:pointer">
                             <img src="https://cdn-icons-png.flaticon.com/512/1214/1214594.png" class="w-6 h-6">
                        </button>

                        <div>
                <div class="flex items-center space-x-2">
                    <p class="user-name text-lg font-medium text-gray-900">${user.name}</p>
                    <p class="user-surname text-lg font-medium text-gray-900">${user.surname}</p>
                </div>
                <p class="user-email text-gray-600" style="font-size:12px">${user.email}</p>
            </div>
                        
                    `;
        userList.appendChild(userCard);
        const btn = userCard.querySelector(`[data-user-id="${user.guid}"]`)
        const btnDelete = userCard.querySelector('.user-delete')
        
        btn.addEventListener('click', () => UserEdit(userCard,user));
        btnDelete.addEventListener('click', () => UserDelete(user));
    });
}

let oldPasswordEdit;
let newPasswordEdit;
let avatarEdit;
let nameEdit;
let surnameEdit;
let emailEdit;

function UserEdit(userCard, user) {

    userInUse = user;
    userCardInUse = userCard;

    oldPasswordEdit = document.getElementById('old-password');
    newPasswordEdit = document.getElementById('new-password');
    avatarEdit = document.getElementById('avatar');
    nameEdit = document.getElementById('name');
    surnameEdit = document.getElementById('surname');
    emailEdit = document.getElementById('email');
   
    nameEdit.value = user.name;
    surnameEdit.value = user.surname;
    emailEdit.value = user.email;
    avatarEdit.src = user.avatar;

    
    oldPasswordEdit.addEventListener('change', () => {
       
        if (oldPasswordEdit.value == userInUse.password) {
            newPasswordEdit.disabled = false;
        }
    })

    const saveForm = document.getElementById('saveForm');

    saveForm.addEventListener('submit', (e) => {
        e.preventDefault();
        users = JSON.parse(localStorage.users);

        const newEmail = emailEdit.value.trim().toLowerCase();

        // Перевіряємо, чи існує email у іншого користувача
        const emailExists = users.some(u => u.email.toLowerCase() === newEmail && u.guid !== userInUse.guid);

        if (emailExists) {
            emailError.classList.remove('hidden');
            emailEdit.classList.add('border-red-500');
            return;
        } else {
            emailError.classList.add('hidden');
            emailEdit.classList.remove('border-red-500');
        }

        users.forEach(parsedUser => {
            if (parsedUser.guid == userInUse.guid) {

                parsedUser.name = nameEdit.value;
                parsedUser.surname = surnameEdit.value;
                parsedUser.email = emailEdit.value;
                parsedUser.avatar = avatarEdit.src;
                
                if (newPasswordEdit.value) {
                    parsedUser.password = newPasswordEdit.value;
                }
            }
        })
        
        let json = JSON.stringify(users);

        localStorage.setItem("users", json);
        LoadUsers();

        location.href = "/html/users.html";
    })
}

function UserDelete(userToDelete) {
    users = users.filter(user => user.guid !== userToDelete.guid);

    let json = JSON.stringify(users);

    localStorage.setItem("users", json);
    userList.innerHTML = "";
    LoadUsers();
}


LoadUsers();