let fact=(n, p=1)=>n<0?-1:n<=1?p:fact(n-1, p*n); 

const limit = parseInt(process.argv[2], 10) || 5;

console.log(fact(limit));
