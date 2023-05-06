const allUserUrl = "http://localhost:8080/api/user/users";
const currentUserUrl = "http://localhost:8080/api/user/current";
const editUserUrl = "http://localhost:8080/api/user/edit";
const deleteUserUrl = "http://localhost:8080/api/user/delete";

function currentUserInfo() {
    fetch(currentUserUrl, {
        credentials: 'include'
    })
        .then(response => response.json())
        .then(user => {
            const currentUser = user;
            const email = currentUser.email;
            const roles = currentUser.roles.reverse();

            document.getElementById('current-email').innerHTML = email;

            const ul = document.getElementById('current-roles');
            roles.forEach(role => {
                const li = document.createElement('li');

                li.textContent = role.name.replace('ROLE_', '');
                ul.appendChild(li);
            });
        })
}

function completeTable() {
    fetch(allUserUrl)
        .then(response => response.json())
        .then(data => {
            let tableBody = document.querySelector('.table-body-users');
            let users = data;
            let rows = '';

            if (location.pathname === '/user') {
                users.forEach(user => {
                    if (!user.roles.map(role => role.name).includes('ROLE_ADMIN')) {
                        rows += `<tr>
                        <td scope="col">${user.id}</td>
                        <td scope="col">${user.name}</td>
                        <td scope="col">${user.surname}</td>
                        <td scope="col">${user.age}</td>
                        <td scope="col">${user.email}</td>
                        <td scope="col">${user.roles.map(role => role.name.replace('ROLE_', '')).reverse().join(' ')}</td>
                        </tr>`;
                    }
                });
            } else {
                users.forEach(user => {
                    rows += `<tr>
                    <td scope="col" class="text-center align-middle">${user.id}</td>
                    <td scope="col" class="text-center align-middle">${user.name}</td>
                    <td scope="col" class="text-center align-middle">${user.surname}</td>
                    <td scope="col" class="text-center align-middle">${user.age}</td>
                    <td scope="col" class="text-center align-middle">${user.email}</td>
                    <td scope="col" class="text-center align-middle">${user.roles.map(role => role.name.replace('ROLE_', '')).reverse().join(' ')}</td>
                    <td scope="col" class="text-center align-middle"><button id=${user.id} data-bs-toggle="modal" data-bs-target="#editModal" type="button" class="btn btn-primary btn-edit">EDIT</button></td>
                    <td scope="col" class="text-center align-middle"><button id=${user.id} data-bs-toggle="modal" data-bs-target="#deleteModal" type="button" class="btn btn-danger btn-delete">DELETE</button></td>
                    </tr>`;
                });
            }
            tableBody.innerHTML = rows;
        });
}

function editModal() {
    fetch(allUserUrl)
        .then(response => response.json())
        .then(data => {
            let users = data;
            const editButtons = document.querySelectorAll('.btn-edit');
            const editRole = document.querySelector('#edit-role');

            editButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const userId = button.id;
                    const user = users.find(user => user.id === parseInt(userId));
                    const userRoles = user.roles.map(role => role.name);

                    const idInput = document.querySelector('#edit-id');
                    const nameInput = document.querySelector('#edit-name');
                    const surnameInput = document.querySelector('#edit-surname');
                    const ageInput = document.querySelector('#edit-age');
                    const emailInput = document.querySelector('#edit-email');

                    const adminOption = editRole.querySelector('.ROLE_ADMIN');
                    const userOption = editRole.querySelector('.ROLE_USER');

                    if (userRoles.includes('ROLE_ADMIN') && userRoles.includes('ROLE_USER')) {
                        adminOption.selected = true;
                        adminOption.defaultSelected = true;
                        userOption.selected = true;
                        userOption.defaultSelected = true;
                    } else if (userRoles.includes('ROLE_ADMIN')) {
                        adminOption.selected = true;
                        adminOption.defaultSelected = true;
                        userOption.selected = false;
                        userOption.defaultSelected = false;
                    } else {
                        userOption.selected = true;
                        userOption.defaultSelected = true;
                        adminOption.selected = false;
                        adminOption.defaultSelected = false;
                    }

                    idInput.value = user.id;
                    nameInput.value = user.name;
                    surnameInput.value = user.surname;
                    ageInput.value = user.age;
                    emailInput.value = user.email;
                });
            });
        });
}


function editUser() {
    const form = document.querySelector('.modal-form-edit');
    const buttons = document.querySelectorAll('#edit-user');

    buttons.forEach(button => {
        button.addEventListener('click', () => {

            const userDTO = {
                id: form.querySelector('#edit-id').value,
                name: form.querySelector('#edit-name').value,
                surname: form.querySelector('#edit-surname').value,
                age: form.querySelector('#edit-age').value,
                email: form.querySelector('#edit-email').value,
                roles: Array.from(form.roles.selectedOptions, option => ({id: option.value})),
                password: form.querySelector('#edit-password').value,
            };

            fetch(editUserUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userDTO)
            }).then(response => response.json()).then(data => {
                console.log(data)
                completeTable();
                editModal();
            });
        });
    });
}

function deleteModal() {
    fetch(allUserUrl)
        .then(response => response.json())
        .then(data => {
            let users = data;

            const deleteButtons = document.querySelectorAll('.btn-delete');
            const deleteRole = document.querySelector('#delete-role');

            deleteButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const userId = button.id;
                    const user = users.find(user => user.id === parseInt(userId));
                    const userRoles = user.roles.map(role => role.name);

                    const idInput = document.querySelector('#delete-id');
                    const nameInput = document.querySelector('#delete-name');
                    const surnameInput = document.querySelector('#delete-surname');
                    const ageInput = document.querySelector('#delete-age');
                    const emailInput = document.querySelector('#delete-email');

                    const adminOption = deleteRole.querySelector('.ROLE_ADMIN');
                    const userOption = deleteRole.querySelector('.ROLE_USER');

                    if (userRoles.includes('ROLE_ADMIN') && userRoles.includes('ROLE_USER')) {
                        adminOption.selected = true;
                        adminOption.defaultSelected = true;
                        userOption.selected = true;
                        userOption.defaultSelected = true;
                    } else if (userRoles.includes('ROLE_ADMIN')) {
                        adminOption.selected = true;
                        adminOption.defaultSelected = true;
                        userOption.selected = false;
                        userOption.defaultSelected = false;
                    } else {
                        userOption.selected = true;
                        userOption.defaultSelected = true;
                        adminOption.selected = false;
                        adminOption.defaultSelected = false;
                    }

                    idInput.value = user.id;
                    nameInput.value = user.name;
                    surnameInput.value = user.surname;
                    ageInput.value = user.age;
                    emailInput.value = user.email;
                });
            });
        });
}

function deleteUser() {
    const form = document.querySelector('.modal-form-delete');
    const buttons = document.querySelectorAll('#delete-user');

    buttons.forEach(button => {
        button.addEventListener('click', () => {

            const userDTO = {
                id: form.querySelector('#delete-id').value,
                name: form.querySelector('#delete-name').value,
                surname: form.querySelector('#delete-surname').value,
                age: form.querySelector('#delete-age').value,
                email: form.querySelector('#delete-email').value,
                roles: Array.from(form.roles.selectedOptions, option => ({id: option.value})),
            };

            fetch(deleteUserUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userDTO)
            }).then(response => response.json()).then(data => {
                console.log(data)
                completeTable();
                deleteModal();
            });
        });
    });
}

currentUserInfo();
completeTable();
editModal();
editUser();
deleteModal();
deleteUser();