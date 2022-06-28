localStorage.setItem('balance', '');
var balance = localStorage.getItem('balance');
balance = 0;

var OutputBalance = document.getElementById('balance');
var buttonStart = document.getElementById('btn-start');
var buttonStop = document.getElementById('btn-stop');
var Interval;

var plus = document.getElementById('plus');
var buy = document.getElementById('buy');

//Het interval word hier aangeroepen dat elke 1 seconde de functie word aangeroepen
buttonStart.addEventListener('click', () => {
    clearInterval(Interval);
    Interval = setInterval(startTime, 1000);
});

//Het interval word stop gezet als hierop geklkikt word
buttonStop.addEventListener('click', () => {
    clearInterval(Interval);
});

// Deze functie houd in dat de balans met 1 opgeteld word en word aangegeven in de HTML
function startTime(){
    // Als er je meer dan 100 punten hebt dan krijg je meer punten per seconden. heb je er meer dan 300 dan krijg je er 3 per seconde.
    if(balance < 100){
        balance = balance + 1;
    }   else if (balance < 200){
        balance = balance + 2;
    }   else{
        balance = balance + 3;
    }

    OutputBalance.innerHTML = balance;
    console.log(balance)
}

// Door de knop met plus te klikken kun je 50 bonus punten verdienen.
plus.addEventListener('click', bonus);
function bonus(){
    balance = balance + 50;
    OutputBalance.innerHTML = balance;
}

// Je kan items kopen, hierbij checkt hij de balans. ALs die te laag is krijg je een alert dat hij te laag is
buy.addEventListener('click', beer);
function beer(){
    if(balance < 500){
        alert("U heeft niet genoeg Effenarium");
    }
    else{
        alert("U heeft een coupon voor gratis bier ontvangen");
        balance = balance - 500;
    }
}
