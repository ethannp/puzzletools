document.getElementById("cell").addEventListener("input", (e) => {
    change();
});

document.getElementById("ref").addEventListener("change", (e) => {
    change();
});

function change() {
    let vars = document.getElementsByClassName("c");
    let value = document.getElementById("cell").value
    for (let i = 0; i < vars.length; i++) {
        vars[i].innerHTML = value ? document.getElementById("ref").checked ? "$" + value.substring(0, value.search(/\d/)) + "$" + value.substring(value.search(/\d/)) : value : "$cell";
    }
}