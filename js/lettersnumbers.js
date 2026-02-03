const lettersInput = document.getElementById('letters');
const numbersInput = document.getElementById('numbers');

let isUpdating = false;

// Helper to update value without losing cursor position
function updateValuePreservingCursor(element, newValue) {
    const start = element.selectionStart;
    // Calculate offset based on length change (rough approximation for simple filtering)
    const oldLen = element.value.length;

    element.value = newValue;

    // If the new value is shorter (char deleted), shift cursor back
    // If we are at the end, keep at end
    const newLen = element.value.length;
    if (start <= newLen) {
        element.setSelectionRange(start - (oldLen - newLen), start - (oldLen - newLen));
    }
}

// Left: Allow only A-Z
lettersInput.addEventListener('input', () => {
    if (isUpdating) return;
    isUpdating = true;

    // 1. Sanitize: Uppercase and remove anything that isn't A-Z
    const raw = lettersInput.value.toUpperCase();
    const clean = raw.replace(/[^A-Z ]/g, '');

    // Update the left box if sanitization changed anything
    if (lettersInput.value !== clean) {
        updateValuePreservingCursor(lettersInput, clean);
    }

    // 2. Convert to numbers
    const numbers = [];
    for (let i = 0; i < clean.length; i++) {
        const char = clean[i];
        if (char === ' ') {
            numbers.push("/");
        }
        else {
            numbers.push(char.charCodeAt(0) - 64);
        }
    }

    // 3. Update right side
    numbersInput.value = numbers.join(' ');

    isUpdating = false;
});

// Right: Allow only 0-9 and Space
numbersInput.addEventListener('input', () => {
    if (isUpdating) return;
    isUpdating = true;

    // 1. Sanitize: Allow digits and spaces only and  slash
    const raw = numbersInput.value;
    const clean = raw.replace(/[^0-9\/ ]/g, '');

    // Update the right box if sanitization changed anything
    if (numbersInput.value !== clean) {
        updateValuePreservingCursor(numbersInput, clean);
    }

    // 2. Convert to letters
    const tokens = clean.split(' ').filter(t => t !== "");
    let result = "";

    tokens.forEach(token => {
        const num = parseInt(token, 10);
        if (num >= 1 && num <= 26) {
            result += String.fromCharCode(num + 64);
        } else if (token == "/") {
            result += " ";
        } else {
            result += "?"
        }
    });

    // 3. Update left side
    lettersInput.value = result;

    isUpdating = false;
});