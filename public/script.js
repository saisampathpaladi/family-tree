const apiUrl = window.location.origin;

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (response.ok) {
            loadTree();
        } else {
            alert('Invalid login');
        }
    });
}

function logout() {
    fetch('/logout')
    .then(() => {
        document.getElementById('login-container').style.display = 'block';
        document.getElementById('tree-container').style.display = 'none';
    });
}

function loadTree() {
    fetch('/api/tree')
    .then(response => response.json())
    .then(tree => {
        renderTree(tree);
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('tree-container').style.display = 'block';
    });
}

function renderTree(tree) {
    const container = document.getElementById('tree');
    container.innerHTML = '';

    for (let person in tree) {
        const div = document.createElement('div');
        div.className = 'person';
        div.style.color = tree[person].gender === 'male' ? 'blue' : 'pink';
        div.innerText = person;

        container.appendChild(div);
    }
}

function downloadPDF() {
    const element = document.getElementById('tree');
    html2pdf(element);
}

window.onload = () => {
    fetch('/api/tree')
    .then(response => {
        if (response.status === 401) {
            document.getElementById('login-container').style.display = 'block';
        } else {
            loadTree();
        }
    });
};

