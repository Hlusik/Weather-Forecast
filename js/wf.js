
let dcity = document.getElementById("city");
let dunits = document.getElementById("units");
let aprevious = document.getElementById("previous");
let anext = document.getElementById("next");
let dayCount = 10;
let showDaysCont = 3;
let minDays = dayCount - showDaysCont;
let pervCount = 0;
let nextCount = dayCount - showDaysCont;
let weatherDayWidth = 370;
let weatherDayRight = 0;


$(document).ready(function () {
  let city = dcity.options[dcity.selectedIndex].value;
  let units = dunits.options[dunits.selectedIndex].value;
  weatherForecast(city, units);
});
  
dcity.addEventListener("change", function() {
  let city = dcity.options[dcity.selectedIndex].value;
  let units = dunits.options[dunits.selectedIndex].value;
  weatherForecast(city, units);
});

dunits.addEventListener("change", function() {
  let city = dcity.options[dcity.selectedIndex].value;
  let units = dunits.options[dunits.selectedIndex].value;
  weatherForecast(city, units);
});

aprevious.addEventListener("click", function() {  
  if(pervCount < minDays){
    anext.classList.remove("isDisabled");
    let div = document.getElementById('allCell');
    weatherDayRight = weatherDayRight + weatherDayWidth;
    div.style.right = weatherDayRight + 'px';
    pervCount ++;
    nextCount --;
    if(pervCount >= minDays){
      aprevious.className += aprevious.className ? ' isDisabled' : 'isDisabled'; 
    }
  }
});

anext.addEventListener("click", function() {
  if(nextCount < minDays){
    aprevious.classList.remove("isDisabled");
    let div = document.getElementById('allCell');
    weatherDayRight = weatherDayRight - weatherDayWidth;
    div.style.right = weatherDayRight + 'px';
    pervCount --;
    nextCount ++;
    if(nextCount >= minDays){
      anext.className += anext.className ? ' isDisabled' : 'isDisabled'; 
    }
  }
});

function weatherForecast(city, units) {
  let url = "https://api.openweathermap.org/data/2.5/forecast"; //daily
  let key = 'a3d77f8808853df17b759e6bb29e418d';    
  
    // api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=a3d77f8808853df17b759e6bb29e418d
  $.ajax({
  url: url, //API Call
  dataType: 'json',
  type: 'GET',
  data: {
    id: city,
    appid: key,
    units: units,
    cnt: dayCount
  },
  success: function(data) { 
    let myDate = new Date();
    let wf = '';   
    wf = '<div id="allCell" class="allCell">';
    let i;
    for (i = 0; i < dayCount; i++) { 
      myDate = new Date(1000*data.list[i].dt);
      wf += '<div class="weatherDay">';
      wf += '<h2>' + data.city.name + "</h2>";
      wf += '<b>' + myDate.toDateString() + '</b>'; 
      wf += data.list[i].main.temp + dunits.options[dunits.selectedIndex].text; 
      wf += '<span> ' + data.list[i].weather[0].description + '</span>';
      wf +='<img src="https://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png">';
      wf += '</div>'; 
    };
    wf += '</div>';
    $('#showWeatherForcast').html(wf);
  }
  });
};

  
