import { generate } from "https://esm.sh/random-words";

// ======== Setup ========
let word = generate().toUpperCase();
let chars = word.split("");
let used_chars = [];
let char_guessed = 0;
let error = 0;

const parts_ordered = [
    "head",
    "torso",
    "right-arm",
    "left-arm",
    "right-leg",
    "left-leg"
];

// ======== Render Word Placeholders ========
const placeholder = document.body.querySelector("#word-placeholder");
for (let i = 0; i < chars.length; i++) {
    placeholder.innerHTML += `
        <div class="char char${i + 1}" style="text-align:center;font-size:70px;">
            <div class="c" style="visibility:hidden;">${chars[i]}</div>
            <img 
                src="assets/dash.svg" 
                alt="____" 
                class="dash" 
                style="position:relative;top:-70px;"
            >
        </div>`;
}

// ======== Handle Key Input ========
function keyInput(e) {
    const pressed_key = e.key.toUpperCase();
    const isLetter = /^[A-Z]$/.test(pressed_key);

    if (!isLetter) return; // ignore non-letters
    if (used_chars.includes(pressed_key)) return alert("Key Already Used!");

    used_chars.push(pressed_key);

    if (chars.includes(pressed_key)) {
        // Reveal all matching letters
        chars.forEach((char, idx) => {
            if (char === pressed_key) {
                const el = document.querySelector(`#word-placeholder .char${idx + 1} .c`);
                el.style.visibility = "visible";
                char_guessed++;
            }
        });

        // Win condition
        if (char_guessed === word.length) {
            setTimeout(() => {
                alert("🎉 You win!");
                 const letters = document.getElementsByClassName("c");
               for (let el of letters) {
                   el.style.color = "green";
                }
                document.removeEventListener("keydown", keyInput);
            }, 50);
        }


    } else {
        // Wrong guess
        document.querySelector(`#setup #${parts_ordered[error]}`).style.visibility = "visible";
        error++;

        // Lose condition
        if (error >= parts_ordered.length) {
           setTimeout(() => {
               const letters = document.getElementsByClassName("c");
               for (let el of letters) {
                   el.style.color = "red";
                }
                alert(`💀 You lose  ! The word was: ${word}`);
                document.removeEventListener("keydown", keyInput);
            }, 50);
        }
    }
}

// ======== Event Listener ========
document.addEventListener("keydown", keyInput);
