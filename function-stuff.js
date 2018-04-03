function sayName() {
  console.log(this.name);
}

const createPerson = (name, age, homeState) => {
  var results = {
    name,
    age,
    homeState,
    sayName
  };
  return results;
};

const zack = createPerson('Zack', 24, 'Utah');
const other = createPerson('Other', 35, 'Arkansas');
zack.sayName();
other.sayName();
