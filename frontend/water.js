console.log("Working");

let form = document.getElementById("form");
var ans = '';
var obj = {}

form.addEventListener("submit", e => {
    e.preventDefault();

    document.getElementById("ans").innerHTML = "Loading Please Wait..."
    ph = document.getElementById("ph").value;
    hard = document.getElementById("hard").value;
    solids = document.getElementById("solids").value;
    amines = document.getElementById("amines").value;
    sulphur = document.getElementById("sulphur").value;
    conductivity = document.getElementById("conductivity").value;
    carbon = document.getElementById("carbon").value;
    methane = document.getElementById("methane").value;
    turbidity = document.getElementById("turbidity").value;
    //console.log(n,p,k,hum,temp,rain,ph);

    //console.log(typeof(n))

    obj.ph = parseInt(ph)
    obj.hard = parseInt(hard)
    obj.solids = parseInt(solids)
    obj.amines = parseInt(amines)
    obj.sulphur = parseInt(sulphur)
    obj.conductivity = parseInt(conductivity)
    obj.carbon = parseInt(carbon)
    obj.methane = parseInt(methane)
    obj.turbidity = parseInt(turbidity)
    //console.log(JSON.stringify(obj))

    //fetchdata()
    console.log(JSON.stringify(obj))

    if (ph < 0 || ph > 14) {
        document.getElementById("ans").innerHTML = "Wrong Ph value"
    }
    
    else {
        fetch('http://localhost:3000/water', {
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
                str = `Water Contamination level is ${data.ans}`
                document.getElementById("ans").innerHTML = str
            })
            .catch(err => {
                console.log("Error:", err);
                document.getElementById("ans").innerHTML = "Some error occured"
            })
    }

});
