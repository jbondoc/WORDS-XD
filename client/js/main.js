




document.getElementById('new-letters').addEventListener('click', function(e) {
    let letters = document.getElementsByClassName('letters')[0];
    letters.innerHTML = '';
    let letter_array = makeLetters();

    letter_array.forEach( function (element) {
        letters.appendChild(element);
    });
});

function makeLetters() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let letters = new Array(7);

    for (let i = 0; i < letters.length ; i++) {
        let div = document.createElement('div');
        div.className = 'letter-block';
        div.innerHTML = possible.charAt(Math.floor(Math.random() * possible.length));
        console.log(div);
        letters[i] = div;
    }
   console.log(letters);
    return letters;
}