const isPalindrome = str => {
  const stripped = str.toLowerCase().replace(/[^a-z0-9]/ig, '');
  if(stripped.length <= 1) { return true; }
  const length = stripped.length;
  for(let i = 0; i < length / 2; i++) {
    if(stripped[i] !== stripped[length-i-1]) {
      return false;
    }
  }
  return true;
};

console.log(isPalindrome('kayak'));
console.log(isPalindrome('purple'));
console.log(isPalindrome('able was i, ere I saw elba.'));

console.time('long palindrome');
console.log(isPalindrome('Dennis, Nell, Edna, Leon, Nedra, Anita, Rolf, Nora, Alice, Carol, Leo, Jane, Reed, Dena, Dale, Basil, Rae, Penny, Lana, Dave, Denny, Lena, Ida, Bernadette, Ben, Ray, Lila, Nina, Jo, Ira, Mara, Sara, Mario, Jan, Ina, Lily, Arne, Bette, Dan, Reba, Diane, Lynn, Ed, Eva, Dana, Lynne, Pearl, Isabel, Ada, Ned, Dee, Rena, Joel, Lora, Cecil, Aaron, Flora, Tina, Arden, Noel, and Ellen sinned.'));
console.timeEnd('long palindrome');
