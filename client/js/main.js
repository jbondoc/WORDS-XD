let player_points = 0;
var all_letters = new Array(7);
var letter_group = new Array(7);
var used_letters = new Array(7);
var valid_words = [];


document.getElementById('new-letters').addEventListener('click', function(e) {
   let letters = document.getElementsByClassName('letters')[0];
   letters.innerHTML = '';
   let letter_array = makeLetters();
   lettersToStrArray(letter_array);

   letter_array.forEach( function (element) {
      letters.appendChild(element);
   });
});

/*
document.getElementById('word-input').addEventListener('keydown', function(e) {

   if (e.keyCode == 13) {
      let word = this.value.toLowerCase();
      if(partOfLetters(letter_group, word)) {
         
         let result = document.getElementById('result-message');

         if(isWord(word)) {
            let points = isWord(word);
            player_points += points;
            result.innerHTML = '+' + points + ' points!';
         } else {
            result.innerHTML = "'" + word + "' is NOT a word!";
         }

         document.getElementById('points').innerHTML = player_points;


         
      } else {
         result.innerHTML = word + ' is NOT a part of the letters!';
      }
       this.value = '';
   }
});*/

//test words
function isWord(word) {
   let words = ['hi','bye','to','win','fin','pi','try','lie','ly','ass','as','my','too','boo','moo','vu','i','car','ill','fill','part','pop','stop','wept','pod','pin','win','at','aww','tat','vibe','god','try','in','door','floor'];
   for (i in words) {
      if(word == words[i]) {
         return word.length;
      } 
   }
   return 0;
}

function partOfLetters(letters, word) {
   let str = word.split('');
   for (i in str) {
      if (letters.indexOf(str[i]) == -1) {
         console.log('no', str[i], letters, word);
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
      console.log(used_letters.join(''));
      console.log("enter");
      if(isWord(used_letters.join(''))){
         player_points += used_letters.join('').length;
         document.getElementById('points').innerHTML = player_points;
      }
      // console.log($('used-letters').children());
      $('.used-letters').empty();
      $('.letters').empty();
      reset();
      return;
   }
   if(letter_group.includes(e.key)){
       console.log(e.key);
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
   else{
      console.log("not present");
   }
});


