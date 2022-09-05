console.log("Working");

let form = document.getElementById("form");
var ans = '';
var obj = {}

form.addEventListener("submit", e => {
    e.preventDefault();
    document.getElementById("ans").innerHTML = "Please Wait... this may take few minutes..."
    
    age = document.getElementById("age").value;
    smoke = document.getElementById("smoke").value;
    yellow = document.getElementById("yellow").value;
    anxiety = document.getElementById("anxiety").value;
    peer = document.getElementById("peer").value;
    chronic = document.getElementById("chronic").value;
    fatigue = document.getElementById("fatigue").value;
    allergy = document.getElementById("allergy").value;
    wheeze = document.getElementById("wheeze").value;
    alcohol = document.getElementById("alcohol").value;
    cough = document.getElementById("cough").value;
    breath = document.getElementById("breath").value;
    swallow = document.getElementById("swallow").value;
    chest = document.getElementById("chest").value;
    gender = document.getElementById("gender").value;
    
    
    

    obj.age = parseInt(age)
    obj.smoke = parseInt(smoke)
    obj.yellow = parseInt(yellow)
    obj.anxiety = parseInt(anxiety)
    obj.peer = parseInt(peer)
    obj.chronic = parseInt(chronic)
    obj.fatigue = parseInt(fatigue)
    obj.allergy = parseInt(allergy)
    obj.wheeze = parseInt(wheeze)
    obj.alcohol = parseInt(alcohol)
    obj.cough = parseInt(cough)
    obj.breath = parseInt(breath)
    obj.swallow = parseInt(swallow)
    obj.chest = parseInt(chest)
    obj.gender = parseInt(gender)
    //console.log(JSON.stringify(obj))

    //fetchdata()
    console.log(JSON.stringify(obj))

    if (age < 0 || age > 100) {
        document.getElementById("ans").innerHTML = "Age should be between 1-100"
    }
    
    else {
        fetch('http://localhost:3000/lung', {
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
                str = `The possibility of Lung Cancer is ${data.ans}`
                document.getElementById("ans").innerHTML = str
            })
            .catch(err => {
                console.log("Error:", err);
                document.getElementById("ans").innerHTML = "Some error occured"
            })
    }

});
