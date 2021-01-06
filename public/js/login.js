const password = document.getElementById("password");
const regex = /^([a-z0-9\.-]+)@([a-z]+\.)?([a-z]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
let allClear = true;

document.querySelector('#email').addEventListener('keyup', (e) => {
    if(regex.test(e.target.value)){
        document.querySelector('span.em').style.display = 'none';
        allClear = true;
    }
    else{
        document.querySelector('span.em').style.display = 'inline-block';
        allClear = false;
    }
});
password.addEventListener('keyup', () => {
    if(password.value.length < 8){
        document.querySelector('span.pass').style.display = 'inline-block';
        allClear = false;
    }
    else{
        document.querySelector('span.pass').style.display = 'none';
        allClear = true;
    }
});

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    if(allClear === true){
        fetch('/login', {
            method: 'POST',
            body: JSON.stringify({ email: document.getElementById('email').value, password: password.value }),
            headers: { 'Content-Type': 'application/json '}
        })
         .then(res => res.json())
         .then(data => {
            if(data.redirect){
                window.location.href = data.redirect;
            }
            if(data.error){
                document.getElementById('error').innerText = data.error;
                document.getElementById('error').style.display = 'block';
            }
         })
         .catch(err => console.log(err));
    }
    
});

document.getElementById('app').addEventListener('click', () => {
    window.location.href = '/home';
});



