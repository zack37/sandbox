function sayName() {
  console.log(this.name);
}

const createPerson = (name, age, homeState) => {
  const object = {
    name,
    age,
    homeState,
  };

  object.sayName = sayName.bind(object);

  return object;
};

const zack = createPerson('Zack', 24, 'Utah');
const other = createPerson('Other', 35, 'Arkansas');
zack.sayName();
other.sayName();
