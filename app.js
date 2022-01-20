function index(){
    let app =document.getElementById('app');
    let h3=document.createElement('h3');
    h3.innerHTML="Prayer Times";

    app.appendChild(h3);

    userlocation();
}

function userlocation(){
    if(!navigator.geolocation){
        alert('geolocation tidak didukung di browser anda');
    }else{
        navigator.geolocation.getCurrentPosition(success,error);
    }
}

function success(postion){
    prayerTimes(postion.coords.latitude,postion.coords.longitude);
}

function error() {
    //default menggunakan latitude  dan longtitude jakarta
    prayerTimes('-6.200000','106.816666');
}

function prayerTimes(latitude,longitude){
    fetch('http://api.aladhan.com/v1/calendar?latitude='+latitude+'&longitude='+longitude+'&method=4')
    .then(response=>response.json())
    .then(function(response){
        let date=new Date();
        let today=date.getDate();
        let data =response.data[0].timings;

        let app=document.getElementById('app');
        let table=document.createElement('table');
        let tableTbody=document.createElement('tbody');

        for(i in data){
            let row     =tableTbody.insertRow();
            let name    =row.insertCell(0);
            let time    =row.insertCell(1);
            name.innerHTML=i;
            time.innerHTML=data[i];
            tableTbody.appendChild(row);
        }

        table.appendChild(tableTbody);
        app.appendChild(table);
    });
}

index();