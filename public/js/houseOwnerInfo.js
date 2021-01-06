const rent = document.getElementById('rent');
const advance = document.getElementById('advance');
const mobileNo = document.getElementById('mobileNo');
const rooms = document.getElementById('rooms');
const maxNo = document.getElementById('maxNo');
const pin = document.getElementById('pin');

let allClear = true;

mobileNo.addEventListener('keyup', () => {
    if(isNaN(mobileNo.value) || mobileNo.value.length !== 10){
        document.querySelector('span.mobileNo').style.display = 'inline-block';
        allClear = false;
    }
    else{
        document.querySelector('span.mobileNo').style.display = 'none';
        allClear = true;
    }
});

rent.addEventListener('keyup', () => {
    if(isNaN(rent.value) || Number(rent.value) < 0 || rent.value == ''){
        document.querySelector('span.rent').style.display = 'inline-block';
        allClear = false;
    }
    else{
        document.querySelector('span.rent').style.display = 'none';
        allClear = true;
    }
});

advance.addEventListener('keyup', () => {
    if(isNaN(advance.value) || Number(advance.value) < 0 || advance.value == ''){
        document.querySelector('span.advance').style.display = 'inline-block';
        allClear = false;
    }
    else{
        document.querySelector('span.advance').style.display = 'none';
        allClear = true;
    }
});

rooms.addEventListener('keyup', () => {
    if(isNaN(rooms.value) || Number(rooms.value) < 0 || rooms.value == ''){
        document.querySelector('span.rooms').style.display = 'inline-block';
        allClear = false;
    }
    else{
        document.querySelector('span.rooms').style.display = 'none';
        allClear = true;
    }
});

maxNo.addEventListener('keyup', () => {
    if(isNaN(maxNo.value) || Number(maxNo.value) < 0 || maxNo.value == ''){
        document.querySelector('span.maxNo').style.display = 'inline-block';
        allClear = false;
    }
    else{
        document.querySelector('span.maxNo').style.display = 'none';
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
        let fullName = document.getElementById('fullName').value;
        let mobileNo = document.getElementById('mobileNo').value;
        let houseNo = document.getElementById('houseNo').value;
        let street = document.getElementById('street').value;
        let area = document.getElementById('area').value;
        let landmark = document.getElementById('landmark').value;
        let state = document.getElementById('state').value;
        let city = document.getElementById('city').value;
        let pin = document.getElementById('pin').value;
        let rent = document.getElementById('rent').value;
        let advance = document.getElementById('advance').value;
        let independentHouse = document.querySelector('input[name ="independentHouse"]:checked').value;
        let newHouse = document.querySelector('input[name ="newHouse"]:checked').value;
        let rooms = document.getElementById('rooms').value;
        let maxNo = document.getElementById('maxNo').value;
        let pets = document.querySelector('input[name ="pets"]:checked').value;
        let family = document.querySelector('input[name ="family"]:checked').value;
        let textArea = document.getElementById('textArea').value;

        fetch('/rental/houseOwnerInfo', {
            method: 'POST',
            body: JSON.stringify({ fullName, mobileNo, houseNo, street, area, landmark, state, city, pin, rent,
            advance, independentHouse, newHouse, rooms, maxNo, pets, family, textArea }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(data => window.location.href = data.redirect )
        .catch(err => console.log(err));
    }
});

document.getElementById('previousPage').addEventListener('click', () => {
    window.history.back();
});