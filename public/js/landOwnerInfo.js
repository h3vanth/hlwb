const sqFt = document.getElementById('sqFt');
const mobileNo = document.getElementById('mobileNo');
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

sqFt.addEventListener('keyup', () => {
    if(isNaN(sqFt.value) || Number(sqFt.value) < 0 || sqFt.value == ''){
        document.querySelector('span.sqFt').style.display = 'inline-block';
        allClear = false;
    }
    else{
        document.querySelector('span.sqFt').style.display = 'none';
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
        let sqFt = document.getElementById('sqFt').value;
        let price = document.getElementById('price').value;
        let textArea = document.getElementById('textArea').value;

        fetch('/land/landOwnerInfo', {
            method: 'POST',
            body: JSON.stringify({ fullName, mobileNo, houseNo, street, area, landmark, state, city, pin,
                sqFt, price, textArea }),
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