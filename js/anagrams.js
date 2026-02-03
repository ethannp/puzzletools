document.getElementById("query1").addEventListener("input", e => {
    check();
})
document.getElementById("query2").addEventListener("input", e => {
    check();
})

function check() {
    let anagramflag = true;
    let t1 = normalize(document.getElementById("query1").value);
    let t2 = normalize(document.getElementById("query2").value);

    document.getElementById("len1").textContent = t1.length;
    document.getElementById("len2").textContent = t2.length;
    if (t1.length != t2.length) {
        flag = false;
    }

    let fre1 = counter("abcdefghijklmnopqrstuvwxyz" + t1);
    let fre2 = counter("abcdefghijklmnopqrstuvwxyz" + t2);
    for (const [key, value] of Object.entries(fre1)) {
        let frkey1 = value;
        let frkey2 = fre2[key];
        document.getElementById("count-" + key).textContent = `${frkey1}/${frkey2}`;
        if (frkey1 == frkey2) {
            if (frkey1 == 0) {
                document.getElementById("char-"+key).classList.remove("char-good");
                document.getElementById("char-"+key).classList.remove("char-bad");
            } else {
                document.getElementById("char-"+key).classList.remove("char-bad");
                document.getElementById("char-"+key).classList.add("char-good");
            }
        } else {
            document.getElementById("char-"+key).classList.remove("char-good");
            document.getElementById("char-"+key).classList.add("char-bad");
            anagramflag = false;
        }
    }
    if (anagramflag) {
        document.getElementById("result").textContent = "Anagrams!"
        document.getElementById("result").classList.remove("result-bad");
        document.getElementById("result").classList.add("result-good");
    } else {
        document.getElementById("result").textContent = "Not Anagrams!"
        document.getElementById("result").classList.remove("result-good");
        document.getElementById("result").classList.add("result-bad");
    }
}

function counter(str) {
    return str.split('').reduce((total, letter) => {
        total[letter] === undefined ? total[letter] = 0 : total[letter]++;
        return total;
    }, {});
}

function normalize(text) {
    return text.toLowerCase().replace(/[^a-z]/g, "");
}