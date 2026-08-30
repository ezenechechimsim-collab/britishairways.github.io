
   /* ---------- LIVE CLOCK (London) ---------- */
  function updateClock(){
    const now = new Date();
    const timeFmt = new Intl.DateTimeFormat('en-GB', { timeZone:'Europe/London', hour:'2-digit', minute:'2-digit' });
    const dateFmt = new Intl.DateTimeFormat('en-GB', { timeZone:'Europe/London', weekday:'short', day:'2-digit', month:'short' });
    document.getElementById('clockTime').textContent = timeFmt.format(now);
    document.getElementById('clockDate').textContent = dateFmt.format(now);
  }
  updateClock();
  setInterval(updateClock, 1000 * 30);

  /* ---------- LIVE WEATHER (Open-Meteo, Heathrow / Harmondsworth) ---------- */
  const WMO = {
    0:['Clear sky','☀️'],1:['Mainly clear','🌤️'],2:['Partly cloudy','⛅'],3:['Overcast','☁️'],
    45:['Fog','🌫️'],48:['Fog','🌫️'],
    51:['Light drizzle','🌦️'],53:['Drizzle','🌦️'],55:['Heavy drizzle','🌧️'],
    61:['Light rain','🌦️'],63:['Rain','🌧️'],65:['Heavy rain','🌧️'],
    71:['Light snow','🌨️'],73:['Snow','🌨️'],75:['Heavy snow','❄️'],
    80:['Rain showers','🌦️'],81:['Rain showers','🌧️'],82:['Violent showers','⛈️'],
    95:['Thunderstorm','⛈️'],96:['Thunderstorm','⛈️'],99:['Thunderstorm','⛈️']
  };

  async function loadWeather(){
    try{
      const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=51.4700&longitude=-0.4543&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=Europe%2FLondon');
      const data = await res.json();
      const c = data.current;
      const info = WMO[c.weather_code] || ['Cloudy','⛅'];
      document.getElementById('weatherTemp').textContent = Math.round(c.temperature_2m) + '°C';
      document.getElementById('weatherDesc').textContent = info[0];
      document.getElementById('weatherIcon').textContent = info[1];
      document.getElementById('weatherHumidity').textContent = Math.round(c.relative_humidity_2m) + '%';
      document.getElementById('weatherWind').textContent = Math.round(c.wind_speed_10m) + ' km/h';
    }catch(err){
      document.getElementById('weatherDesc').textContent = 'Weather unavailable';
      document.getElementById('weatherTemp').textContent = '--°C';
    }
  }
  loadWeather();
  setInterval(loadWeather, 1000 * 60 * 15);

  /* ---------- CAROUSEL ---------- */
  const track = document.getElementById('carouselTrack');
  const slides = track.children;
  const dotsWrap = document.getElementById('carouselDots');
  const thumbs = document.querySelectorAll('.dest-thumb');
  let current = 0;
  let autoTimer;

  for(let i=0;i<slides.length;i++){
    const dot = document.createElement('button');
    if(i===0) dot.classList.add('active');
    dot.addEventListener('click', ()=>goTo(i));
    dotsWrap.appendChild(dot);
  }
  const dots = dotsWrap.children;

  function goTo(index){
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    [...dots].forEach((d,i)=> d.classList.toggle('active', i===current));
    thumbs.forEach(t => t.classList.toggle('active', Number(t.dataset.index)===current));
    resetAuto();
  }
  function resetAuto(){
    clearInterval(autoTimer);
    autoTimer = setInterval(()=> goTo(current+1), 6000);
  }
  document.getElementById('prevBtn').addEventListener('click', ()=> goTo(current-1));
  document.getElementById('nextBtn').addEventListener('click', ()=> goTo(current+1));
  thumbs.forEach(t => t.addEventListener('click', ()=> goTo(Number(t.dataset.index))));

  resetAuto();
