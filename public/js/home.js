const tr = document.querySelectorAll('tr.tableRow');

tr.forEach(row => row.addEventListener('click', () => {
    const id = row.getAttribute("id");
    
    window.location.href = '/details/'+id;
}));

function filter(){
    document.getElementById('hide').style.display = 'block';
}

function filter1(){
    document.getElementById('hide1').style.display = 'block';
}

function back(){
    document.getElementById('hide').style.display = 'none';
}

function back1(){
    document.getElementById('hide1').style.display = 'none';
}

function viewAll(){
    window.location.href = '/rental/viewAll';
}

function viewAll1(){
    window.location.href = '/land/viewAll';
}