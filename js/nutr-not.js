let result;

function copy() {
    var inp = document.createElement('input');
    document.body.appendChild(inp)
    inp.value = result;
    inp.select();
    document.execCommand('copy', false);
    inp.remove();
    alert("Copied!");
}
let typed = false;
let nots = [];
document.getElementById("query").addEventListener("input", e => {
    if (!typed) {
        document.getElementById("result").removeAttribute("hidden");
    }
    let text = document.getElementById("query").value.toLowerCase().replace(/[^a-z()? ]+/g, "");
    let arr = [];
    let balanced = true;
    let open = false;
    let inparen = "";
    for (let i = 0; i < text.length; i++) {
        if (text.substring(i, i + 1) == "(") {
            if (open) {
                balanced = false;
            } else {
                open = true;
            }
        } else if (text.substring(i, i + 1) == ")") {
            if (open && inparen.length != 0) {
                arr.push(inparen);
                inparen = "";
                open = false;
            } else {
                balanced = false;
            }
        } else if (open) {
            inparen += text.substring(i, i + 1);
        } else {
            arr.push(text.substring(i, i + 1));
        }
    }
    if (balanced && !open) {
        nots = [];
        document.getElementById("balanced").hidden = true;
        let holder = document.getElementById("not");
        removeAllChildNodes(holder);
        let counter = 0;
        arr.forEach((char) => {
            let child = document.createElement("span");
            if(char == "?" || char == " "){
                child.classList.add("char2");
            }
            else{
                child.classList.add("char");
            }
            child.innerHTML = char;
            holder.appendChild(child);
            if (nots[counter] && !(char == "?" || char == " ")) {
                child.classList.add("not");
            }
            if (char != "?" && char != " ") {
                child.addEventListener("click", e => {
                    if (child.classList.contains("not")) {
                        child.classList.remove("not");
                    } else {
                        child.classList.add("not");
                    }
                    refreshResult();
                })
            }
            counter++;
        });

        refreshResult();

    } else {
        document.getElementById("balanced").hidden = false;;
    }
});

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        if (parent.firstChild.classList) {
            if (parent.firstChild.classList.contains("not")) {
                nots.push(true);
            } else {
                nots.push(false)
            }
        }
        parent.removeChild(parent.firstChild);
    }
}

function refreshResult() {
    let children = document.getElementById("not").children;
    result = "";
    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        if (!child.classList.contains("not")) {
            if (child.innerHTML.length == 1) {
                result += child.innerHTML;
            } else {
                result += "[" + child.innerHTML + "]";
            }
        } else {
            alphabet = "abcdefghijklmnopqrstuvwxyz"
            if (child.innerHTML.length == 1) {
                if (child.innerHTML == "a") {
                    result += "[b-z]"
                } else if (child.innerHTML == "z") {
                    result += "[a-y]";
                } else {
                    result += "[a-" + alphabet.substring(alphabet.indexOf(child.innerHTML) - 1, alphabet.indexOf(child.innerHTML)) +
                        alphabet.substring(alphabet.indexOf(child.innerHTML) + 1, alphabet.indexOf(child.innerHTML) + 2) + "-z]";
                }
            } else {
                let re = new RegExp(`[${child.innerHTML}]+`, "g")
                result += "[" + alphabet.replace(re, "") + "]";
            }
        }
    }
    if (document.getElementById("single").checked) {
        result = "\"" + result + "\"";
    }

    result = result.replace(/\?/g, "A");

    document.getElementById("redirect").href = `https://nutrimatic.org/?q=${result}&go=Go`
}


document.getElementById("single").addEventListener("change", e => {
    refreshResult();
})