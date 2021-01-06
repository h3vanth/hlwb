let mobileNo = document.getElementById('mobileNo');
let sqFt = document.getElementById('sqFt');
let price = document.getElementById('price');
let pin = document.getElementById('pin');
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

document.getElementById('sqFt').addEventListener('keyup', () => {
    if(isNaN(sqFt.value) || Number(sqFt.value) < 0 || sqFt.value == ''){
        document.querySelector('span.sqFt').style.display = 'inline-block';
        allClear = false;
    }
    else{
        document.querySelector('span.sqFt').style.display = 'none';
        allClear = true;
    }
});

document.getElementById('price').addEventListener('keyup', () => {
    if(isNaN(price.value) || Number(price.value) < 0 || price.value == ''){
        document.querySelector('span.price').style.display = 'inline-block';
        allClear = false;
    }
    else{
        document.querySelector('span.price').style.display = 'none';
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
        let sqFt = document.getElementById('sqFt').value;
        let price = document.getElementById('price').value;
        let textArea = document.getElementById('textArea').value;
        let postID = document.querySelector('table').getAttribute('id');

        fetch('/land/update/'+postID, {
            method: 'PUT',
            body: JSON.stringify({ fullName, mobileNo, houseNo, street, area, landmark, state, city, pin, sqFt,
            price, textArea }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(data => window.location.href = data.redirect )
        .catch(err => console.log(err));
       
    }
}
function deletePost(){
    let postID = document.querySelector('table').getAttribute('id');
    if(allClear === true){
        fetch('/land/delete/'+postID, {method: 'DELETE'})
         .then(res => res.json())
         .then(data => window.location.href = data.redirect )
         .catch(err => console.log(err));
    }
}