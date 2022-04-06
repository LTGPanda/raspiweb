"use strict";
/*
make a grid or list of buttons that refferense all the webprojects that are active by way of funky programming or a json
a thing to add project
mayhaps some todos
*/


let mainBitch = document.getElementById("baseContainer");
let data;
fetch("http://raspberrypi.local/DataBase/projanList.json")
.then(response => response.json())
.then(json => setjson(json));

function setjson(json) {
    data = json;
    let rowObj = document.createElement("div");
    rowObj.classList.add("row");
    rowObj.classList.add("container");
    rowObj.classList.add("m-1");
    for (let i = 0; i < data.length; i++) {
        if(i%10 == 0 && i != 0){
            mainBitch.appendChild(rowObj);
            rowObj = document.createElement("div");
            rowObj.classList.add("row");
            rowObj.classList.add("container");
            rowObj.classList.add("m-1");
        }
        const item = data[i];
        let tempobj = document.createElement("button");
        tempobj.classList.add("btn");
        tempobj.classList.add("col");
        tempobj.classList.add("m-2");
        tempobj.classList.add("btn-lg");
        tempobj.classList.add("btn-primary");
        tempobj.textContent = item.name;
        tempobj.onclick = function() {
            location.href = "http://raspberrypi.local/" + item.path;
        }
        rowObj.appendChild(tempobj);
    }
    mainBitch.appendChild(rowObj);
}
