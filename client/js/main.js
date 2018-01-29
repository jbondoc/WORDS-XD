let player_points = 0;
const letter_group = new Array(7);


document.getElementById('new-letters').addEventListener('click', function(e) {
   let letters = document.getElementsByClassName('letters')[0];
   letters.innerHTML = '';
   let letter_array = makeLetters();
   lettersToStrArray(letter_array);

   letter_array.forEach( function (element) {
      letters.appendChild(element);
   });
});


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
});

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