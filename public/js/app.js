console.log('Client side javascript file is loaded!');

// Select the form
const weatherForm = document.querySelector('form');
//Select text box
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = 'From JavaScript';

//Catch Event submit from form
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const location = search.value;    
    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = '';
    
    // Call to weather api, from our local dev. (Folder web-server)
    // Localhost does not exist on Heroku
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error; 
                //console.log(data.error);
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });

    //console.log(data);
});




// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     });
// });