let rows = 0;
document.getElementById("redirect").addEventListener("click", function(e){
    fetch("https://api.datamuse.com/words?rel_jja=white")
    .then(function(res){
        return res.json();
    }).then(function (data){
        console.log(data);
        append(data);
    })
    .catch(function(err){
        //no results, or other error
        console.log(err);
    })
})

function append(data){
    let cont = document.getElementById("content");
    removeall(cont);
    for(let i=0; i<data.length; i++){
        let tr= document.createElement("tr");
        let td = document.createElement("td");
        td.innerHTML = data[i].word;
        tr.appendChild(td);
        cont.appendChild(tr);
    }
}

function removeall(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

document.getElementById("add").addEventListener('click', () => {
    if (rows < 15) {
        rows++;
        let tr = document.createElement("tr");
        let td0 = document.createElement("td");
        let td1 = document.createElement("td");
        td0.innerHTML = `<input id="c${rows*2}" class="char" type="text" onkeypress="return /[0-9]/i.test(event.key)" maxlength="4"></input>`
        td1.innerHTML = `<input id="c${rows*2+1}" class="char" type="text" onkeypress="return /[0-9]/i.test(event.key)" maxlength="4"></input>`
        tr.appendChild(td0);
        tr.appendChild(td1);
        document.getElementById("timings").appendChild(tr);
    }
});

document.getElementById("sub").addEventListener("click", () => {
    if (rows > 0) {
        rows--;
        document.getElementsByTagName("tr")[rows + 2].remove();
    }
});