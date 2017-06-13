/*
 *  {
 *    special: { setuid, setgid, sticky },
 *    user: { read, write, executable },
 *    group: { read, write, executable },
 *    other: { read, write, executable }
 *  }
 */

const encode = bits => {};

const toBool = bit => bit === '1';

/*
 *  [0-7]{4}
 */
const decode = bits => {
  const bitsInBinary = bits.split('').map(bit => (+bit).toString(2));

  const [special, user, group, other] = bitsInBinary;
  console.log(bitsInBinary);
  return {
    special: {
      setuid: toBool(special[2]),
      setgid: toBool(special[1]),
      sticky: toBool(special[0])
    },
    user: {
      read: toBool(user[2]),
      write: toBool(user[1]),
      executable: toBool(special[0])
    },
    group: {
      read: toBool(group[2]),
      write: toBool(group[1]),
      executable: toBool(group[0])
    },
    other: {
      read: toBool(other[2]),
      write: toBool(other[1]),
      executable: toBool(other[0])
    }
  };
};

console.log(decode('2212'));
