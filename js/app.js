if (new Date().getUTCHours > 20 || new Date().getUTCHours < 8) {
    document.body.style.backgroundImage = 'url(/pnj/1-377.jpg\,qitok=vMowVbmR.pagespeed.ce.go3bQ-ViLR.jpg)'
} else {
    document.body.style.backgroundImage = 'url(/pnj/thumb_l_0689.jpg)'
}

window.addEventListener("keypress", (e) => {
        if (e.keyCode == 13) {
            add();
        }
    })


document.querySelector('button').addEventListener('click', add = () => {
    if(document.querySelector('input').value.length == 0){
        document.querySelector('input').style.borderColor = 'red'
    } else {
        document.querySelector('input').style.borderColor = 'cornsilk'
    }
    let cityName = document.querySelector('input').value
    console.log(cityName)
    let url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&lang=ua&units=metric&appid=33a4edb2fe337fd387e632012d97d0de`
    weather(url)
})

async function weather (url){
    const file = await fetch(url)
    
    let data = await file.json()
    console.log('data: ', file.status == 404)
    if(file.status == 404){
        document.querySelector('input').style.borderColor = 'red'
    } else {
        document.querySelector('input').style.borderColor = 'cornsilk'
    }

    let general = () => {
        document.getElementById('city').innerHTML = data.city.name
        document.getElementById('time').innerHTML = `${new Date().getUTCHours()}:${new Date().getUTCMinutes()}:${new Date().getUTCSeconds()}`
        setInterval(() => {
            document.getElementById('time').innerHTML = `${new Date().getUTCHours()}:${new Date().getUTCMinutes()}:${new Date().getUTCSeconds()}`
        },1000)
        document.getElementById('dateWether').innerHTML = `погода на: ${data.list[0].dt_txt}`
        document.getElementById('generalPnj').src = ` http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png`
        document.getElementById('WeatherStan').innerHTML = data.list[0].weather[0].description
        document.getElementById('temp').innerHTML = `${parseInt(data.list[0].main.temp)}  C&deg`
        document.getElementById('temFelt').innerHTML = `Відчувається як: ${parseInt(data.list[0].main.feels_like)}  C&deg`
        document.getElementById('temp_max').innerHTML = `Максимальна: ${parseInt(data.list[0].main.temp_max)}  C&deg`
        document.getElementById('temp_min').innerHTML = `Мінімальна: ${parseInt(data.list[0].main.temp_min)}  C&deg`

        document.getElementById('humidity').innerHTML = `Вологість: ${data.list[0].main.humidity}  %`
        document.getElementById('pressure').innerHTML = `Тиск: ${data.list[0].main.pressure}  Па`
        document.getElementById('sea_level').innerHTML = `Рівень моря: ${data.list[0].main.sea_level}  м.`
        document.getElementById('visibility').innerHTML = `Видимість: ${data.list[0].visibility}  м.`

    }
    general()
    let newElementTable = () => {
       for (let i = 0; i < data.list.length; i++) {
        let tr = document.getElementById('ollInformaition')
           tr.insertAdjacentHTML('beforeend',
               `<td>${data.list[i].dt_txt}</td>
                <td>${parseInt(data.list[i].main.temp)}  C&deg</td>
                <td>${parseInt(data.list[i].main.feels_like)} C&deg</td>
                <td>${parseInt(data.list[i].main.temp_max)}  C&deg</td>
                <td>${parseInt(data.list[i].main.temp_min)}  C&deg</td>
                <td>${data.list[i].visibility/1000}  км.</td>
                <td>${data.list[i].main.pressure}  Па</td>
                <td>${data.list[i].wind.speed}  м/с</td>
                <td>${data.list[i].main.humidity}  %</td>
                <td>${data.list[0].main.sea_level}  м.</td>
                <td>${data.list[i].weather[0].description}</td>
                <td><img style="width: 45px;" src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" ></td>`)
        }
        document.querySelector('.search').style.display = 'none'
        document.querySelector('.weather').style.display = 'block'
        window.addEventListener("keypress", (e) => {
            if (e.which == 27) {
                console.log(e)
            }
        })
        document.getElementById('btnBack').addEventListener('click', back = () => {
            document.querySelector('.search').style.display = 'block'
        document.querySelector('.weather').style.display = 'none'
        })
    }
    newElementTable()
    
}
