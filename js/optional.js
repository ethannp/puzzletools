document.getElementById("query").addEventListener("input", e => {
    refresh();
});
document.getElementById("input-small").addEventListener("input", e => {
    refresh();
});
document.getElementById("single").addEventListener("input", e => {
    refresh();
});
function refresh() {
    let value = document.getElementById("query").value.toLowerCase().replace(/[^a-z]+/g, "");
    document.getElementById("query").value = value;
    let result = "";
    for (let i = 0; i < value.length; i++) {
        result += value[i] + "?"
    }
    if(document.getElementById("anagram").checked){
        result = `<${result}>`
    }
    if(document.getElementById("single").checked){
        result = `"${result}"`
    }
    if (document.getElementById("input-small").value != "") {
        result += `%26_%7B${document.getElementById("input-small").value}%7D`;
    }
    document.getElementById("redirect").href = `https://nutrimatic.org/?q=${result}&go=Go`
}