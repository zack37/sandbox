/*
 *  {
 *    special: { setuid, setgid, sticky },
 *    user: { read, write, executable },
 *    group: { read, write, executable },
 *    other: { read, write, executable }
 *  }
 */

// const encode = ({ special, user, group, other }) => {
//   let retVal = '';

//   for(const set in [special, user, group, other]) {
//     let bit = '';
//     for(const idx in [2,1,0]) {

//     }
//     retVal += bit;
//   }

//   return retVal;
// };

const toBool = bit => bit === '1';

/*
 *  [0-7]{4}
 */
const decode = bits => {
  const [special, user, group, other] = bits.split('').map(bit =>
    Number(bit)
      .toString(2)
      .padStart(3, '0'),
  );

  return {
    special: {
      setuid: toBool(special[0]),
      setgid: toBool(special[1]),
      sticky: toBool(special[2]),
    },
    user: {
      read: toBool(user[0]),
      write: toBool(user[1]),
      executable: toBool(user[2]),
    },
    group: {
      read: toBool(group[0]),
      write: toBool(group[1]),
      executable: toBool(group[2]),
    },
    other: {
      read: toBool(other[0]),
      write: toBool(other[1]),
      executable: toBool(other[2]),
    },
  };
};

console.log(decode('2212'));
console.log(decode('0743'));
