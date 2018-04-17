let player_points = 0;
var all_letters = new Array(7);
var letter_group = new Array(7);
var used_letters = new Array(7);
var used_words = [];


document.getElementById('new-game-button').addEventListener('click', function(e) {
   let letters = document.getElementsByClassName('letters')[0];
   letters.innerHTML = '';
   let letter_array = makeLetters();
   lettersToStrArray(letter_array);

   letter_array.forEach( function (element) {
      letters.appendChild(element);
   });
   player_points = 0;
   document.getElementById('points').innerHTML = player_points;
   
   used_letters.splice(0, used_letters.length);
   $('.used-letters').empty();
});

function isWord(word) {
   var isWord;
   var url = "https://api.datamuse.com/words?sp=" + word + "&max=1&md=d";
   var xhr = new XMLHttpRequest();
   xhr.open("GET", url, false);
   xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
       var resp = JSON.parse(xhr.responseText);    
       if(used_words.indexOf(word) <= -1 && resp.length > 0 && resp[0].hasOwnProperty('defs')){
         used_words.push(word);
         isWord = true;
       }
       else{
         isWord = false;
       }
     }
   }
   xhr.send();

   return isWord;
}

function partOfLetters(letters, word) {
   let str = word.split('');
   for (i in str) {
      if (letters.indexOf(str[i]) == -1) {
         return false;
      }
   }
   return true;
}

function lettersToStrArray (divs) {
   for (i in divs) {
      letter_group[i] = divs[i].innerHTML.toLowerCase(); 
   }
   all_letters = letter_group.slice();
}

//test lettering
function makeLetters() {
   let text = "";
   let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   let letters = new Array(7);

   for (let i = 0; i < letters.length ; i++) {
      let div = document.createElement('div');
      div.className = 'letter-block';
      div.innerHTML = possible.charAt(Math.floor(Math.random() * possible.length));
      letters[i] = div;
   }
   return letters;
}

function reset(){
   used_letters.splice(0, used_letters.length);
   letter_group = all_letters.slice();
    let letters = document.getElementsByClassName('letters')[0];
    for (let i = 0; i < letter_group.length ; i++) {
      let div = document.createElement('div');
      div.className = 'letter-block';
      div.innerHTML = letter_group[i].toUpperCase();
      letters.appendChild(div);
   }
}

$(document).on("keypress", function (e) {
   if(e.keyCode == 13){   
      if(isWord(used_letters.join('')) == true){
         player_points += used_letters.join('').length;
         document.getElementById('points').innerHTML = player_points;
      }
      $('.used-letters').empty();
      $('.letters').empty();
      reset();
      return;
   }
   if(letter_group.includes(e.key)){
       let letters = document.getElementsByClassName('letters')[0];
       letters.removeChild(letters.childNodes[letter_group.indexOf(e.key)]);
       letter_group.splice(letter_group.indexOf(e.key),1);
       let div = document.createElement('div');
       div.className = 'letter-block';
       div.innerHTML = e.key.toUpperCase();
       let used = document.getElementsByClassName('used-letters')[0];
       used.appendChild(div);
       used_letters.push(e.key);
   }
});


