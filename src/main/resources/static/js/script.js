const all_user_url = 'http://localhost:8080/api/users';
const current_user_url = 'http://localhost:8080/api/current/user';
const new_user_url = 'http://localhost:8080/api/user/new';
const delete_user_url = 'http://localhost:8080/api/user/delete/';

function parser(URL) {
    return fetch(URL).then(response => response.json());
}

function isAdmin(URL) {
    return parser(URL).then(user => {
        for (let i = 0; i < user.roles.length; i++) {
            if (user.roles[i].name === "ROLE_ADMIN") {
                return true;
            }
        }
        return false;
    });
}


function showInfo(URL) {
    parser(URL).then(user => {
        document.getElementById("current-user-email").innerHTML = user.email;

        const ul = document.getElementById('user-roles');
        user.roles.forEach(role => {
            const li = document.createElement('li');
            li.textContent = role.name.replace('ROLE_', '');
            ul.appendChild(li);
        });
    });
}

showInfo(current_user_url);


function createUserTable(URL1, URL2, URL3) {
    parser(URL1).then(user => {
        const tbody = document.querySelector("tbody");
        let i = 0;
        user.forEach((user) => {
            if ((user.roles.map(role => role.name).includes('ROLE_ADMIN')) && (window.location.pathname === '/user')) {
                return;
            }

            const tr = document.createElement('tr');

            const id = document.createElement('td');
            const name = document.createElement('td')
            const surname = document.createElement('td')
            const age = document.createElement('td')
            const email = document.createElement('td');
            const roles = document.createElement('td');

            id.textContent = user.id;
            name.textContent = user.name;
            surname.textContent = user.surname;
            age.textContent = user.age;
            email.textContent = user.email;
            roles.textContent = user.roles.map(role => role.name.replace('ROLE_', '')).reverse().join(' ');

            tr.appendChild(id);
            tr.appendChild(name);
            tr.appendChild(surname);
            tr.appendChild(age);
            tr.appendChild(email);
            tr.appendChild(roles);

            if (i++ % 2 === 0) {
                tr.classList.add('table-bg');
            }

            if (isAdmin(URL2) && (window.location.pathname === '/admin')) {
                const editTd = document.createElement('td');
                const deleteTd = document.createElement('td');

                const editButton = document.createElement('button');
                editButton.id = 'editButton';
                editButton.classList.add('btn', 'btn-primary', 'editButton');
                editButton.textContent = 'edit';

                const deleteButton = document.createElement('button');
                deleteButton.id = 'deleteButton';
                deleteButton.classList.add('btn', 'btn-danger', 'deleteButton');
                deleteButton.textContent = 'delete';

                editTd.appendChild(editButton);
                deleteTd.appendChild(deleteButton);

                tr.appendChild(editTd);
                tr.appendChild(deleteTd);

                deleteButton.addEventListener('click', () => {
                    fetch(URL3 + user.id, {
                        method: 'DELETE'
                    })
                        .then(response => {
                            if (response.ok) {
                                console.log('User deleted successfully');
                            } else {
                                console.error('Failed to delete user');
                            }
                        })
                        .catch(error => {
                            console.error('Failed to delete user', error);
                        });
                });
            }

            tbody.appendChild(tr);
        });
    });
}

createUserTable(all_user_url, current_user_url, delete_user_url);


function saveUser(URL) {
    const form = document.getElementById('form-new-user');

    const nameInput = document.querySelector('#new-name');
    const surnameInput = document.querySelector('#new-surname');
    const ageInput = document.querySelector('#new-age');
    const emailInput = document.querySelector('#new-email');
    const passwordInput = document.querySelector('#new-password');
    const rolesInput = document.querySelector('#new-role').selectedOptions;


    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        let roles = []
        for (let i = 0; i < rolesInput.length; i++) {
            roles.push({
                id: rolesInput[i].value
            });
        }

        const userDTO = {
            name: nameInput.value,
            surname: surnameInput.value,
            age: ageInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            roles: roles
        };

        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDTO)
        });

        form.reset();
    });
}

saveUser(new_user_url);