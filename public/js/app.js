
console.log("Client side js file loaded")

// fetch('https://puzzle.mead.io/puzzle').then((res)=> {
//     res.json().then((data)=> {
//         console.log(data);
//     })
// })



document.getElementById('submit').addEventListener('click',(e)=> {

        e.preventDefault()

        const address = document.querySelector('input').value;
        const url = '/weather?address='+address;

        document.querySelector('#p1').innerHTML = "Loading...."
        document.querySelector('#p2').innerHTML = "";

        fetch(url).then((response)=> {
        response.json().then((data)=> {
        if(data.error) {
            console.log(data.error);
            document.querySelector('#p1').innerHTML = data.error;
            document.querySelector('#p2').innerHTML = "";
        }
        else {
            document.querySelector('#p1').innerHTML = data.location;
            console.log(data.location)
            document.querySelector('#p2').innerHTML = data.info;
        }
    })
})
        
})
