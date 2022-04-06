"use strict";

var data;
fetch("http://raspberrypi.local/DataBase/Todo.json")
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
                todersClone.querySelector(".todersdesc").textContent = element.Description.slice(0,20) + "...";
                todersClone.classList.remove("d-none");
                todersCon.appendChild(todersClone);

                todersClone.addEventListener("click", ()=>{
                    document.getElementById("Title").textContent = element.Name;
                    document.getElementById("text").textContent = element.Description;
                    document.getElementById("adding").classList.add("d-none");
                    note.classList.remove("d-none");
                });
            }
        });
    }
}
/*

document.getElementById("addingForm").addEventListener("submit", (event)=>{
    event.preventDefault();
    console.log(event.target.theShmeat.value);
    //document.getElementById("adding").classList.add("d-none");

    var argus = {
        "cat" : event.target.cater.value,
        "Title" : event.target.tit.value,
        "text" : event.target.theShmeat.value
    };
    console.log(argus);

    //var note = document.getElementById("note");
//
    //note.appendChild(magic);
});
*/