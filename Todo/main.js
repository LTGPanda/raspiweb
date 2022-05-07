"use strict";

var data;
var timerObj;
var activCat = "";

fetch("http://255.255.255.255:3000/Todo/")
.then(response => response.json())
.then(json => setjson(json));

function setjson(json){
    data = json;
    var dataList = data.List;
    var catCon = document.getElementById("cat");
    var todersCon = document.getElementById("toders");
    var note = document.getElementById("note");
    var catex = document.getElementById("catEx");
    var toderex = document.getElementById("toderEx");

    document.getElementById("daButt").addEventListener("click", ()=>{
        document.getElementById("adding").classList.remove("d-none");
        note.classList.add("d-none");
        var optionholler = document.getElementById("browsers");

        for (let index = 0; index < dataList.length; index++) {
            var options = document.createElement("option");
            
            const item = dataList[index];
            options.value = item.Name;
            optionholler.appendChild(options);
        }
    });

    for (let index = 0; index < dataList.length; index++) {
        const item = dataList[index];

        var catClone = catex.cloneNode(true);
        catClone.querySelector(".catTitle").textContent = item.Name;
        catClone.querySelector(".catnmr").textContent = item.List.length;
        catClone.classList.remove("d-none");
        catCon.insertBefore(catClone, document.getElementById("daButt"));

        catClone.addEventListener("click", ()=>{
            while (todersCon.firstChild) {
                todersCon.removeChild(todersCon.lastChild);
            }
            for (let indox = 0; indox < item.List.length; indox++) {
                const element = item.List[indox];
                var todersClone = toderex.cloneNode(true);
                todersClone.querySelector(".todersTitle").textContent = element.Name;

                var desc = ""
                var descIndex = element.Description.slice(0,20).search("</br>")

                if(descIndex == -1){
                    desc = element.Description.slice(0,20) + "...";
                }
                else {
                    desc = element.Description.slice(0,descIndex)
                }

                todersClone.querySelector(".todersdesc").textContent = desc;
                todersClone.classList.remove("d-none");
                todersCon.appendChild(todersClone);

                todersClone.addEventListener("click", ()=>{
                    activCat = item.Name
                    document.getElementById("Title").textContent = element.Name;
                    document.getElementById("text").innerHTML = element.Description;
                    document.getElementById("adding").classList.add("d-none");
                    note.classList.remove("d-none");
                });
            }
        });
    }
}


document.getElementById("text").addEventListener("input", (e)=>{
    clearTimeout(timerObj)
    timerObj = setTimeout(timerTask, 5000)
});

function timerTask(){
    console.log(document.getElementById("text").innerHTML)
    var theSchmot = document.getElementById("text").children
    var theSchmeat = ""
    for (let index = 0; index < theSchmot.length; index++) {
        const item = theSchmot[index];
        theSchmeat = theSchmeat + item.textContent + " Bigschlingschlong "
    }

    theSchmeat = theSchmeat.replace('/', " onkalabonkala ")
    var theTit = document.getElementById("Title").textContent
    var argus = {
        "cat" : activCat,
        "Title" : theTit,
        "text" : theSchmeat
    };
    console.log(argus.text)
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST","http://255.255.255.255:3000/edit/" + JSON.stringify(argus),true);
    xmlhttp.send();
}

document.getElementById("addingForm").addEventListener("submit", (event)=>{
    event.preventDefault();

    var theText = event.target.theShmeat.value.replace(/(\r\n|\n|\r)/gm, " Bigschlingschlong ")
    theText = theSchmeat.replace('/', " onkalabonkala ")

    var argus = {
        "cat" : event.target.cater.value,
        "Title" : event.target.tit.value,
        "text" : theText
    };
    console.log(argus);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST","http://255.255.255.255:3000/Todo/" + JSON.stringify(argus),true);
    xmlhttp.send();

    event.target.cater.value = ""
    event.target.tit.value = ""
    event.target.theShmeat.value = ""

    document.getElementById("adding").classList.add("d-none");
    document.getElementById("note").classList.remove("d-none");
    console.log("lol wowo xf")
});
