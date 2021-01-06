let mobileNo = document.getElementById('mobileNo');
let rent = document.getElementById('rent');
let advance = document.getElementById('advance');
let rooms = document.getElementById('rooms');
let maxNo = document.getElementById('maxNo');
let pin = document.getElementById('pin');
let postID = document.querySelector('table').getAttribute('id');

let allClear = true;

document.getElementById('mobileNo').addEventListener('keyup', () => {
    if(isNaN(mobileNo.value) || mobileNo.value.length !== 10 || mobileNo.value == ''){
        document.querySelector('span.mobileNo').style.display = 'inline-block';
        allClear = false;
    }
    else{
        document.querySelector('span.mobileNo').style.display = 'none';
        allClear = true;
    }
});

document.getElementById('rent').addEventListener('keyup', () => {
    if(isNaN(rent.value) || Number(rent.value) < 0 || rent.value == ''){
        document.querySelector('span.rent').style.display = 'inline-block';
        allClear = false;
    }
    else{
        document.querySelector('span.rent').style.display = 'none';
        allClear = true;
    }
});

document.getElementById('advance').addEventListener('keyup', () => {
    if(isNaN(advance.value) || Number(advance.value) < 0 || advance.value == ''){
        document.querySelector('span.advance').style.display = 'inline-block';
        allClear = false;
    }
    else{
        document.querySelector('span.advance').style.display = 'none';
        allClear = true;
    }
});

document.getElementById('rooms').addEventListener('keyup', () => {
    if(isNaN(rooms.value) || Number(rooms.value) < 0 || rooms.value == ''){
        document.querySelector('span.rooms').style.display = 'inline-block';
        allClear = false;
    }
    else{
        document.querySelector('span.rooms').style.display = 'none';
        allClear = true;
    }
});

document.getElementById('maxNo').addEventListener('keyup', () => {
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

document.getElementById('previousPage').addEventListener('click', () => {
    window.history.back();
});

function update(){
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
        let postID = document.querySelector('table').getAttribute('id');

        fetch('/rental/update/'+postID, {
            method: 'PUT',
            body: JSON.stringify({ fullName, mobileNo, houseNo, street, area, landmark, state, city, pin, rent,
            advance, independentHouse, newHouse, rooms, maxNo, pets, family, textArea }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(data => window.location.href = data.redirect )
        .catch(err => console.log(err));
       
    }
}
function deletePost(){
    if(allClear === true){
        fetch('/rental/delete/'+postID, {method: 'DELETE'})
         .then(res => res.json())
         .then(data => window.location.href = data.redirect )
         .catch(err => console.log(err));
    }
}