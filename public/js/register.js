const mobileNo = document.getElementById("mobileNo");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const pin = document.getElementById("pin");

let allClear = true;

const regex = /^([a-z0-9\.-]+)@([a-z]+\.)?([a-z]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;

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


mobileNo.addEventListener('keyup', () => {
    if(isNaN(mobileNo.value) || mobileNo.value.length !== 10){
        document.querySelector('span.mNo').style.display = 'inline-block';
        allClear = false;
    }
    else{
        document.querySelector('span.mNo').style.display = 'none';
        allClear = true;
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

confirmPassword.addEventListener('keyup', () => {
    if(password.value === ''){
        document.querySelector('span.pass1').style.display = 'inline-block';
        allClear = false;
        return;
    }
    else if(password.value !== confirmPassword.value){
        document.querySelector('span.pass1').style.display = 'none';
        document.querySelector('span.pass2').style.display = 'inline-block';
        allClear = false;
    }
    else{
        document.querySelector('span.pass2').style.display = 'none';
        allClear = true; 
    }
});

pin.addEventListener('keyup', () => {
    if(isNaN(pin.value) || pin.value.length !== 6 || pin.value == ''){
        document.querySelector('span.pin').style.display = 'inline-block';
        allClear = false;
    }
    else{
        document.querySelector('span.pin').style.display = 'none';
        allClear = true;
    }
});

document.querySelector('form').addEventListener('submit', (e) => {

    e.preventDefault();

    if(allClear === true){
        const username = document.getElementById('username').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const mobileNo = document.getElementById('mobileNo').value;
        const houseNo = document.getElementById('houseNo').value;
        const street = document.getElementById('street').value;
        const area = document.getElementById('area').value;
        const landmark = document.getElementById('landmark').value;
        const state = document.getElementById('state').value;
        const city = document.getElementById('city').value;
        const pin = document.getElementById('pin').value;
        const password = document.getElementById('password').value;
    
        fetch('/register', {
            method: 'POST',
            body: JSON.stringify({ username, firstName, lastName, email, mobileNo, houseNo, street,
            area, landmark, state, city, pin, password }),
            headers: { 'Content-Type': 'application/json' }
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
