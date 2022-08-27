const source = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!?*";
const copyBtn = document.querySelector(".generated-pass i");
const body = document.body;
const form = document.forms[0];
let pass = "";
// select boxes


function generatePassword() {
    const passwordGenerated = document.querySelector(".generated-pass span");
    let numOfChars = document.querySelector(".num-of-chars");
    let passState = document.querySelector(".state");
    let btn = document.querySelector(".generated-pass i");
    // upper
    let upper = document.querySelector(".upper");
    // lower
    let lower = document.querySelector(".lower");
    // numbers
    let nums = document.querySelector(".numbers");
    // special chars
    let specials = document.querySelector(".symbols");
    //password length
    let passLen = produceLength(8, 20);
    for(let i = 0; i < passLen; i++) {
        // get a random index of the source
        let index = Math.floor(Math.random() * source.length);
        // get the character of the index returned
        let char = source[index];
        // check what kind of characters to allow
        if((!upper.checked && /[A-Z]/.test(char)) || (!lower.checked && /[a-z]/.test(char)) || (!nums.checked && /[0-9]/.test(char)) || (!specials.checked && /[^a-zA-Z0-9]/.test(char))) {
            continue;
        } else {
            pass += (char);
        }
    }
    passwordGenerated.innerText = pass;
    numOfChars.innerText = pass.length;
    setRange(passwordGenerated);
    setStrength(pass.length, passState);
    copyPass(btn, passwordGenerated, body);
    pass = "";

}

//console.log(password);
form.addEventListener("submit", function(e) {
    //passwordGenerated.textContent = "";
    e.preventDefault();
    generatePassword();  
});

// generate a random number between to numbers
function produceLength(min,max) {
    let len = Math.floor(Math.random() * (max - min + 1) + min );
    return len;
}

// Put the range ball at the right position
function setRange(el) {
    let range = document.querySelector("#range");
    range.value = el.textContent.length;
}

// set the password status
function setStrength(n, el) {
    //n is the length of the password generated
    // el is the status name by default will be medium
    let rects = Array.from(document.querySelectorAll(".rect"));
    if (n < 12){
        el.textContent = "Low";
        rects[0].style.backgroundColor = "yellow";
        rects[1].style.backgroundColor = "yellow";
        rects[2].style.backgroundColor = "white";
        rects[3].style.backgroundColor = "white";
    } else if (n >= 12 && n < 16){
        el.textContent = "Medium";
        rects[0].style.backgroundColor = "yellow";
        rects[1].style.backgroundColor = "yellow";
        rects[2].style.backgroundColor = "yellow";
        rects[3].style.backgroundColor = "white";
    }else if (n >= 16) {
        el.textContent = "Strong";
        rects.forEach(r => r.style.backgroundColor = "yellow");
    }else {
        el.textContent = "";
        rects.forEach(r => r.style.backgroundColor = "white");
    }
}

//Copy the generated password
function copyPass(btn, textEl, body) {
    // btn is the icon element to click on
    // textEl is the the parent that holds the generated password
    btn.addEventListener("click", function() {
        // get generated password
        let text = textEl.textContent;
        // create an input element
        let input = document.createElement("input");
        // set its tyoe to be text
        input.setAttribute("type", "text");
        // set its value to be generated password
        input.setAttribute("value", text);
        // append the input to the body
        body.appendChild(input);
        // use select method on input so you can select its value
        input.select();
        // call execComment with Copy as argument (C is capitale)
        document.execCommand("Copy");
        // Remove the input element
        body.removeChild(input);
    });
}