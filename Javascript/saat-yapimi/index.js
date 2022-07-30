let userName = prompt("İsminiz nedir?")

let nameTag = document.querySelector("#myName");
nameTag.innerHTML = userName;

function showTime(){
    var date = new Date();
    var day;
    var d = date.getDay();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";
    
    switch(d){
        case 0:
            day='Pazartesi';
        break;
        case 1:
            day='Salı';
        break;
        case 2:
            day='Çarşamba';
        break;
        case 3:
            day='Perşembe';
        break;
        case 4:
            day='Cuma';
        break;
        case 5:
            day='Cumartesi';
        break;
        case 6:
            day='Pazar';
        break;
        default:
            d="tarih okunamadi";
        break;
    }




    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m + ":" + s + " " + session + " " + day;
    document.getElementById("myClock").innerText = time;
    document.getElementById("myClock").textContent = time;
    
    setTimeout(showTime, 1000);
    
}

showTime();