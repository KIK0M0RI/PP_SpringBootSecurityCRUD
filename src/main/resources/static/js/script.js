/* header */

const current_user_url = 'http://localhost:8080/api/current/user';

function getUser(URL) {
    return fetch(URL).then(response => response.json())
}

getUser(current_user_url).then(data => {
    const email = data.email;
    const output = document.getElementById('current-user-email');
    output.innerHTML = email;
})

function getRoles(URL) {
    const ul = document.getElementById('user-roles');
    getUser(URL)
        .then(user => {
            user.roles.forEach(role => {
                const li = document.createElement('li');
                li.textContent = role.name.replace('ROLE_', '');
                ul.appendChild(li);
            });
        });
}

getRoles(current_user_url)