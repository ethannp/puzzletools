let input = document.getElementById("inputrot");

input.addEventListener("input", function () {
    let v = input.value;
    let ul = document.getElementById("ulresults")
    ul.innerHTML = "";
    for (let i = 0; i < 26; i++) {
        let s = `[+${String(i).padStart(2, "0")} / -${String(26-i).padStart(2,"0")}] ${shift(v, i)}`;

        let li = document.createElement("li");
        console.log(s);
        li.textContent = s;
        ul.appendChild(li);
    }
})

function shift(s, shift) {
  return s.split("").map(char => {
    if (/[a-z]/i.test(char)) {
      const base = char === char.toUpperCase() ? "A".charCodeAt(0) : "a".charCodeAt(0);
      const shifted = (char.charCodeAt(0) - base + shift) % 26 + base;
      return String.fromCharCode(shifted);
    }
    return char; // leave non-letters unchanged
  }).join("");
}
