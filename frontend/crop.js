console.log("Working");

let form = document.getElementById("form");
var plant = '';
var obj = {}

form.addEventListener("submit", e => {
    e.preventDefault();

    document.getElementById("ans").innerHTML = "Loading... Please Wait.."
    n = document.getElementById("n").value;
    p = document.getElementById("p").value;
    k = document.getElementById("k").value;
    hum = document.getElementById("hum").value;
    temp = document.getElementById("temp").value;
    rain = document.getElementById("rain").value;
    ph = document.getElementById("ph").value;
    //console.log(n,p,k,hum,temp,rain,ph);

    //console.log(typeof(n))

    obj.n = parseInt(n)
    obj.p = parseInt(p)
    obj.k = parseInt(k)
    obj.hum = parseInt(hum)
    obj.temp = parseInt(temp)
    obj.rain = parseInt(rain)
    obj.ph = parseInt(ph)
    //console.log(JSON.stringify(obj))

    //fetchdata()
    console.log(JSON.stringify(obj))

    if (ph < 0 || ph > 14) {
        document.getElementById("ans").innerHTML = "Wrong Ph value"
    }
    else if (hum < 0 || hum > 100) {
        document.getElementById("ans").innerHTML = "Wrong humidity value"
    }
    else if (temp < 0 || temp > 60) {
        document.getElementById("ans").innerHTML = "Incorrect temperature"
    }
    else if (n < 0 || p < 0 || k < 0) {
        document.getElementById("ans").innerHTML = "Wrong parameters"
        
    }

    else {
        fetch('http://localhost:3000/crop', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            // mode : 'no-cors'
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                str = `The recommended crop is ${data.ans}`
                document.getElementById("ans").innerHTML = str
            })
            .catch(err => {
                console.log("Error:", err);
                document.getElementById("ans").innerHTML = "Some error occured"
            })
    }

});

/* async function fetchdata() {
     
    console.log(obj)
    
    const res = await fetch('http://localhost:3000/crop', {
          method: 'POST',
          body: JSON.stringify(obj),
          headers: {
              'Content-type': 'application/json'
          },
          mode : 'no-cors'
    });
    const result = await res.json()
    plant = result
    console.log(plant)
    str = `The recommended crop is ${plant}`
    document.getElementById(ans).innerHTML = str
  } 
 */