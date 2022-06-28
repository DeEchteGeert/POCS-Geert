var balance = 0;
var OutputBalance = document.getElementById('balance');
var buttonStart = document.getElementById('btn-start');
var buttonStop = document.getElementById('btn-stop');
var Interval;

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
    balance++;
    OutputBalance.innerHTML = balance;
}