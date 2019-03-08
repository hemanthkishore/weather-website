// console.log('Client side javascript file is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')



weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()
    const location = search.value

    msg1.textContent = 'Loading ...'
    msg2.textContent = ''

    if(!location) {
        console.log('Enter a Location')
    } else {
        const url = 'http://localhost:3000/weather?address=' + location
        fetch(url).then((response) => {
            response.json().then((data) =>{

                if(!data){
                    msg1.textContent = 'enter a valid location'
                } else {
                    msg1.textContent = data.forecast.location
                    msg2.textContent = data.forecast.temparature
                    // console.log(data.forecast.temparature)
                    // console.log(data.forecast.location)                    
                }

            })
        })    
    }

})