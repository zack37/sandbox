const { curry, forEach, isNil, map, prop } = require('lodash/fp');

const tree = {
  root: {
    _id: '8e4003dbf818f90637881e2d8e0efc66',
    _rev: '68-077b5a93880166c396a4912c8eb5b0bc',
    name: 'Corporate',
    type: 'division',
    org: 'sales',
    manager: {
      id: '59697',
      name: 'Chance Allred'
    },
    districtManager: [],
    market: '',
    _children: [
      {
        _id: '288f4954c602c2048c919b84a2dcbd7a',
        _rev: '5-fafe9ea707889e2dfe230b220e89be52',
        name: 'DM Pay Region',
        type: 'region',
        org: 'sales',
        parent: '8e4003dbf818f90637881e2d8e0efc66',
        market: '',
        districtManager: [],
        _parent: '8e4003dbf818f90637881e2d8e0efc66',
        _children: [
          {
            _id: 'dfc91f3b32f518f8543acbb79b98e36b',
            _rev: '2-bc6961f14ff89440bb918e8817bb80b3',
            name: 'NIS - Solar',
            type: 'office',
            org: 'sales',
            parent: '288f4954c602c2048c919b84a2dcbd7a',
            officeID: 3849,
            market: 'A',
            districtManager: [
              {
                id: '71815',
                name: 'Chris Black'
              }
            ],
            _parent: '288f4954c602c2048c919b84a2dcbd7a'
          },
          {
            _id: 'f56ae3b72e4b52c0f1527601a73f6caa',
            _rev: '15-001c6dce6f50305accb218aec3c9d757',
            name: 'TX-01 Austin Solar (Alternate)',
            type: 'office',
            org: 'sales',
            parent: '288f4954c602c2048c919b84a2dcbd7a',
            officeID: 50100,
            market: 'A',
            _parent: '288f4954c602c2048c919b84a2dcbd7a'
          }
        ]
      },
      {
        _id: '41b5444c67e95cfab80c1010be2903ff',
        _rev: '10-dd9e4b00387044735eeaaeca08e8d43b',
        name: 'Retail',
        type: 'region',
        org: 'sales',
        parent: '8e4003dbf818f90637881e2d8e0efc66',
        market: '',
        _parent: '8e4003dbf818f90637881e2d8e0efc66',
        _children: [
          {
            _id: '41b5444c67e95cfab80c1010be319249',
            _rev: '4-bebd15cb1f6fab607411f4f16e083c38',
            name: 'UT Retail',
            type: 'office',
            org: 'sales',
            parent: '41b5444c67e95cfab80c1010be2903ff',
            officeID: 50440,
            districtManager: [],
            _parent: '41b5444c67e95cfab80c1010be2903ff'
          },
          {
            _id: '41b5444c67e95cfab80c1010be31f7c7',
            _rev: '2-c36bee67cbffbe7e5f79767d9c15ea02',
            name: 'NJ South Retail',
            type: 'office',
            org: 'sales',
            parent: '41b5444c67e95cfab80c1010be2903ff',
            officeID: 50443,
            districtManager: [
              {
                id: '204265',
                name: 'Vedina Singh'
              }
            ],
            _parent: '41b5444c67e95cfab80c1010be2903ff'
          },
          {
            _id: '41b5444c67e95cfab80c1010be321214',
            _rev: '2-bc76a59fb0d407798c332bae69882a99',
            name: 'NJ North Retail',
            type: 'office',
            org: 'sales',
            parent: '41b5444c67e95cfab80c1010be2903ff',
            officeID: 50441,
            districtManager: [
              {
                id: '204319',
                name: 'Julian Smalls'
              }
            ],
            _parent: '41b5444c67e95cfab80c1010be2903ff'
          },
          {
            _id: '41b5444c67e95cfab80c1010be322529',
            _rev: '3-df9863c6397ad135c0fd34b58b220ed5',
            name: 'NY Retail',
            type: 'office',
            org: 'sales',
            parent: '41b5444c67e95cfab80c1010be2903ff',
            officeID: 50444,
            districtManager: [
              {
                id: '204266',
                name: 'Rod Salka'
              }
            ],
            _parent: '41b5444c67e95cfab80c1010be2903ff'
          },
          {
            _id: '41b5444c67e95cfab80c1010be3241dc',
            _rev: '2-a445570c0d6d6b0f516b1908714b325a',
            name: 'MA Retail',
            type: 'office',
            org: 'sales',
            parent: '41b5444c67e95cfab80c1010be2903ff',
            officeID: 50445,
            districtManager: [
              {
                id: '204264',
                name: 'Zachary Auala'
              }
            ],
            _parent: '41b5444c67e95cfab80c1010be2903ff'
          }
        ]
      },
      {
        _id: 'e240c438f96f8419634673c7f991eb31',
        _rev: '14-38df7f2ab02d9df7c5171e400a1e2794',
        name: 'Western',
        type: 'region',
        parent: '8e4003dbf818f90637881e2d8e0efc66',
        org: 'sales',
        manager: {
          id: '39702',
          name: 'Daniel Reed'
        },
        districtManager: [
          {
            id: '1317',
            name: 'Tyler Williams'
          },
          {
            id: '29133',
            name: 'Jeremy Long'
          },
          {
            id: '105237',
            name: 'Jordan Williams'
          },
          {
            id: '119839',
            name: 'Dave Allred'
          },
          {
            id: '200609',
            name: 'Devin Arp'
          }
        ],
        _children: [
          {
            _id: '750521139b7c4c3be0b855aad9544a42',
            _rev: '10-ed2ed8b097d9fd3f31f788279dcfabb4',
            parent: 'e240c438f96f8419634673c7f991eb31',
            name: 'Central Valley Region',
            type: 'region',
            org: 'sales',
            districtManager: [
              {
                id: '9152',
                name: 'Jeff Strong'
              },
              {
                id: '20787',
                name: 'Darrell Doucette'
              },
              {
                id: '63133',
                name: 'Jordan Laplace'
              }
            ],
            _children: [
              {
                _id: '20ab106d3d52bcd734bccccb6aa63e54',
                _rev: '52-138347b07df6720c6d1018aabb779d65',
                name: 'CA-20 Visalia Solar',
                type: 'office',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad9544a42',
                officeID: 4542,
                supportEmail: 'visaliasupport@vivintsolar.com',
                market: 'A',
                districtManager: [
                  {
                    id: '31490',
                    name: 'Forrest Flesch'
                  },
                  {
                    id: '105237',
                    name: 'Jordan Williams'
                  },
                  {
                    id: '1317',
                    name: 'Tyler Williams'
                  },
                  {
                    id: '63773',
                    name: 'Gregory Larson'
                  },
                  {
                    id: '33707',
                    name: 'Blake Cammack'
                  },
                  {
                    id: '66043',
                    name: 'Marcus Ward'
                  },
                  {
                    id: '114737',
                    name: 'Christian Macias'
                  },
                  {
                    id: '21260',
                    name: 'Jeffrey Galovan'
                  },
                  {
                    id: '43914',
                    name: 'Stuart Watson'
                  },
                  {
                    id: '3125',
                    name: 'Cole Smith'
                  },
                  {
                    id: '96960',
                    name: 'Damion Nielsen'
                  },
                  {
                    id: '111415',
                    name: 'Alex Williams'
                  },
                  {
                    id: '203850',
                    name: 'Talmage James'
                  }
                ],
                _parent: '750521139b7c4c3be0b855aad9544a42'
              },
              {
                _id: '7dede0d30bcea2f47065381cc4270362',
                _rev: '35-8b2f003eb756ddd1eff529f598710a82',
                name: 'CA-6 Apple Valley Solar',
                type: 'office',
                org: 'sales',
                officeID: 3430,
                supportEmail: 'applevalleysupport@vivintsolar.com',
                parent: '750521139b7c4c3be0b855aad9544a42',
                districtManager: [
                  {
                    id: '3588',
                    name: 'Adam Cox',
                    bonusAllocation: '90'
                  },
                  {
                    id: '105237',
                    name: 'Jordan Williams'
                  },
                  {
                    id: '1317',
                    name: 'Tyler Williams'
                  },
                  {
                    id: '40572',
                    name: 'Brandon Holmes'
                  },
                  {
                    id: '33707',
                    name: 'Blake Cammack'
                  },
                  {
                    id: '63773',
                    name: 'Gregory Larson'
                  },
                  {
                    id: '66043',
                    name: 'Marcus Ward'
                  },
                  {
                    id: '123649',
                    name: 'Stephen Isbell'
                  },
                  {
                    id: '9000343',
                    name: 'Alex Williams'
                  },
                  {
                    id: '3125',
                    name: 'Cole Smith'
                  }
                ],
                market: 'A',
                _parent: '750521139b7c4c3be0b855aad9544a42'
              },
              {
                _id: 'dfaf57bfd11d09ae9e0677647ed07d73',
                _rev: '18-6fca4d1d93ce42dc47b70a4fe1511221',
                name: 'CA-23 San Luis Obispo Solar',
                type: 'office',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad9544a42',
                officeID: 6014,
                supportEmail: 'sanluisobisposupport',
                districtManager: [
                  {
                    id: '105237',
                    name: 'Jordan Williams'
                  },
                  {
                    id: '1317',
                    name: 'Tyler Williams'
                  },
                  {
                    id: '9000343',
                    name: 'Alex Williams'
                  }
                ],
                market: 'A',
                _parent: '750521139b7c4c3be0b855aad9544a42'
              },
              {
                _id: 'e240c438f96f8419634673c7f991fabe',
                _rev: '53-159f8f09be743a245968c6d55f5881c3',
                name: 'CA-4 Bakersfield Solar',
                type: 'office',
                parent: '750521139b7c4c3be0b855aad9544a42',
                org: 'sales',
                officeID: 3153,
                supportEmail: 'bakersfieldsupport@vivintsolar.com',
                districtManager: [
                  {
                    id: '21260',
                    name: 'Jeff Galovan',
                    bonusAllocation: '70'
                  },
                  {
                    id: '43521',
                    name: 'Sterling Hills',
                    bonusAllocation: '30'
                  },
                  {
                    id: '105237',
                    name: 'Jordan Williams'
                  },
                  {
                    id: '1317',
                    name: 'Tyler Williams'
                  },
                  {
                    id: '33707',
                    name: 'Blake Cammack'
                  },
                  {
                    id: '63773',
                    name: 'Gregory Larson'
                  },
                  {
                    id: '10180',
                    name: 'Todd Jensen'
                  },
                  {
                    id: '118045',
                    name: 'Melvin Esquilin'
                  },
                  {
                    id: '9000343',
                    name: 'Alex Williams'
                  },
                  {
                    id: '68922',
                    name: 'Daron Wilson'
                  },
                  {
                    id: '47736',
                    name: 'Brian Peterson'
                  }
                ],
                market: 'A',
                _parent: '750521139b7c4c3be0b855aad9544a42'
              }
            ],
            _parent: 'e240c438f96f8419634673c7f991eb31'
          },
          {
            _id: '750521139b7c4c3be0b855aad954920f',
            _rev: '10-7a2dab321e823930e594fc4a5016c2ea',
            parent: 'e240c438f96f8419634673c7f991eb31',
            org: 'sales',
            name: 'Nor Cal Division',
            type: 'region',
            districtManager: [
              {
                id: '105237',
                name: 'Jordan Williams'
              },
              {
                id: '20787',
                name: 'Darrell Doucette'
              },
              {
                id: '63133',
                name: 'Jordan Laplace'
              }
            ],
            _children: [
              {
                _id: '0ff154553c324f7003375eb610b8ae0e',
                _rev: '43-4f4721437d0f576525402f430be21d8d',
                name: 'CA-22 San Jose Solar',
                type: 'office',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad954920f',
                officeID: 6009,
                supportEmail: 'sanjosesupport@vivintsolar.com',
                market: 'A',
                districtManager: [
                  {
                    id: '105237',
                    name: 'Jordan Williams'
                  },
                  {
                    id: '1317',
                    name: 'Tyler Williams'
                  },
                  {
                    id: '33707',
                    name: 'Blake Cammack'
                  },
                  {
                    id: '63773',
                    name: 'Gregory Larson'
                  },
                  {
                    id: '66043',
                    name: 'Marcus Ward'
                  },
                  {
                    id: '93041',
                    name: 'Jonathan Perez'
                  },
                  {
                    id: '101292',
                    name: 'Lindsay Palmer'
                  },
                  {
                    id: '119839',
                    name: 'Dave Allred'
                  },
                  {
                    id: '111415',
                    name: 'Alex Williams'
                  }
                ],
                _parent: '750521139b7c4c3be0b855aad954920f'
              },
              {
                _id: '288f4954c602c2048c919b84a2e4fef5',
                _rev: '51-e438a8a6adb183068d92efbd4ca3da97',
                name: 'CA-18 Stockton Solar',
                type: 'office',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad954920f',
                districtManager: [
                  {
                    id: '94791',
                    name: 'Clint Williams',
                    bonusAllocation: '50'
                  },
                  {
                    id: '36985',
                    name: 'Bryce Jones'
                  },
                  {
                    id: '9152',
                    name: 'Jeff Strong'
                  },
                  {
                    id: '3061',
                    name: 'Jared Slemboski'
                  },
                  {
                    id: '1317',
                    name: 'Tyler Williams'
                  },
                  {
                    id: '33707',
                    name: 'Blake Cammack'
                  },
                  {
                    id: '63773',
                    name: 'Gregory Larson'
                  },
                  {
                    id: '66043',
                    name: 'Marcus Ward'
                  },
                  {
                    id: '115110',
                    name: 'Michael Wirtz'
                  },
                  {
                    id: '94210',
                    name: 'Gerald Cavanaugh'
                  },
                  {
                    id: '120210',
                    name: 'Sean Cagle'
                  },
                  {
                    id: '111415',
                    name: 'Alex Williams'
                  }
                ],
                officeID: 4546,
                supportEmail: 'stocktonsupport@vivintsolar.com',
                market: 'A',
                _parent: '750521139b7c4c3be0b855aad954920f'
              },
              {
                _id: '4364b6070c11a042d06e6c8c2d592fd8',
                _rev: '55-94b9d45564e4d07d3518c78d585a964b',
                name: 'CA-11 Chico Solar',
                officeID: 4437,
                supportEmail: 'chicosupport@vivintsolar.com',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad954920f',
                type: 'office',
                districtManager: [
                  {
                    id: '1373',
                    name: 'Jacob Bevans',
                    bonusAllocation: '100'
                  },
                  {
                    id: '1317',
                    name: 'Tyler Williams'
                  },
                  {
                    id: '3061',
                    name: 'Jared Slemboski'
                  },
                  {
                    id: '33707',
                    name: 'Blake Cammack'
                  },
                  {
                    id: '63773',
                    name: 'Gregory Larson'
                  },
                  {
                    id: '66043',
                    name: 'Marcus Ward'
                  },
                  {
                    id: '98649',
                    name: 'Lane Pohlsander'
                  },
                  {
                    id: '1373',
                    name: 'Jacob Bevans'
                  },
                  {
                    id: '118618',
                    name: 'Joshua Orozco'
                  },
                  {
                    id: '113361',
                    name: 'Carl Busseau'
                  },
                  {
                    id: '120560',
                    name: 'Pete Wilson'
                  },
                  {
                    id: '103966',
                    name: 'Hugo Guardado'
                  },
                  {
                    id: '94250',
                    name: 'Patrick Morris'
                  },
                  {
                    id: '111415',
                    name: 'Alex Williams'
                  }
                ],
                market: 'A',
                _parent: '750521139b7c4c3be0b855aad954920f'
              },
              {
                _id: '4364b6070c11a042d06e6c8c2d5962b8',
                _rev: '42-1a57ca885831c23e29be8aa8f0f42192',
                name: 'CA-16 Sacramento Solar',
                officeID: 4442,
                supportEmail: 'sacramentosupport@vivintsolar.com',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad954920f',
                type: 'office',
                districtManager: [
                  {
                    id: '94250',
                    name: 'Patrick Morris',
                    bonusAllocation: '70'
                  },
                  {
                    id: '57960',
                    name: 'Quintion Lowe',
                    bonusAllocation: '30'
                  },
                  {
                    id: '3061',
                    name: 'Jared Slemboski'
                  },
                  {
                    id: '1317',
                    name: 'Tyler Williams'
                  },
                  {
                    id: '33707',
                    name: 'Blake Cammack'
                  },
                  {
                    id: '63773',
                    name: 'Gregory Larson'
                  },
                  {
                    id: '66043',
                    name: 'Marcus Ward'
                  },
                  {
                    id: '1373',
                    name: 'Jacob Bevans'
                  },
                  {
                    id: '113361',
                    name: 'Carl Busseau'
                  },
                  {
                    id: '201684',
                    name: 'Josh Balling'
                  },
                  {
                    id: '202584',
                    name: 'Daniel Dyer'
                  },
                  {
                    id: '111415',
                    name: 'Alex Williams'
                  }
                ],
                market: 'A',
                _parent: '750521139b7c4c3be0b855aad954920f',
                _children: [
                  {
                    _id: '8b57e694ed757f2a2a64126474ab09c3',
                    _rev: '12-dc50fa7a56c75a8092e1119218a72fc7',
                    name: 'CA-16A Sacramento Solar',
                    type: 'office',
                    org: 'sales',
                    parent: '4364b6070c11a042d06e6c8c2d5962b8',
                    officeID: 50425,
                    market: 'A',
                    districtManager: [
                      {
                        id: '203013',
                        name: 'Phil Horton'
                      }
                    ],
                    _parent: '4364b6070c11a042d06e6c8c2d5962b8'
                  }
                ]
              },
              {
                _id: '5fee30546f4a9da84a60d85cebb5d08a',
                _rev: '50-448c3f5a90bc9052d40c6d48f2eff1de',
                name: 'CA-19 Santa Cruz Solar',
                type: 'office',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad954920f',
                districtManager: [
                  {
                    id: '33707',
                    name: 'Blake Cammack'
                  },
                  {
                    id: '105237',
                    name: 'Jordan Williams'
                  },
                  {
                    id: '1317',
                    name: 'Tyler Williams'
                  },
                  {
                    id: '63773',
                    name: 'Gregory Larson'
                  },
                  {
                    id: '66043',
                    name: 'Marcus Ward'
                  },
                  {
                    id: '95368',
                    name: 'Trevor Young'
                  },
                  {
                    id: '119839',
                    name: 'Dave Allred'
                  },
                  {
                    id: '94619',
                    name: 'Briant Katilus'
                  },
                  {
                    id: '200140',
                    name: 'Robert Baldwin'
                  },
                  {
                    id: '111415',
                    name: 'Alex Williams'
                  }
                ],
                officeID: 4550,
                supportEmail: 'santacruzsupport@vivintsolar.com',
                market: 'A',
                _parent: '750521139b7c4c3be0b855aad954920f'
              },
              {
                _id: 'c2175fd5cacf91f989bb9a3f25f28969',
                _rev: '46-a69766acf8fcfdaa724e0ee06c77e9ec',
                name: 'CA-03 Fresno Solar',
                type: 'office',
                parent: '750521139b7c4c3be0b855aad954920f',
                org: 'sales',
                officeID: 3068,
                supportEmail: 'fresnosupport@vivintsolar.com',
                districtManager: [
                  {
                    id: '9152',
                    name: 'Jeff Strong',
                    bonusAllocation: '70'
                  },
                  {
                    id: '43749',
                    name: 'Landon Wimmer',
                    bonusAllocation: '30'
                  },
                  {
                    id: '3061',
                    name: 'Jared Slemboski'
                  },
                  {
                    id: '1317',
                    name: 'Tyler Williams'
                  },
                  {
                    id: '33707',
                    name: 'Blake Cammack'
                  },
                  {
                    id: '63773',
                    name: 'Gregory Larson'
                  },
                  {
                    id: '66043',
                    name: 'Marcus Ward'
                  },
                  {
                    id: '36985',
                    name: 'Bryce Jones'
                  },
                  {
                    id: '114347',
                    name: 'Justin Wolf'
                  },
                  {
                    id: '114737',
                    name: 'Christian Macias'
                  },
                  {
                    id: '115110',
                    name: 'Michael Wirtz'
                  },
                  {
                    id: '9000343',
                    name: 'Alex Williams'
                  },
                  {
                    id: '3125',
                    name: 'Cole Smith'
                  },
                  {
                    id: '31490',
                    name: 'Forrest Flesch'
                  },
                  {
                    id: '111415',
                    name: 'Alex Williams'
                  }
                ],
                market: 'A',
                _parent: '750521139b7c4c3be0b855aad954920f'
              },
              {
                _id: 'cd6e32108eccc8c0b2c705e776a67f58',
                _rev: '29-2653dc0e2d9f66159d2fbe7e1f9260d6',
                name: 'CA-28 Yuba City Solar',
                type: 'office',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad954920f',
                officeID: 6331,
                districtManager: [
                  {
                    id: '1317',
                    name: 'Tyler Williams'
                  },
                  {
                    id: '3061',
                    name: 'Jared Slemboski'
                  },
                  {
                    id: '1373',
                    name: 'Jacob Bevans'
                  },
                  {
                    id: '118892',
                    name: 'Brian Burnette'
                  },
                  {
                    id: '94307',
                    name: 'Nathan Skousen'
                  },
                  {
                    id: '118618',
                    name: 'Joshua Orozco'
                  },
                  {
                    id: '113361',
                    name: 'Carl Busseau'
                  },
                  {
                    id: '120560',
                    name: 'Pete Wilson'
                  },
                  {
                    id: '111415',
                    name: 'Alex Williams'
                  }
                ],
                market: 'A',
                _parent: '750521139b7c4c3be0b855aad954920f'
              },
              {
                _id: 'dfaf57bfd11d09ae9e0677647ed0ca8b',
                _rev: '23-f1a2e91f29b76176971e1d943aa6418f',
                name: 'CA-26 Palo Alto Solar',
                type: 'office',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad954920f',
                officeID: 6017,
                supportEmail: 'paloaltosupport@vivintsolar.com',
                market: 'A',
                districtManager: [
                  {
                    id: '112654',
                    name: 'Isaac Jacobson'
                  },
                  {
                    id: '112732',
                    name: 'Jonathan Jacobson'
                  },
                  {
                    id: '105237',
                    name: 'Jordan Williams'
                  },
                  {
                    id: '1317',
                    name: 'Tyler Williams'
                  },
                  {
                    id: '119839',
                    name: 'Dave Allred'
                  },
                  {
                    id: '111415',
                    name: 'Alex Williams'
                  }
                ],
                _parent: '750521139b7c4c3be0b855aad954920f'
              },
              {
                _id: 'dfaf57bfd11d09ae9e0677647ed13cd4',
                _rev: '32-c611c5584cd5965dc08c951cd8e72a85',
                name: 'CA-25 San Leandro Solar',
                type: 'office',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad954920f',
                officeID: 6016,
                supportEmail: 'sanleandrosupport@vivintsolar.com',
                market: 'A',
                districtManager: [
                  {
                    id: '33707',
                    name: 'Blake Cammack'
                  },
                  {
                    id: '36740',
                    name: 'Michael Otterson'
                  },
                  {
                    id: '1317',
                    name: 'Tyler Williams'
                  },
                  {
                    id: '3061',
                    name: 'Jared Slemboski'
                  },
                  {
                    id: '111256',
                    name: 'Matt LeStarge'
                  },
                  {
                    id: '112528',
                    name: 'Benjamin LeStarge'
                  },
                  {
                    id: '109625',
                    name: 'Chad Thompson'
                  },
                  {
                    id: '8898',
                    name: 'Christopher White'
                  },
                  {
                    id: '115218',
                    name: 'Daniel Vu'
                  },
                  {
                    id: '9152',
                    name: 'Jeff Strong'
                  },
                  {
                    id: '115110',
                    name: 'Michael Wirtz'
                  },
                  {
                    id: '117262',
                    name: 'Romeo Leyva'
                  },
                  {
                    id: '111415',
                    name: 'Alex Williams'
                  }
                ],
                _parent: '750521139b7c4c3be0b855aad954920f'
              },
              {
                _id: 'e240c438f96f8419634673c7f9920506',
                _rev: '67-c60f03686eaf435b150ebb8e88a002fa',
                name: 'CA-01 Concord Solar',
                type: 'office',
                parent: '750521139b7c4c3be0b855aad954920f',
                org: 'sales',
                officeID: 2927,
                supportEmail: 'concordsupport@vivintsolar.com',
                districtManager: [
                  {
                    id: '3061',
                    name: 'Jared Slemboski',
                    bonusAllocation: '70'
                  },
                  {
                    id: '94283',
                    name: 'Matt Stevenson',
                    bonusAllocation: '30'
                  },
                  {
                    id: '66387',
                    name: 'Tim Clarkson',
                    bonusAllocation: 0
                  },
                  {
                    id: '1317',
                    name: 'Tyler Williams'
                  },
                  {
                    id: '63773',
                    name: 'Gregory Larson'
                  },
                  {
                    id: '33707',
                    name: 'Blake Cammack'
                  },
                  {
                    id: '66043',
                    name: 'Marcus Ward'
                  },
                  {
                    id: '8898',
                    name: 'Christopher White'
                  },
                  {
                    id: '9152',
                    name: 'Jeff Strong'
                  },
                  {
                    id: '115110',
                    name: 'Michael Wirtz'
                  },
                  {
                    id: '96855',
                    name: 'Brian Brooker'
                  },
                  {
                    id: '94188',
                    name: 'Steven Hoover'
                  },
                  {
                    id: '111415',
                    name: 'Alex Williams'
                  },
                  {
                    id: '94329',
                    name: 'Dusty Broadhead'
                  }
                ],
                market: 'A',
                _children: [
                  {
                    _id: '8b57e694ed757f2a2a64126474a896a3',
                    _rev: '12-785f067025210c3c68724f89736d95c4',
                    name: 'CA-01A Concord Solar',
                    type: 'office',
                    org: 'sales',
                    parent: 'e240c438f96f8419634673c7f9920506',
                    officeID: 50424,
                    market: 'B',
                    districtManager: [
                      {
                        id: '116742',
                        name: 'Brian Sanchez'
                      }
                    ],
                    _parent: 'e240c438f96f8419634673c7f9920506'
                  }
                ],
                _parent: '750521139b7c4c3be0b855aad954920f'
              },
              {
                _id: 'e240c438f96f8419634673c7f99248d0',
                _rev: '88-18ca2ac37400801a66369de3814911ec',
                name: 'CA-7 South Bay Solar',
                type: 'office',
                parent: '750521139b7c4c3be0b855aad954920f',
                org: 'sales',
                officeID: 3431,
                supportEmail: 'southbaysupport@vivintsolar.com',
                districtManager: [
                  {
                    id: '105237',
                    name: 'Jordan Williams'
                  },
                  {
                    id: '1317',
                    name: 'Tyler Williams'
                  },
                  {
                    id: '33707',
                    name: 'Blake Cammack'
                  },
                  {
                    id: '42398',
                    name: 'Bryan Rossiter'
                  },
                  {
                    id: '119839',
                    name: 'Dave Allred'
                  },
                  {
                    id: '116538',
                    name: 'Kevin Padilla'
                  },
                  {
                    id: '111411',
                    name: 'Taylor Eardley'
                  },
                  {
                    id: '200140',
                    name: 'Robert Baldwin'
                  },
                  {
                    id: '112654',
                    name: 'Isaac Jacobson'
                  },
                  {
                    id: '200609',
                    name: 'Devin Arp'
                  },
                  {
                    id: '111415',
                    name: 'Alex Williams'
                  }
                ],
                market: 'A',
                _parent: '750521139b7c4c3be0b855aad954920f'
              },
              {
                _id: 'e240c438f96f8419634673c7f9924a18',
                _rev: '39-9a63e423984790e8208a96474a32d72b',
                name: 'CA-5 Santa Rosa Solar',
                type: 'office',
                parent: '750521139b7c4c3be0b855aad954920f',
                org: 'sales',
                officeID: 3265,
                supportEmail: 'santarosasupport@vivintsolar.com',
                districtManager: [
                  {
                    id: '3061',
                    name: 'Jared Slemboski'
                  },
                  {
                    id: '1317',
                    name: 'Tyler Williams'
                  },
                  {
                    id: '33707',
                    name: 'Blake Cammack'
                  },
                  {
                    id: '63773',
                    name: 'Gregory Larson'
                  },
                  {
                    id: '66043',
                    name: 'Marcus Ward'
                  },
                  {
                    id: '25220',
                    name: 'Daniel Harris'
                  },
                  {
                    id: '1373',
                    name: 'Jacob Bevans'
                  },
                  {
                    id: '98649',
                    name: 'Lane Pohlsander'
                  },
                  {
                    id: '113361',
                    name: 'Carl Busseau'
                  },
                  {
                    id: '48343',
                    name: 'Terek Cope'
                  },
                  {
                    id: '111415',
                    name: 'Alex Williams'
                  }
                ],
                market: 'A',
                _parent: '750521139b7c4c3be0b855aad954920f'
              }
            ],
            _parent: 'e240c438f96f8419634673c7f991eb31'
          },
          {
            _id: '750521139b7c4c3be0b855aad954c2a1',
            _rev: '13-ce1900b3f8cd8668aecfdfe4186a8cbc',
            parent: 'e240c438f96f8419634673c7f991eb31',
            org: 'sales',
            name: 'So Cal Division',
            type: 'region',
            districtManager: [
              {
                id: '94058',
                name: 'Taylor Turnbull'
              },
              {
                id: '98055',
                name: 'David Madsen'
              },
              {
                id: '42485',
                name: 'Michael Brand'
              },
              {
                id: '20787',
                name: 'Darrell Doucette'
              },
              {
                id: '63133',
                name: 'Jordan Laplace'
              },
              {
                id: '203860',
                name: 'Jordan Binning'
              }
            ],
            _children: [
              {
                _id: '062c7c0b0fde3651bd37002a5dec1895',
                _rev: '36-06883182c57a4e420e61e890867125c1',
                name: 'CA-21 Riverside Solar',
                type: 'office',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad954c2a1',
                officeID: 6007,
                supportEmail: 'riversidesupport@vivintsolar.com',
                market: 'A',
                districtManager: [
                  {
                    id: '98055',
                    name: 'David Madsen'
                  },
                  {
                    id: '1317',
                    name: 'Tyler Williams'
                  },
                  {
                    id: '33707',
                    name: 'Blake Cammack'
                  },
                  {
                    id: '63773',
                    name: 'Gregory Larson'
                  },
                  {
                    id: '66043',
                    name: 'Marcus Ward'
                  },
                  {
                    id: '114339',
                    name: 'Brian Thoemmes'
                  },
                  {
                    id: '112486',
                    name: 'Jacob Tolman'
                  },
                  {
                    id: '200857',
                    name: 'Branson Hadfield'
                  },
                  {
                    id: '123118',
                    name: 'Joshua Gonzales'
                  },
                  {
                    id: '200754',
                    name: 'Dallin West'
                  }
                ],
                _parent: '750521139b7c4c3be0b855aad954c2a1'
              },
              {
                _id: '288f4954c602c2048c919b84a2e5f5ea',
                _rev: '47-8cd58377ec932a1e3183210f381ebefb',
                name: 'CA-17 LA County Solar',
                type: 'office',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad954c2a1',
                districtManager: [
                  {
                    id: '40572',
                    name: 'Brandon Holmes'
                  },
                  {
                    id: '1317',
                    name: 'Tyler Williams'
                  },
                  {
                    id: '98055',
                    name: 'David Madsen'
                  },
                  {
                    id: '1475',
                    name: 'Reno Mendenhall'
                  },
                  {
                    id: '33707',
                    name: 'Blake Cammack'
                  },
                  {
                    id: '63773',
                    name: 'Gregory Larson'
                  },
                  {
                    id: '66043',
                    name: 'Marcus Ward'
                  },
                  {
                    id: '94275',
                    name: 'Bart Ward'
                  },
                  {
                    id: '32361',
                    name: 'Mike Schreiner'
                  },
                  {
                    id: '113087',
                    name: 'Anis Rahal'
                  },
                  {
                    id: '105117',
                    name: 'Jordon Baker'
                  },
                  {
                    id: '123118',
                    name: 'Joshua Gonzales'
                  },
                  {
                    id: '200754',
                    name: 'Dallin West'
                  }
                ],
                officeID: 4467,
                supportEmail: 'lacountysupport@vivintsolar.com',
                market: 'A',
                _parent: '750521139b7c4c3be0b855aad954c2a1'
              },
              {
                _id: '3ae35d6414164b5b50a6ac64902f872f',
                _rev: '10-080124466713575c5c89c945d4081e51',
                name: 'CA-27 Mission Viejo Solar',
                type: 'office',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad954c2a1',
                officeID: 6323,
                market: 'A',
                districtManager: [
                  {
                    id: '62136',
                    name: 'Dan Dunn'
                  },
                  {
                    id: '1475',
                    name: 'Reno Mendenhall'
                  },
                  {
                    id: '1317',
                    name: 'Tyler Williams'
                  },
                  {
                    id: '117996',
                    name: 'Samuel Hampsch'
                  },
                  {
                    id: '200754',
                    name: 'Dallin West'
                  },
                  {
                    id: '123118',
                    name: 'Joshua Gonzales'
                  }
                ],
                _parent: '750521139b7c4c3be0b855aad954c2a1'
              },
              {
                _id: '3faca4278e55671ac3292dca48701f29',
                _rev: '5-da45d1fdb96f2f4db132e020199cb7f0',
                name: 'CA-29 Smarthome Solar',
                type: 'office',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad954c2a1',
                officeID: 50400,
                market: 'B',
                districtManager: [],
                _parent: '750521139b7c4c3be0b855aad954c2a1'
              },
              {
                _id: '4364b6070c11a042d06e6c8c2d58b98a',
                _rev: '47-356447c1d6ad1b5e9c6ee0ed1a0e7806',
                name: 'CA-10 Orange County Solar',
                officeID: 4017,
                supportEmail: 'orangecountysupport@vivintsolar.com',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad954c2a1',
                type: 'office',
                districtManager: [
                  {
                    id: '62136',
                    name: 'Dan Dunn',
                    bonusAllocation: '30'
                  },
                  {
                    id: '1475',
                    name: 'Reno Mendenhall'
                  },
                  {
                    id: '1317',
                    name: 'Tyler Williams'
                  },
                  {
                    id: '33707',
                    name: 'Blake Cammack'
                  },
                  {
                    id: '66043',
                    name: 'Marcus Ward'
                  },
                  {
                    id: '63773',
                    name: 'Gregory Larson'
                  },
                  {
                    id: '117100',
                    name: 'Tanner Torres'
                  },
                  {
                    id: '200562',
                    name: 'Courtney Stevens'
                  },
                  {
                    id: '201286',
                    name: 'John Woodfield'
                  },
                  {
                    id: '95129',
                    name: 'Danny Copinga'
                  },
                  {
                    id: '200754',
                    name: 'Dallin West'
                  },
                  {
                    id: '123118',
                    name: 'Joshua Gonzales'
                  },
                  {
                    id: '94249',
                    name: 'Tevita Niutupuivaha'
                  }
                ],
                market: 'A',
                _parent: '750521139b7c4c3be0b855aad954c2a1'
              },
              {
                _id: '4364b6070c11a042d06e6c8c2d590a3f',
                _rev: '74-50130a00e3c2eba45e539375aee3a7d7',
                name: 'CA-12 East LA Solar',
                officeID: 4436,
                supportEmail: 'eastlasupport@vivintsolar.com',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad954c2a1',
                type: 'office',
                districtManager: [
                  {
                    id: '40572',
                    name: 'Brandon Holmes'
                  },
                  {
                    id: '1317',
                    name: 'Tyler Williams'
                  },
                  {
                    id: '33707',
                    name: 'Blake Cammack'
                  },
                  {
                    id: '98055',
                    name: 'David Madsen'
                  },
                  {
                    id: '1475',
                    name: 'Reno Mendenhall'
                  },
                  {
                    id: '63773',
                    name: 'Gregory Larson'
                  },
                  {
                    id: '66043',
                    name: 'Marcus Ward'
                  },
                  {
                    id: '117983',
                    name: 'Tailor Gibbons'
                  },
                  {
                    id: '201286',
                    name: 'John Woodfield'
                  },
                  {
                    id: '94249',
                    name: 'Tevita Niutupuivaha'
                  },
                  {
                    id: '200633',
                    name: 'JJ Pequeno'
                  },
                  {
                    id: '200754',
                    name: 'Dallin West'
                  },
                  {
                    id: '123118',
                    name: 'Joshua Gonzales'
                  },
                  {
                    id: '95129',
                    name: 'Danny Copinga'
                  },
                  {
                    id: '203873',
                    name: 'Cameron Kimball'
                  }
                ],
                market: 'A',
                _parent: '750521139b7c4c3be0b855aad954c2a1'
              },
              {
                _id: '4364b6070c11a042d06e6c8c2d594022',
                _rev: '53-76b3a3f0f087e3d92ad18968e1fc3186',
                name: 'CA-13 Temecula Solar',
                officeID: 4439,
                supportEmail: 'temeculasupport@vivintsolar.com',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad954c2a1',
                type: 'office',
                districtManager: [
                  {
                    id: '94337',
                    name: 'Austin Clinger'
                  },
                  {
                    id: '1317',
                    name: 'Tyler Williams'
                  },
                  {
                    id: '33707',
                    name: 'Blake Cammack'
                  },
                  {
                    id: '63773',
                    name: 'Gregory Larson'
                  },
                  {
                    id: '66043',
                    name: 'Marcus Ward'
                  },
                  {
                    id: '94058',
                    name: 'Taylor Turnbull'
                  },
                  {
                    id: '1475',
                    name: 'Reno Mendenhall'
                  },
                  {
                    id: '36985',
                    name: 'Bryce Jones'
                  },
                  {
                    id: '121279',
                    name: 'Kylie Gutierrez'
                  },
                  {
                    id: '42485',
                    name: 'Michael Brand'
                  },
                  {
                    id: '113590',
                    name: 'Carlos Nieto'
                  },
                  {
                    id: '115969',
                    name: 'Aaron Gutierrez'
                  },
                  {
                    id: '123118',
                    name: 'Joshua Gonzales'
                  },
                  {
                    id: '200754',
                    name: 'Dallin West'
                  }
                ],
                market: 'A',
                _parent: '750521139b7c4c3be0b855aad954c2a1'
              },
              {
                _id: '4364b6070c11a042d06e6c8c2d59c69a',
                _rev: '55-8927e7859b40e580f6bf99d9e1863cca',
                name: 'CA-14 San Diego South Solar',
                officeID: 4485,
                supportEmail: 'sandiegosupport@vivintsolar.com',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad954c2a1',
                type: 'office',
                districtManager: [
                  {
                    id: '1475',
                    name: 'Reno Mendenhall'
                  },
                  {
                    id: '1317',
                    name: 'Tyler Williams'
                  },
                  {
                    id: '33707',
                    name: 'Blake Cammack'
                  },
                  {
                    id: '63773',
                    name: 'Gregory Larson'
                  },
                  {
                    id: '66043',
                    name: 'Marcus Ward'
                  },
                  {
                    id: '94058',
                    name: 'Taylor Turnbull'
                  },
                  {
                    id: '42485',
                    name: 'Michael Brand'
                  },
                  {
                    id: '200754',
                    name: 'Dallin West'
                  },
                  {
                    id: '61066',
                    name: 'Brandon Seidel'
                  },
                  {
                    id: '123118',
                    name: 'Joshua Gonzales'
                  }
                ],
                market: 'A',
                _parent: '750521139b7c4c3be0b855aad954c2a1'
              },
              {
                _id: '4cdf2b2475dd6c77e15ee8a3acceb823',
                _rev: '28-8d3b34029d59ed357dd4450541d35c95',
                name: 'CA-15 Palm Springs Solar',
                type: 'office',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad954c2a1',
                officeID: 4440,
                supportEmail: 'palmspringssupport@vivintsolar.com',
                districtManager: [
                  {
                    id: '94231',
                    name: 'Joshua Packard'
                  },
                  {
                    id: '94230',
                    name: 'Wesley Calland'
                  },
                  {
                    id: '1317',
                    name: 'Tyler Williams'
                  },
                  {
                    id: '33707',
                    name: 'Blake Cammack'
                  },
                  {
                    id: '63773',
                    name: 'Gregory Larson'
                  },
                  {
                    id: '66043',
                    name: 'Marcus Ward'
                  },
                  {
                    id: '1475',
                    name: 'Reno Mendenhall'
                  },
                  {
                    id: '94058',
                    name: 'Taylor Turnbull'
                  },
                  {
                    id: '96716',
                    name: 'Daniel Maynard'
                  },
                  {
                    id: '94337',
                    name: 'Austin Clinger'
                  },
                  {
                    id: '42485',
                    name: 'Michael Brand'
                  },
                  {
                    id: '123118',
                    name: 'Joshua Gonzales'
                  },
                  {
                    id: '200754',
                    name: 'Dallin West'
                  },
                  {
                    id: '107044',
                    name: 'Louis Kunz'
                  }
                ],
                market: 'A',
                _parent: '750521139b7c4c3be0b855aad954c2a1'
              },
              {
                _id: 'dfaf57bfd11d09ae9e0677647ed0d627',
                _rev: '10-b447d3824711e60841899e24aec5b835',
                name: 'CA-24 San Fernando Solar',
                type: 'office',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad954c2a1',
                officeID: 6015,
                supportEmail: 'sanfernandosupport@vivintsolar.com',
                market: 'A',
                districtManager: [
                  {
                    id: '200754',
                    name: 'Dallin West'
                  },
                  {
                    id: '123118',
                    name: 'Joshua Gonzales'
                  }
                ],
                _parent: '750521139b7c4c3be0b855aad954c2a1'
              },
              {
                _id: 'e240c438f96f8419634673c7f99212f3',
                _rev: '53-0c07c7c4145403916986f9e153cee25d',
                name: 'CA-8 Inland Empire Solar',
                type: 'office',
                parent: '750521139b7c4c3be0b855aad954c2a1',
                org: 'sales',
                officeID: 3553,
                supportEmail: 'inlandempiresupport@vivintsolar.com',
                districtManager: [
                  {
                    id: '1153',
                    name: 'Jeremy Marshall',
                    bonusAllocation: '70'
                  },
                  {
                    id: '45957',
                    name: 'Jed Wintle'
                  },
                  {
                    id: '40572',
                    name: 'Brandon Holmes'
                  },
                  {
                    id: '1317',
                    name: 'Tyler Williams'
                  },
                  {
                    id: '98055',
                    name: 'David Madsen'
                  },
                  {
                    id: '33707',
                    name: 'Blake Cammack'
                  },
                  {
                    id: '63773',
                    name: 'Gregory Larson'
                  },
                  {
                    id: '66043',
                    name: 'Marcus Ward'
                  },
                  {
                    id: '96686',
                    name: 'Nadia Hamdan'
                  },
                  {
                    id: '1475',
                    name: 'Reno Mendenhall'
                  },
                  {
                    id: '61066',
                    name: 'Brandon Seidel'
                  },
                  {
                    id: '200754',
                    name: 'Dallin West'
                  },
                  {
                    id: '123118',
                    name: 'Joshua Gonzales'
                  }
                ],
                market: 'A',
                _parent: '750521139b7c4c3be0b855aad954c2a1'
              },
              {
                _id: 'e240c438f96f8419634673c7f992480c',
                _rev: '55-521f2d9fce32e738cb2ac7638c9f1369',
                name: 'CA-2 San Diego North Solar',
                type: 'office',
                parent: '750521139b7c4c3be0b855aad954c2a1',
                org: 'sales',
                officeID: 3000,
                supportEmail: 'sandiegosupport@vivintsolar.com',
                districtManager: [
                  {
                    id: '2137',
                    name: 'Regan George',
                    bonusAllocation: '60'
                  },
                  {
                    id: '1467',
                    name: 'Courtney Jones',
                    bonusAllocation: '40'
                  },
                  {
                    id: '1317',
                    name: 'Tyler Williams'
                  },
                  {
                    id: '94058',
                    name: 'Taylor Turnbull'
                  },
                  {
                    id: '1475',
                    name: 'Reno Mendenhall'
                  },
                  {
                    id: '33707',
                    name: 'Blake Cammack'
                  },
                  {
                    id: '63773',
                    name: 'Gregory Larson'
                  },
                  {
                    id: '66043',
                    name: 'Marcus Ward'
                  },
                  {
                    id: '94037',
                    name: 'Nathan Scheib'
                  },
                  {
                    id: '8898',
                    name: 'Christopher White'
                  },
                  {
                    id: '42485',
                    name: 'Michael Brand'
                  },
                  {
                    id: '75138',
                    name: 'Jordan Maya'
                  },
                  {
                    id: '61066',
                    name: 'Brandon Seidel'
                  },
                  {
                    id: '200754',
                    name: 'Dallin West'
                  },
                  {
                    id: '123118',
                    name: 'Joshua Gonzales'
                  }
                ],
                market: 'A',
                _parent: '750521139b7c4c3be0b855aad954c2a1'
              },
              {
                _id: 'e240c438f96f8419634673c7f9925860',
                _rev: '64-fac32a14843dba0d3a041eddc5ef9997',
                name: 'CA-9 Thousand Oaks Solar',
                type: 'office',
                parent: '750521139b7c4c3be0b855aad954c2a1',
                org: 'sales',
                districtManager: [
                  {
                    id: '33707',
                    name: 'Blake Cammack'
                  },
                  {
                    id: '63773',
                    name: 'Gregory Larson'
                  },
                  {
                    id: '66043',
                    name: 'Marcus Ward'
                  },
                  {
                    id: '105237',
                    name: 'Jordan Williams'
                  },
                  {
                    id: '1317',
                    name: 'Tyler Williams'
                  },
                  {
                    id: '21260',
                    name: 'Jeffrey Galovan'
                  },
                  {
                    id: '9000343',
                    name: 'Alex Williams'
                  },
                  {
                    id: '114067',
                    name: 'Mike Cozzie'
                  },
                  {
                    id: '200576',
                    name: 'Jeffrey Baumsteiger'
                  },
                  {
                    id: '200576',
                    name: 'Jeffrey Baumsteiger'
                  },
                  {
                    id: '123118',
                    name: 'Joshua Gonzales'
                  },
                  {
                    id: '200754',
                    name: 'Dallin West'
                  }
                ],
                officeID: 3570,
                supportEmail: 'thousandoakssupport@vivintsolar.com',
                market: 'A',
                _parent: '750521139b7c4c3be0b855aad954c2a1'
              }
            ],
            _parent: 'e240c438f96f8419634673c7f991eb31'
          },
          {
            _id: 'c52eaae4567250e90bbe3c9c4530a1ba',
            _rev: '9-b4712a06c0c4a682ca56d78392a4d322',
            name: 'South West Region',
            type: 'region',
            org: 'sales',
            parent: 'e240c438f96f8419634673c7f991eb31',
            officeID: 0,
            districtManager: [
              {
                id: '3061',
                name: 'Jared Slemboski'
              },
              {
                id: '40572',
                name: 'Brandon Holmes'
              },
              {
                id: '20787',
                name: 'Darrell Doucette'
              },
              {
                id: '76134',
                name: 'Kathy Chen'
              },
              {
                id: '63133',
                name: 'Jordan Laplace'
              },
              {
                id: '21193',
                name: 'Jason Crown'
              }
            ],
            market: '',
            _children: [
              {
                _id: '288f4954c602c2048c919b84a2d1da9a',
                _rev: '90-64011f022dca70949c4b345c9773fb5e',
                name: 'AZ-01 West Solar',
                type: 'office',
                org: 'sales',
                parent: 'c52eaae4567250e90bbe3c9c4530a1ba',
                districtManager: [
                  {
                    id: '9409',
                    name: 'Michael Romney',
                    bonusAllocation: '50'
                  },
                  {
                    id: '30831',
                    name: 'Troy Van Belle'
                  },
                  {
                    id: '29133',
                    name: 'Jeremy Long'
                  },
                  {
                    id: '1317',
                    name: 'Tyler Williams'
                  },
                  {
                    id: '33707',
                    name: 'Blake Cammack'
                  },
                  {
                    id: '63773',
                    name: 'Gregory Larson'
                  },
                  {
                    id: '66043',
                    name: 'Marcus Ward'
                  },
                  {
                    id: '116099',
                    name: 'Alek Gilmore'
                  },
                  {
                    id: '29140',
                    name: 'Heber Packard'
                  },
                  {
                    id: '98822',
                    name: 'Kyle Naylor'
                  },
                  {
                    id: '122913',
                    name: 'Andrew Lasko'
                  },
                  {
                    id: '106631',
                    name: 'Cade Thueson'
                  },
                  {
                    id: '40572',
                    name: 'Brandon Holmes'
                  },
                  {
                    id: '76134',
                    name: 'Kathy Chen'
                  },
                  {
                    id: '45957',
                    name: 'Jed Wintle'
                  },
                  {
                    id: '107941',
                    name: 'Tyler Mickelsen'
                  }
                ],
                officeID: 4530,
                supportEmail: 'azwestsupport@vivintsolar.com',
                market: 'A',
                _parent: 'c52eaae4567250e90bbe3c9c4530a1ba'
              },
              {
                _id: '288f4954c602c2048c919b84a2d1e08b',
                _rev: '73-84a9540a09fc1addad8349769dbe76a4',
                name: 'AZ-02 East Solar',
                type: 'office',
                org: 'sales',
                parent: 'c52eaae4567250e90bbe3c9c4530a1ba',
                districtManager: [
                  {
                    id: '28724',
                    name: 'Adam Harper',
                    bonusAllocation: '30'
                  },
                  {
                    id: '29133',
                    name: 'Jeremy Long'
                  },
                  {
                    id: '1317',
                    name: 'Tyler Williams'
                  },
                  {
                    id: '33707',
                    name: 'Blake Cammack'
                  },
                  {
                    id: '63773',
                    name: 'Gregory Larson'
                  },
                  {
                    id: '66043',
                    name: 'Marcus Ward'
                  },
                  {
                    id: '94234',
                    name: 'Caleb Vincent'
                  },
                  {
                    id: '110470',
                    name: 'Santo Amodeo'
                  },
                  {
                    id: '103983',
                    name: 'Erick Thomas'
                  },
                  {
                    id: '116099',
                    name: 'Alek Gilmore'
                  },
                  {
                    id: '40572',
                    name: 'Brandon Holmes'
                  },
                  {
                    id: '201920',
                    name: 'Todd Christensen'
                  },
                  {
                    id: '106631',
                    name: 'Cade Thueson'
                  },
                  {
                    id: '98822',
                    name: 'Kyle Naylor'
                  },
                  {
                    id: '122913',
                    name: 'Andrew Lasko'
                  },
                  {
                    id: '76134',
                    name: 'Kathy Chen'
                  },
                  {
                    id: '45957',
                    name: 'Jed Wintle'
                  },
                  {
                    id: '107941',
                    name: 'Tyler Mickelsen'
                  }
                ],
                officeID: 4531,
                supportEmail: 'azeastsupport@vivintsolar.com',
                market: 'A',
                _parent: 'c52eaae4567250e90bbe3c9c4530a1ba',
                _children: [
                  {
                    _id: '8b57e694ed757f2a2a6412647495e3f8',
                    _rev: '12-1d000374fb4668f4d113429277de62e1',
                    name: 'AZ-02A East Solar',
                    type: 'office',
                    org: 'sales',
                    parent: '288f4954c602c2048c919b84a2d1e08b',
                    officeID: 50420,
                    market: 'B',
                    districtManager: [
                      {
                        id: '110470',
                        name: 'Santo Amodeo'
                      }
                    ],
                    _parent: '288f4954c602c2048c919b84a2d1e08b'
                  }
                ]
              },
              {
                _id: '288f4954c602c2048c919b84a2d1f8ca',
                _rev: '46-001f8a4de1e3b4cb7f4254842358dfbf',
                name: 'HI-3 Kona Solar',
                type: 'office',
                org: 'sales',
                parent: 'c52eaae4567250e90bbe3c9c4530a1ba',
                districtManager: [
                  {
                    id: '45012',
                    name: 'Jeff Sorensen',
                    bonusAllocation: '30'
                  },
                  {
                    id: '61838',
                    name: 'Scott Whiting'
                  },
                  {
                    id: '47769',
                    name: 'Zachary Latimer'
                  },
                  {
                    id: '1317',
                    name: 'Tyler Williams'
                  },
                  {
                    id: '33707',
                    name: 'Blake Cammack'
                  },
                  {
                    id: '63773',
                    name: 'Gregory Larson'
                  },
                  {
                    id: '66043',
                    name: 'Marcus Ward'
                  },
                  {
                    id: '114254',
                    name: 'Deven Webster'
                  },
                  {
                    id: '40572',
                    name: 'Brandon Holmes'
                  },
                  {
                    id: '76134',
                    name: 'Kathy Chen'
                  },
                  {
                    id: '45957',
                    name: 'Jed Wintle'
                  },
                  {
                    id: '107941',
                    name: 'Tyler Mickelsen'
                  }
                ],
                officeID: 4528,
                supportEmail: 'konasupport@vivintsolar.com',
                market: 'B',
                _parent: 'c52eaae4567250e90bbe3c9c4530a1ba'
              },
              {
                _id: '6c4548ad0247cea45ee35032dcfe43e9',
                _rev: '21-08b478fe23f47d0d211f5a7448a6abcd',
                name: 'TX-01 Austin Solar',
                type: 'office',
                org: 'sales',
                parent: 'c52eaae4567250e90bbe3c9c4530a1ba',
                officeID: 7153,
                districtManager: [
                  {
                    id: '40572',
                    name: 'Brandon Holmes'
                  },
                  {
                    id: '76134',
                    name: 'Kathy Chen'
                  },
                  {
                    id: '45957',
                    name: 'Jed Wintle'
                  },
                  {
                    id: '107941',
                    name: 'Tyler Mickelsen'
                  }
                ],
                market: 'A',
                _parent: 'c52eaae4567250e90bbe3c9c4530a1ba'
              },
              {
                _id: '94ac74350d15f605c84ec2a6959f944d',
                _rev: '32-32e4ea7ffd779752866de4374f0dd4ce',
                name: 'UT-02 Wasatch North Solar',
                type: 'office',
                org: 'sales',
                parent: 'c52eaae4567250e90bbe3c9c4530a1ba',
                officeID: 6396,
                districtManager: [
                  {
                    id: '38731',
                    name: 'Chad Vogl'
                  },
                  {
                    id: '58331',
                    name: 'Julius Gillmore'
                  },
                  {
                    id: '95368',
                    name: 'Trevor Young'
                  },
                  {
                    id: '119064',
                    name: 'Terry Xanthos'
                  },
                  {
                    id: '61838',
                    name: 'Scott Whiting'
                  },
                  {
                    id: '116351',
                    name: 'Brock Morrison'
                  },
                  {
                    id: '94775',
                    name: 'Jonathan Jensen'
                  },
                  {
                    id: '21193',
                    name: 'Jason Crown'
                  },
                  {
                    id: '114605',
                    name: 'Zachary Randall'
                  },
                  {
                    id: '31469',
                    name: 'Jason Baugh'
                  },
                  {
                    id: '94200',
                    name: 'Benjamin Baker'
                  },
                  {
                    id: '116099',
                    name: 'Alek Gilmore'
                  },
                  {
                    id: '40572',
                    name: 'Brandon Holmes'
                  },
                  {
                    id: '201467',
                    name: 'Adam Layton'
                  },
                  {
                    id: '76134',
                    name: 'Kathy Chen'
                  }
                ],
                market: 'A',
                _parent: 'c52eaae4567250e90bbe3c9c4530a1ba'
              },
              {
                _id: '94ac74350d15f605c84ec2a695bc2d8c',
                _rev: '41-57d4294544e12cea0ea109bc40fd38f5',
                name: 'UT-03 Wasatch Central Solar',
                type: 'office',
                org: 'sales',
                parent: 'c52eaae4567250e90bbe3c9c4530a1ba',
                officeID: 6397,
                market: 'A',
                districtManager: [
                  {
                    id: '38731',
                    name: 'Chad Vogl'
                  },
                  {
                    id: '61838',
                    name: 'Scott Whiting'
                  },
                  {
                    id: '45957',
                    name: 'Jed Wintle'
                  },
                  {
                    id: '94200',
                    name: 'Benjamin Baker'
                  },
                  {
                    id: '107941',
                    name: 'Tyler Mickelsen'
                  },
                  {
                    id: '58331',
                    name: 'Julius Gillmore'
                  },
                  {
                    id: '119064',
                    name: 'Terry Xanthos'
                  },
                  {
                    id: '21193',
                    name: 'Jason Crown'
                  },
                  {
                    id: '116351',
                    name: 'Brock Morrison'
                  },
                  {
                    id: '114605',
                    name: 'Zachary Randall'
                  },
                  {
                    id: '31469',
                    name: 'Jason Baugh'
                  },
                  {
                    id: '94775',
                    name: 'Jonathan Jensen'
                  },
                  {
                    id: '116099',
                    name: 'Alek Gilmore'
                  },
                  {
                    id: '40572',
                    name: 'Brandon Holmes'
                  },
                  {
                    id: '120802',
                    name: 'Darrell Olsen'
                  },
                  {
                    id: '75581',
                    name: 'Tad Thueson'
                  },
                  {
                    id: '202562',
                    name: 'Austin Somers'
                  },
                  {
                    id: '76134',
                    name: 'Kathy Chen'
                  },
                  {
                    id: '108785',
                    name: 'Anthony Allred'
                  }
                ],
                _children: [
                  {
                    _id: '8b57e694ed757f2a2a64126474a0ad99',
                    _rev: '10-1477c28aab13e3d86e5827ac6a4509ca',
                    name: 'UT-03B Wasatch Central Solar',
                    type: 'office',
                    org: 'sales',
                    parent: '94ac74350d15f605c84ec2a695bc2d8c',
                    officeID: 50422,
                    market: 'B',
                    districtManager: [
                      {
                        id: '118843',
                        name: 'Alan Malae'
                      }
                    ],
                    _parent: '94ac74350d15f605c84ec2a695bc2d8c'
                  },
                  {
                    _id: '8b57e694ed757f2a2a64126474a123e0',
                    _rev: '12-e4081504e246aae5f6fc959d1e7fe751',
                    name: 'UT-03A Wasatch Central Solar',
                    type: 'office',
                    org: 'sales',
                    parent: '94ac74350d15f605c84ec2a695bc2d8c',
                    officeID: 50421,
                    market: 'B',
                    districtManager: [
                      {
                        id: '75581',
                        name: 'Tad Thueson'
                      }
                    ],
                    _parent: '94ac74350d15f605c84ec2a695bc2d8c'
                  }
                ],
                _parent: 'c52eaae4567250e90bbe3c9c4530a1ba'
              },
              {
                _id: 'af95fc6e4f479183d866c04a40dd7695',
                _rev: '8-e1a7abfc352d9751e828a0c4f3dba5a2',
                name: 'UT-06 Dixie Solar',
                type: 'office',
                org: 'sales',
                parent: 'c52eaae4567250e90bbe3c9c4530a1ba',
                officeID: 8433,
                districtManager: [
                  {
                    id: '202562',
                    name: 'Austin Somers'
                  },
                  {
                    id: '45957',
                    name: 'Jed Wintle'
                  },
                  {
                    id: '94200',
                    name: 'Benjamin Baker'
                  },
                  {
                    id: '29133',
                    name: 'Jeremy Long'
                  },
                  {
                    id: '107941',
                    name: 'Tyler Mickelsen'
                  },
                  {
                    id: '76134',
                    name: 'Kathy Chen'
                  }
                ],
                market: 'A',
                _parent: 'c52eaae4567250e90bbe3c9c4530a1ba'
              },
              {
                _id: 'c21285aec9a96ca95635ac0660d1092f',
                _rev: '6-12cf9d86517401c79143fd8054739733',
                name: 'UT-07 North Smarthome',
                type: 'office',
                org: 'sales',
                parent: 'c52eaae4567250e90bbe3c9c4530a1ba',
                officeID: 9002,
                districtManager: [
                  {
                    id: '201467',
                    name: 'Adam Layton'
                  },
                  {
                    id: '76134',
                    name: 'Kathy Chen'
                  },
                  {
                    id: '45957',
                    name: 'Jed Wintle'
                  },
                  {
                    id: '107941',
                    name: 'Tyler Mickelsen'
                  }
                ],
                market: 'A',
                _parent: 'c52eaae4567250e90bbe3c9c4530a1ba'
              },
              {
                _id: 'c21285aec9a96ca95635ac0660d6e560',
                _rev: '6-713e8a4f5c651a74f1daa379f3ad88a9',
                name: 'UT-08 Central Smarthome',
                type: 'office',
                org: 'sales',
                parent: 'c52eaae4567250e90bbe3c9c4530a1ba',
                officeID: 9003,
                districtManager: [
                  {
                    id: '201475',
                    name: 'Kamron Crandall'
                  },
                  {
                    id: '76134',
                    name: 'Kathy Chen'
                  },
                  {
                    id: '45957',
                    name: 'Jed Wintle'
                  },
                  {
                    id: '107941',
                    name: 'Tyler Mickelsen'
                  }
                ],
                market: 'A',
                _parent: 'c52eaae4567250e90bbe3c9c4530a1ba'
              },
              {
                _id: 'c7ed15f38449ea38cb104e860d6a1ce8',
                _rev: '12-5d3b4d7bd4ee4697644075f86c4108ac',
                name: 'UT-05 Uintah Solar',
                type: 'office',
                org: 'sales',
                parent: 'c52eaae4567250e90bbe3c9c4530a1ba',
                officeID: 8385,
                market: 'A',
                districtManager: [
                  {
                    id: '94283',
                    name: 'Matthew Stevenson'
                  },
                  {
                    id: '120802',
                    name: 'Darrell Olsen'
                  },
                  {
                    id: '94329',
                    name: 'Dusty Broadhead'
                  },
                  {
                    id: '94200',
                    name: 'Benjamin Baker'
                  },
                  {
                    id: '76134',
                    name: 'Kathy Chen'
                  },
                  {
                    id: '45957',
                    name: 'Jed Wintle'
                  },
                  {
                    id: '107941',
                    name: 'Tyler Mickelsen'
                  },
                  {
                    id: '116351',
                    name: 'Brock Morrison'
                  }
                ],
                _parent: 'c52eaae4567250e90bbe3c9c4530a1ba'
              },
              {
                _id: 'cb4da43c484fa0fe10df60a5953e1ce3',
                _rev: '28-e861b53da0827457205b4b0b8e3f7b7f',
                name: 'UT-04 Wasatch East Solar',
                type: 'office',
                org: 'sales',
                parent: 'c52eaae4567250e90bbe3c9c4530a1ba',
                officeID: 7519,
                market: 'A',
                districtManager: [
                  {
                    id: '107941',
                    name: 'Tyler Mickelsen'
                  },
                  {
                    id: '119064',
                    name: 'Terry Xanthos'
                  },
                  {
                    id: '200596',
                    name: 'Justin Whitesides'
                  },
                  {
                    id: '200606',
                    name: 'Peter Lukens'
                  },
                  {
                    id: '20573',
                    name: 'Chris Hansen'
                  },
                  {
                    id: '121271',
                    name: 'Jordan Smith'
                  },
                  {
                    id: '120913',
                    name: 'Theodore Smith'
                  },
                  {
                    id: '95780',
                    name: 'Patrick Carreiro'
                  },
                  {
                    id: '120993',
                    name: 'Tucker Reid'
                  },
                  {
                    id: '123279',
                    name: 'Hiroshi Inzunza'
                  },
                  {
                    id: '121993',
                    name: 'Skyler Householder'
                  },
                  {
                    id: '200318',
                    name: 'Jason Offret'
                  },
                  {
                    id: '122360',
                    name: 'Kyoshi Inzunza'
                  },
                  {
                    id: '200177',
                    name: 'Brad Smith'
                  },
                  {
                    id: '73073',
                    name: 'David Orellana'
                  },
                  {
                    id: '109913',
                    name: 'Evan Cornell'
                  },
                  {
                    id: '40572',
                    name: 'Brandon Holmes'
                  },
                  {
                    id: '118614',
                    name: 'Mark Farmer'
                  },
                  {
                    id: '120802',
                    name: 'Darrell Olsen'
                  },
                  {
                    id: '45957',
                    name: 'Jed Wintle'
                  },
                  {
                    id: '76134',
                    name: 'Kathy Chen'
                  },
                  {
                    id: '116351',
                    name: 'Brock Morrison'
                  }
                ],
                _parent: 'c52eaae4567250e90bbe3c9c4530a1ba'
              },
              {
                _id: 'e240c438f96f8419634673c7f99224f2',
                _rev: '44-4c24bc83701b12cd2da4bccb2722251a',
                name: 'HI-2 Maui Solar',
                type: 'office',
                parent: 'c52eaae4567250e90bbe3c9c4530a1ba',
                org: 'sales',
                officeID: 2926,
                supportEmail: 'mauisupport@vivintsolar.com',
                districtManager: [
                  {
                    id: '47769',
                    name: 'Zachary Latimer',
                    bonusAllocation: '70'
                  },
                  {
                    id: '1317',
                    name: 'Tyler Williams'
                  },
                  {
                    id: '33707',
                    name: 'Blake Cammack'
                  },
                  {
                    id: '63773',
                    name: 'Gregory Larson'
                  },
                  {
                    id: '66043',
                    name: 'Marcus Ward'
                  },
                  {
                    id: '66991',
                    name: 'Conway West'
                  },
                  {
                    id: '41707',
                    name: 'Kade Hansen'
                  },
                  {
                    id: '113462',
                    name: 'Matthew Kievit'
                  },
                  {
                    id: '9927',
                    name: 'Brandon Dooley'
                  },
                  {
                    id: '40572',
                    name: 'Brandon Holmes'
                  },
                  {
                    id: '76134',
                    name: 'Kathy Chen'
                  },
                  {
                    id: '45957',
                    name: 'Jed Wintle'
                  },
                  {
                    id: '107941',
                    name: 'Tyler Mickelsen'
                  }
                ],
                market: 'B',
                _parent: 'c52eaae4567250e90bbe3c9c4530a1ba'
              },
              {
                _id: 'e240c438f96f8419634673c7f992392b',
                _rev: '47-dd989e634db5b7814cd191ffe412fa86',
                name: 'HI-1 Oahu Solar',
                type: 'office',
                parent: 'c52eaae4567250e90bbe3c9c4530a1ba',
                org: 'sales',
                officeID: 2660,
                supportEmail: 'oahusupport@vivintsolar.com',
                districtManager: [
                  {
                    id: '47769',
                    name: 'Zachary Latimer',
                    bonusAllocation: '70'
                  },
                  {
                    id: '1317',
                    name: 'Tyler Williams'
                  },
                  {
                    id: '33707',
                    name: 'Blake Cammack'
                  },
                  {
                    id: '63773',
                    name: 'Gregory Larson'
                  },
                  {
                    id: '66043',
                    name: 'Marcus Ward'
                  },
                  {
                    id: '66991',
                    name: 'Conway West'
                  },
                  {
                    id: '9927',
                    name: 'Brandon Dooley'
                  },
                  {
                    id: '94659',
                    name: 'Zachary Vest'
                  },
                  {
                    id: '40572',
                    name: 'Brandon Holmes'
                  },
                  {
                    id: '76134',
                    name: 'Kathy Chen'
                  },
                  {
                    id: '45957',
                    name: 'Jed Wintle'
                  },
                  {
                    id: '107941',
                    name: 'Tyler Mickelsen'
                  }
                ],
                market: 'B',
                _parent: 'c52eaae4567250e90bbe3c9c4530a1ba'
              },
              {
                _id: 'f02fbbb4dd62dbde3068b399459d192b',
                _rev: '25-616d269af87e5d43976202cf117f99c9',
                name: 'NM-01 Albuquerque Solar',
                type: 'office',
                org: 'sales',
                parent: 'c52eaae4567250e90bbe3c9c4530a1ba',
                officeID: 6023,
                supportEmail: '',
                market: 'A',
                districtManager: [
                  {
                    id: '1317',
                    name: 'Tyler Williams'
                  },
                  {
                    id: '96855',
                    name: 'Brian Brooker'
                  },
                  {
                    id: '107466',
                    name: 'Andy Marlowe'
                  },
                  {
                    id: '116099',
                    name: 'Alek Gilmore'
                  },
                  {
                    id: '40572',
                    name: 'Brandon Holmes'
                  },
                  {
                    id: '115371',
                    name: 'Douglas Bowman'
                  },
                  {
                    id: '119686',
                    name: 'Tom Teaman'
                  },
                  {
                    id: '76134',
                    name: 'Kathy Chen'
                  },
                  {
                    id: '45957',
                    name: 'Jed Wintle'
                  },
                  {
                    id: '107941',
                    name: 'Tyler Mickelsen'
                  }
                ],
                _parent: 'c52eaae4567250e90bbe3c9c4530a1ba'
              },
              {
                _id: 'fd6c2150f71e1899da198c5f8034eebf',
                _rev: '51-9d8a4cdf1b703e26d39594c5feec7f66',
                name: 'UT-01 Wasatch South Solar',
                type: 'office',
                org: 'sales',
                parent: 'c52eaae4567250e90bbe3c9c4530a1ba',
                officeID: 5972,
                districtManager: [
                  {
                    id: '38731',
                    name: 'Chad Vogl'
                  },
                  {
                    id: '107941',
                    name: 'Tyler Mickelsen'
                  },
                  {
                    id: '116351',
                    name: 'Brock Morrison'
                  },
                  {
                    id: '31469',
                    name: 'Jason Baugh'
                  },
                  {
                    id: '21193',
                    name: 'Jason Crown'
                  },
                  {
                    id: '118655',
                    name: 'Daniel Beecroft'
                  },
                  {
                    id: '94200',
                    name: 'Benjamin Baker'
                  },
                  {
                    id: '58331',
                    name: 'Julius Gillmore'
                  },
                  {
                    id: '95368',
                    name: 'Trevor Young'
                  },
                  {
                    id: '119064',
                    name: 'Terry Xanthos'
                  },
                  {
                    id: '61838',
                    name: 'Scott Whiting'
                  },
                  {
                    id: '45957',
                    name: 'Jed Wintle'
                  },
                  {
                    id: '114605',
                    name: 'Zachary Randall'
                  },
                  {
                    id: '94775',
                    name: 'Jonathan Jensen'
                  },
                  {
                    id: '116099',
                    name: 'Alek Gilmore'
                  },
                  {
                    id: '40572',
                    name: 'Brandon Holmes'
                  },
                  {
                    id: '76134',
                    name: 'Kathy Chen'
                  },
                  {
                    id: '109520',
                    name: 'Benjamin Arthur'
                  }
                ],
                market: 'A',
                _children: [
                  {
                    _id: '0c2a0f8ce47b8a8383acecc8a858bb3d',
                    _rev: '9-035dd01e95481d9aac33e80e3544a5f1',
                    name: 'UT-01A Wasatch South Solar',
                    type: 'office',
                    org: 'sales',
                    parent: 'fd6c2150f71e1899da198c5f8034eebf',
                    officeID: 50423,
                    districtManager: [],
                    _parent: 'fd6c2150f71e1899da198c5f8034eebf'
                  }
                ],
                _parent: 'c52eaae4567250e90bbe3c9c4530a1ba'
              }
            ],
            _parent: 'e240c438f96f8419634673c7f991eb31'
          }
        ],
        _parent: '8e4003dbf818f90637881e2d8e0efc66'
      },
      {
        _id: 'e427e8b712f7e9777693f1735d00422b',
        _rev: '22-2c8e2b3584e2ba6fe22bf62f4bd26535',
        name: 'F1RST Region',
        type: 'region',
        org: 'sales',
        parent: '8e4003dbf818f90637881e2d8e0efc66',
        districtManager: [
          {
            id: '29134',
            name: 'Nicholas Hansen'
          },
          {
            id: '61849',
            name: 'Adam McClellan'
          },
          {
            id: '46665',
            name: 'Mark Toone'
          },
          {
            id: '20787',
            name: 'Darrell Doucette'
          },
          {
            id: '119839',
            name: 'Dave Allred'
          },
          {
            id: '63133',
            name: 'Jordan Laplace'
          }
        ],
        _children: [
          {
            _id: '750521139b7c4c3be0b855aad9544fc7',
            _rev: '7-eba19b756d1c3b1e8305c3ec07922a60',
            parent: 'e427e8b712f7e9777693f1735d00422b',
            name: 'Empire Division',
            type: 'region',
            org: 'sales',
            districtManager: [
              {
                id: '2594',
                name: 'Brandon Hanna'
              },
              {
                id: '46665',
                name: 'Mark Toone'
              },
              {
                id: '63133',
                name: 'Jordan Laplace'
              }
            ],
            _children: [
              {
                _id: '4ff9634c40d020dfcc10c53e47bc3b76',
                _rev: '2-35bc348ff54efe2168733169e1ff1ed0',
                name: 'Long Island Division',
                type: 'Region',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad9544fc7',
                officeID: 0,
                districtManager: [
                  {
                    id: '9467',
                    name: 'Patrick Jensen'
                  }
                ],
                _children: [
                  {
                    _id: '288f4954c602c2048c919b84a2d22ee0',
                    _rev: '64-dff7743c547a0765e6b8a531499b5a5c',
                    name: 'NY-2 Long Island East Solar',
                    type: 'office',
                    org: 'sales',
                    parent: '4ff9634c40d020dfcc10c53e47bc3b76',
                    districtManager: [
                      {
                        id: '42485',
                        name: 'Michael Brand'
                      },
                      {
                        id: '29133',
                        name: 'Jeremy Long'
                      },
                      {
                        id: '51904',
                        name: 'Brian Brownlee'
                      },
                      {
                        id: '94714',
                        name: 'Michael Uneberg'
                      },
                      {
                        id: '116222',
                        name: 'William Yule'
                      },
                      {
                        id: '94324',
                        name: 'Warith Saleem'
                      },
                      {
                        id: '74108',
                        name: 'Frantz Ostmann'
                      },
                      {
                        id: '94324',
                        name: 'Warith Saleem'
                      },
                      {
                        id: '9467',
                        name: 'Patrick Jensen'
                      },
                      {
                        id: '75005',
                        name: 'Brett Goldstein'
                      },
                      {
                        id: '200851',
                        name: 'Thomas Court'
                      },
                      {
                        id: '64062',
                        name: 'Lynsey Wilson'
                      },
                      {
                        id: '63681',
                        name: 'Jordan Levent'
                      },
                      {
                        id: '94926',
                        name: 'Matthew Gleason'
                      },
                      {
                        id: '118427',
                        name: 'Edward Fisher'
                      },
                      {
                        id: '51904',
                        name: 'Brian Brownlee'
                      }
                    ],
                    officeID: 4443,
                    supportEmail: 'Longislandsupport@vivintsolar.com',
                    market: 'B',
                    _parent: '4ff9634c40d020dfcc10c53e47bc3b76'
                  },
                  {
                    _id: 'e240c438f96f8419634673c7f992162f',
                    _rev: '59-23ee7f39bee236bec7d98a2dbf353ecd',
                    name: 'NY-1 Long Island West Solar',
                    type: 'office',
                    parent: '4ff9634c40d020dfcc10c53e47bc3b76',
                    org: 'sales',
                    officeID: 3378,
                    supportEmail: 'Longislandsupport@vivintsolar.com',
                    districtManager: [
                      {
                        id: '94329',
                        name: 'Dusty Broadhead',
                        bonusAllocation: '15'
                      },
                      {
                        id: '42485',
                        name: 'Michael Brand'
                      },
                      {
                        id: '29133',
                        name: 'Jeremy Long'
                      },
                      {
                        id: '75053',
                        name: 'Joseph Lombardi'
                      },
                      {
                        id: '74258',
                        name: 'Jesse Plotnick'
                      },
                      {
                        id: '116222',
                        name: 'William Yule'
                      },
                      {
                        id: '74108',
                        name: 'Frantz Ostmann'
                      },
                      {
                        id: '94324',
                        name: 'Warith Saleem'
                      },
                      {
                        id: '9467',
                        name: 'Patrick Jensen'
                      },
                      {
                        id: '51904',
                        name: 'Brian Brownlee'
                      },
                      {
                        id: '200851',
                        name: 'Thomas Court'
                      },
                      {
                        id: '64062',
                        name: 'Lynsey Wilson'
                      },
                      {
                        id: '63681',
                        name: 'Jordan Levent'
                      },
                      {
                        id: '51904',
                        name: 'Brian Brownlee'
                      },
                      {
                        id: '122425',
                        name: 'Anthony Fowler'
                      }
                    ],
                    market: 'B',
                    _parent: '4ff9634c40d020dfcc10c53e47bc3b76'
                  },
                  {
                    _id: 'f02fbbb4dd62dbde3068b399459d39b3',
                    _rev: '41-3e3d47f93e396eb10620bb6090a2825b',
                    name: 'NY-03 Nassau Solar',
                    type: 'office',
                    org: 'sales',
                    parent: '4ff9634c40d020dfcc10c53e47bc3b76',
                    officeID: 6026,
                    supportEmail: 'Nassausupport@vivintsolar.com',
                    market: 'B',
                    districtManager: [
                      {
                        id: '42485',
                        name: 'Michael Brand'
                      },
                      {
                        id: '58388',
                        name: 'Jordan Borchert'
                      },
                      {
                        id: '29133',
                        name: 'Jeremy Long'
                      },
                      {
                        id: '9467',
                        name: 'Patrick Jensen'
                      },
                      {
                        id: '75005',
                        name: 'Brett Goldstein'
                      },
                      {
                        id: '74108',
                        name: 'Frantz Ostmann'
                      },
                      {
                        id: '94324',
                        name: 'Warith Saleem'
                      },
                      {
                        id: '51904',
                        name: 'Brian Brownlee'
                      },
                      {
                        id: '200797',
                        name: 'Chase Russell'
                      },
                      {
                        id: '200851',
                        name: 'Thomas Court'
                      },
                      {
                        id: '64062',
                        name: 'Lynsey Wilson'
                      },
                      {
                        id: '122425',
                        name: 'Anthony Fowler'
                      },
                      {
                        id: '51904',
                        name: 'Brian Brownlee'
                      }
                    ],
                    _parent: '4ff9634c40d020dfcc10c53e47bc3b76'
                  },
                  {
                    _id: 'feba53a0d7ee6b64c9a5d6eb94361cb1',
                    _rev: '9-f7beda8c37fdffefc31ac5f2c40ce95f',
                    name: 'NY-08 LongIsland Smarthome',
                    type: 'office',
                    org: 'sales',
                    parent: '4ff9634c40d020dfcc10c53e47bc3b76',
                    officeID: 7518,
                    districtManager: [
                      {
                        id: '64062',
                        name: 'Lynsey Wilson'
                      },
                      {
                        id: '51904',
                        name: 'Brian Brownlee'
                      },
                      {
                        id: '2594',
                        name: 'Brandon Hanna'
                      }
                    ],
                    market: 'B',
                    _parent: '4ff9634c40d020dfcc10c53e47bc3b76'
                  }
                ],
                _parent: '750521139b7c4c3be0b855aad9544fc7'
              },
              {
                _id: '4ff9634c40d020dfcc10c53e47dc0aae',
                _rev: '5-11f6588d251e2ea48e5d3201091ddad3',
                name: 'New York Division',
                type: 'Region',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad9544fc7',
                officeID: 0,
                districtManager: [
                  {
                    id: '94316',
                    name: 'Zachary Allred'
                  },
                  {
                    id: '121228',
                    name: 'James Preece'
                  },
                  {
                    id: '2594',
                    name: 'Brandon Hanna'
                  }
                ],
                _parent: '750521139b7c4c3be0b855aad9544fc7',
                _children: [
                  {
                    _id: '73443c0bbff612b808fe1f7236f97e9c',
                    _rev: '32-d7d44427eeb21bb0533df0dfd0e7786f',
                    name: 'NY-06 Rockland Solar',
                    type: 'office',
                    org: 'sales',
                    parent: '4ff9634c40d020dfcc10c53e47dc0aae',
                    officeID: 6388,
                    districtManager: [
                      {
                        id: '29133',
                        name: 'Jeremy Long'
                      },
                      {
                        id: '106361',
                        name: 'Erik Orton'
                      },
                      {
                        id: '113992',
                        name: 'Anthony Nuara'
                      },
                      {
                        id: '95009',
                        name: 'Philip Lockwood'
                      },
                      {
                        id: '59726',
                        name: 'Kyle Potter'
                      },
                      {
                        id: '121228',
                        name: 'James Preece'
                      },
                      {
                        id: '61994',
                        name: 'Chase Taylor'
                      },
                      {
                        id: '9467',
                        name: 'Patrick Jensen'
                      },
                      {
                        id: '94324',
                        name: 'Warith Saleem'
                      },
                      {
                        id: '75138',
                        name: 'Jordan Maya'
                      },
                      {
                        id: '94801',
                        name: 'Osahon Aikhionbare'
                      },
                      {
                        id: '106647',
                        name: 'Michael Monteleone'
                      },
                      {
                        id: '200851',
                        name: 'Thomas Court'
                      },
                      {
                        id: '64062',
                        name: 'Lynsey Wilson'
                      }
                    ],
                    market: 'B',
                    _parent: '4ff9634c40d020dfcc10c53e47dc0aae'
                  },
                  {
                    _id: '73443c0bbff612b808fe1f7236fd6686',
                    _rev: '27-b5f50f07fb57166e91fbe16957f9da45',
                    name: 'NY-07 Poughkeepsie Solar',
                    type: 'office',
                    org: 'sales',
                    parent: '4ff9634c40d020dfcc10c53e47dc0aae',
                    officeID: 6389,
                    market: 'B',
                    districtManager: [
                      {
                        id: '29133',
                        name: 'Jeremy Long'
                      },
                      {
                        id: '96762',
                        name: 'Daniel Rizzo'
                      },
                      {
                        id: '105733',
                        name: 'John Mandelino'
                      },
                      {
                        id: '121228',
                        name: 'James Preece'
                      },
                      {
                        id: '9467',
                        name: 'Patrick Jensen'
                      },
                      {
                        id: '94329',
                        name: 'Dusty Broadhead'
                      },
                      {
                        id: '201192',
                        name: 'Andrew Semel-DeFeo'
                      },
                      {
                        id: '201189',
                        name: 'Steven Lapage'
                      },
                      {
                        id: '94324',
                        name: 'Warith Saleem'
                      },
                      {
                        id: '201388',
                        name: 'Damien Semel-Defeo'
                      },
                      {
                        id: '200851',
                        name: 'Thomas Court'
                      },
                      {
                        id: '64062',
                        name: 'Lynsey Wilson'
                      },
                      {
                        id: '76974',
                        name: 'Doug Yates'
                      }
                    ],
                    _parent: '4ff9634c40d020dfcc10c53e47dc0aae'
                  },
                  {
                    _id: 'e91a484d53e457c200fb599f3900d10e',
                    _rev: '39-0e8635dfdd67a4d9a6e17bdee8909943',
                    name: 'NY-04 Albany Solar',
                    type: 'office',
                    org: 'sales',
                    parent: '4ff9634c40d020dfcc10c53e47dc0aae',
                    officeID: 4529,
                    supportEmail: 'Albanysupport@vivintsolar.com',
                    districtManager: [
                      {
                        id: '95534',
                        name: 'Zachary Timmerman'
                      },
                      {
                        id: '76292',
                        name: 'Jacob Anderson'
                      },
                      {
                        id: '29133',
                        name: 'Jeremy Long'
                      },
                      {
                        id: '94316',
                        name: 'Zachary Allred'
                      },
                      {
                        id: '96762',
                        name: 'Daniel Rizzo'
                      },
                      {
                        id: '121228',
                        name: 'James Preece'
                      },
                      {
                        id: '9467',
                        name: 'Patrick Jensen'
                      },
                      {
                        id: '94324',
                        name: 'Warith Saleem'
                      },
                      {
                        id: '76974',
                        name: 'Doug Yates'
                      },
                      {
                        id: '65368',
                        name: 'Dave Yates'
                      },
                      {
                        id: '201388',
                        name: 'Damien Semel-Defeo'
                      },
                      {
                        id: '201192',
                        name: 'Andrew Semel-DeFeo'
                      },
                      {
                        id: '51904',
                        name: 'Brian Brownlee'
                      },
                      {
                        id: '200851',
                        name: 'Thomas Court'
                      },
                      {
                        id: '64062',
                        name: 'Lynsey Wilson'
                      },
                      {
                        id: '203618',
                        name: 'Wilfredo Madrid'
                      },
                      {
                        id: '51904',
                        name: 'Brian Brownlee'
                      }
                    ],
                    market: 'B',
                    _parent: '4ff9634c40d020dfcc10c53e47dc0aae'
                  },
                  {
                    _id: 'f02fbbb4dd62dbde3068b399459d307d',
                    _rev: '43-f5698b3b95395431d958b0766c1bd00c',
                    name: 'NY-05 NYC North Solar',
                    type: 'office',
                    org: 'sales',
                    parent: '4ff9634c40d020dfcc10c53e47dc0aae',
                    officeID: 6027,
                    market: 'B',
                    districtManager: [
                      {
                        id: '94316',
                        name: 'Zachary Allred'
                      },
                      {
                        id: '29133',
                        name: 'Jeremy Long'
                      },
                      {
                        id: '106647',
                        name: 'Michael Monteleone'
                      },
                      {
                        id: '9467',
                        name: 'Patrick Jensen'
                      },
                      {
                        id: '94324',
                        name: 'Warith Saleem'
                      },
                      {
                        id: '113992',
                        name: 'Anthony Nuara'
                      },
                      {
                        id: '51904',
                        name: 'Brian Brownlee'
                      }
                    ],
                    _parent: '4ff9634c40d020dfcc10c53e47dc0aae'
                  }
                ]
              }
            ],
            _parent: 'e427e8b712f7e9777693f1735d00422b'
          },
          {
            _id: '750521139b7c4c3be0b855aad95453b4',
            _rev: '4-bafce8438ce968832175e35ec4618f97',
            parent: 'e427e8b712f7e9777693f1735d00422b',
            name: 'Grit Division',
            type: 'region',
            org: 'sales',
            manager: {
              id: '29134',
              name: 'Nicholas Hansen'
            },
            districtManager: [
              {
                id: '29134',
                name: 'Nicholas Hansen'
              },
              {
                id: '46665',
                name: 'Mark Toone'
              },
              {
                id: '63133',
                name: 'Jordan Laplace'
              }
            ],
            _children: [
              {
                _id: '4ff9634c40d020dfcc10c53e47f03fc0',
                _rev: '4-30d2f4b73c24c0368c3bd1d65c5cbfca',
                name: 'Jersey Strong Division',
                type: 'Region',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad95453b4',
                officeID: 0,
                districtManager: [
                  {
                    id: '61066',
                    name: 'Brandon Seidel'
                  },
                  {
                    id: '74344',
                    name: 'Anthony Monaco'
                  }
                ],
                _parent: '750521139b7c4c3be0b855aad95453b4',
                _children: [
                  {
                    _id: 'cec29b1c39ba5bdbea527ad91a84aaef',
                    _rev: '57-05859d6cd7065a022cd792e8144ff2a7',
                    name: 'NJ-4 Jersey Shore Solar',
                    type: 'office',
                    org: 'sales',
                    parent: '4ff9634c40d020dfcc10c53e47f03fc0',
                    districtManager: [
                      {
                        id: '75138',
                        name: 'Jordan Maya'
                      },
                      {
                        id: '29133',
                        name: 'Jeremy Long'
                      },
                      {
                        id: '95326',
                        name: 'Ryan Antoniuk'
                      },
                      {
                        id: '119064',
                        name: 'Terry Xanthos'
                      },
                      {
                        id: '96260',
                        name: 'James Graver'
                      },
                      {
                        id: '104369',
                        name: 'Stephen Ay'
                      },
                      {
                        id: '109619',
                        name: 'Chief Whitehead'
                      },
                      {
                        id: '57882',
                        name: 'Daniel Riddle'
                      },
                      {
                        id: '94316',
                        name: 'Zachary Allred'
                      },
                      {
                        id: '122735',
                        name: 'Philip Chamberlain'
                      },
                      {
                        id: '120056',
                        name: 'Johnny Cruz'
                      },
                      {
                        id: '9152',
                        name: 'Jeff Strong'
                      },
                      {
                        id: '74344',
                        name: 'Anthony Monaco'
                      },
                      {
                        id: '64062',
                        name: 'Lynsey Wilson'
                      }
                    ],
                    officeID: 4549,
                    supportEmail: 'jerseyshoresupport@vivintsolar.com',
                    market: 'B',
                    _parent: '4ff9634c40d020dfcc10c53e47f03fc0'
                  },
                  {
                    _id: 'e91a484d53e457c200fb599f390031ab',
                    _rev: '69-0c90e546303604484f37029c72fbd5be',
                    name: 'NJ-03 South Jersey Solar',
                    type: 'office',
                    org: 'sales',
                    parent: '4ff9634c40d020dfcc10c53e47f03fc0',
                    officeID: 4438,
                    supportEmail: 'jerseysouthsupport@vivintsolar.com',
                    districtManager: [
                      {
                        id: '29133',
                        name: 'Jeremy Long'
                      },
                      {
                        id: '94618',
                        name: 'Jamaine Olson'
                      },
                      {
                        id: '119064',
                        name: 'Terry Xanthos'
                      },
                      {
                        id: '96260',
                        name: 'James Graver'
                      },
                      {
                        id: '104369',
                        name: 'Stephen Ay'
                      },
                      {
                        id: '109619',
                        name: 'Chief Whitehead'
                      },
                      {
                        id: '57882',
                        name: 'Daniel Riddle'
                      },
                      {
                        id: '117628',
                        name: 'Jack Chamberlain'
                      },
                      {
                        id: '94316',
                        name: 'Zachary Allred'
                      },
                      {
                        id: '99604',
                        name: 'Juan Arraya'
                      },
                      {
                        id: '9152',
                        name: 'Jeff Strong'
                      },
                      {
                        id: '117645',
                        name: 'Drew Schanen'
                      },
                      {
                        id: '74344',
                        name: 'Anthony Monaco'
                      },
                      {
                        id: '64062',
                        name: 'Lynsey Wilson'
                      }
                    ],
                    market: 'B',
                    _parent: '4ff9634c40d020dfcc10c53e47f03fc0'
                  },
                  {
                    _id: 'f02fbbb4dd62dbde3068b399459cfbf0',
                    _rev: '36-99934fe12b3f241be401f2b7f240aa47',
                    name: 'NJ-06 Atlantic City Solar',
                    type: 'office',
                    org: 'sales',
                    parent: '4ff9634c40d020dfcc10c53e47f03fc0',
                    officeID: 6021,
                    supportEmail: 'atlanticcitysupport@vivintsolar.com',
                    market: 'B',
                    districtManager: [
                      {
                        id: '74344',
                        name: 'Anthony Monaco'
                      },
                      {
                        id: '29133',
                        name: 'Jeremy Long'
                      },
                      {
                        id: '99604',
                        name: 'Juan Arraya'
                      },
                      {
                        id: '29134',
                        name: 'Nicholas Hansen'
                      },
                      {
                        id: '121541',
                        name: 'MaryLee Paolillo'
                      },
                      {
                        id: '119064',
                        name: 'Terry Xanthos'
                      },
                      {
                        id: '104778',
                        name: "Vincent D'Amelio"
                      },
                      {
                        id: '104369',
                        name: 'Stephen Ay'
                      },
                      {
                        id: '109619',
                        name: 'Chief Whitehead'
                      },
                      {
                        id: '57882',
                        name: 'Daniel Riddle'
                      },
                      {
                        id: '94316',
                        name: 'Zachary Allred'
                      },
                      {
                        id: '9152',
                        name: 'Jeff Strong'
                      },
                      {
                        id: '111660',
                        name: 'Mair Costa'
                      },
                      {
                        id: '124284',
                        name: 'Joseph Ruple'
                      },
                      {
                        id: '119370',
                        name: 'Konrad Barjuah'
                      },
                      {
                        id: '74344',
                        name: 'Anthony Monaco'
                      },
                      {
                        id: '64062',
                        name: 'Lynsey Wilson'
                      }
                    ],
                    _parent: '4ff9634c40d020dfcc10c53e47f03fc0'
                  }
                ]
              },
              {
                _id: 'cb9f6d33d058288f44ad03bd650c4986',
                _rev: '3-d26f0b51eeb6fe69fd9c9aebaf7f4779',
                name: 'True North Division',
                type: 'Region',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad95453b4',
                officeID: 0,
                districtManager: [
                  {
                    id: '29663',
                    name: 'Courtney Torgesen'
                  },
                  {
                    id: '74344',
                    name: 'Anthony Monaco'
                  }
                ],
                _children: [
                  {
                    _id: '288f4954c602c2048c919b84a2d43cda',
                    _rev: '84-65f15836e49e13df75d7f7bd6eaa77f8',
                    name: 'NJ-1 North Jersey Solar',
                    type: 'office',
                    org: 'sales',
                    parent: 'cb9f6d33d058288f44ad03bd650c4986',
                    districtManager: [
                      {
                        id: '29133',
                        name: 'Jeremy Long'
                      },
                      {
                        id: '29663',
                        name: 'Courtney Torgesen'
                      },
                      {
                        id: '106631',
                        name: 'Cade Thueson'
                      },
                      {
                        id: '40572',
                        name: 'Brandon Holmes'
                      },
                      {
                        id: '100794',
                        name: 'Robert Wyssling'
                      },
                      {
                        id: '97639',
                        name: 'Nkosi Stewart'
                      },
                      {
                        id: '119064',
                        name: 'Terry Xanthos'
                      },
                      {
                        id: '96260',
                        name: 'James Graver'
                      },
                      {
                        id: '104369',
                        name: 'Stephen Ay'
                      },
                      {
                        id: '109619',
                        name: 'Chief Whitehead'
                      },
                      {
                        id: '57882',
                        name: 'Daniel Riddle'
                      },
                      {
                        id: '74108',
                        name: 'Frantz Ostmann'
                      },
                      {
                        id: '94340',
                        name: 'Spencer Craig'
                      },
                      {
                        id: '104436',
                        name: 'Matthew Hofherr'
                      },
                      {
                        id: '9152',
                        name: 'Jeff Strong'
                      },
                      {
                        id: '94317',
                        name: 'Tanner Chamberlain'
                      },
                      {
                        id: '74344',
                        name: 'Anthony Monaco'
                      },
                      {
                        id: '64062',
                        name: 'Lynsey Wilson'
                      },
                      {
                        id: '120056',
                        name: 'Johnny Cruz'
                      }
                    ],
                    officeID: 2266,
                    supportEmail: 'Jerseynorthsupport@vivintsolar.com',
                    market: 'B',
                    _parent: 'cb9f6d33d058288f44ad03bd650c4986'
                  },
                  {
                    _id: '4364b6070c11a042d06e6c8c2d58d207',
                    _rev: '57-3c4b55079c23ae9f76c266a123cfef1f',
                    name: 'NJ-2 NYC South Solar',
                    officeID: 4412,
                    supportEmail: 'nycsouthsupport@vivintsolar.com',
                    org: 'sales',
                    parent: 'cb9f6d33d058288f44ad03bd650c4986',
                    type: 'office',
                    districtManager: [
                      {
                        id: '94177',
                        name: 'Cameron Catmull',
                        bonusAllocation: '10'
                      },
                      {
                        id: '94316',
                        name: 'Zachary Allred',
                        bonusAllocation: '70'
                      },
                      {
                        id: '42485',
                        name: 'Michael Brand'
                      },
                      {
                        id: '29133',
                        name: 'Jeremy Long'
                      },
                      {
                        id: '94324',
                        name: 'Warith Saleem'
                      },
                      {
                        id: '96984',
                        name: 'Chris Castellonese'
                      },
                      {
                        id: '94317',
                        name: 'Tanner Chamberlain'
                      },
                      {
                        id: '121228',
                        name: 'James Preece'
                      },
                      {
                        id: '119064',
                        name: 'Terry Xanthos'
                      },
                      {
                        id: '96260',
                        name: 'James Graver'
                      },
                      {
                        id: '104369',
                        name: 'Stephen Ay'
                      },
                      {
                        id: '109619',
                        name: 'Chief Whitehead'
                      },
                      {
                        id: '57882',
                        name: 'Daniel Riddle'
                      },
                      {
                        id: '74108',
                        name: 'Frantz Ostmann'
                      },
                      {
                        id: '94316',
                        name: 'Zachary Allred'
                      },
                      {
                        id: '9152',
                        name: 'Jeff Strong'
                      },
                      {
                        id: '74344',
                        name: 'Anthony Monaco'
                      },
                      {
                        id: '64062',
                        name: 'Lynsey Wilson'
                      },
                      {
                        id: '120056',
                        name: 'Johnny Cruz'
                      }
                    ],
                    market: 'B',
                    _parent: 'cb9f6d33d058288f44ad03bd650c4986'
                  },
                  {
                    _id: 'dfaf57bfd11d09ae9e0677647ed15b1f',
                    _rev: '46-f3181c5b8297932f90a4e1e95c1b5e75',
                    name: 'NJ-05 Princeton Solar',
                    type: 'office',
                    org: 'sales',
                    parent: 'cb9f6d33d058288f44ad03bd650c4986',
                    officeID: 6020,
                    supportEmail: 'Princetonsupport@vivintsolar.com',
                    market: 'B',
                    districtManager: [
                      {
                        id: '29133',
                        name: 'Jeremy Long'
                      },
                      {
                        id: '94340',
                        name: 'Spencer Craig'
                      },
                      {
                        id: '112916',
                        name: 'Amos Oveson'
                      },
                      {
                        id: '29663',
                        name: 'Courtney Torgesen'
                      },
                      {
                        id: '120056',
                        name: 'Jonathan Cruz'
                      },
                      {
                        id: '119064',
                        name: 'Terry Xanthos'
                      },
                      {
                        id: '104369',
                        name: 'Stephen Ay'
                      },
                      {
                        id: '109619',
                        name: 'Chief Whitehead'
                      },
                      {
                        id: '57882',
                        name: 'Daniel Riddle'
                      },
                      {
                        id: '74108',
                        name: 'Frantz Ostmann'
                      },
                      {
                        id: '94316',
                        name: 'Zachary Allred'
                      },
                      {
                        id: '9152',
                        name: 'Jeff Strong'
                      },
                      {
                        id: '94317',
                        name: 'Tanner Chamberlain'
                      },
                      {
                        id: '74344',
                        name: 'Anthony Monaco'
                      },
                      {
                        id: '64062',
                        name: 'Lynsey Wilson'
                      }
                    ],
                    _parent: 'cb9f6d33d058288f44ad03bd650c4986'
                  },
                  {
                    _id: 'feba53a0d7ee6b64c9a5d6eb94351ab2',
                    _rev: '9-26e845a0808e58ab4de3f93f19295ab9',
                    name: 'NJ-07 Central Smarthome',
                    type: 'office',
                    org: 'sales',
                    parent: 'cb9f6d33d058288f44ad03bd650c4986',
                    officeID: 7520,
                    market: 'B',
                    districtManager: [
                      {
                        id: '64062',
                        name: 'Lynsey Wilson'
                      }
                    ],
                    _parent: 'cb9f6d33d058288f44ad03bd650c4986'
                  }
                ],
                _parent: '750521139b7c4c3be0b855aad95453b4'
              },
              {
                _id: 'cb9f6d33d058288f44ad03bd652e0108',
                _rev: '7-7220b77e63a29fe18afb741d87c5be5e',
                name: 'Philadelphia Division',
                type: 'Region',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad95453b4',
                officeID: 0,
                districtManager: [
                  {
                    id: '51904',
                    name: 'Brian Brownlee'
                  },
                  {
                    id: '114747',
                    name: 'David Edwards'
                  },
                  {
                    id: '58036',
                    name: 'Dillon Brown'
                  },
                  {
                    id: '74344',
                    name: 'Anthony Monaco'
                  }
                ],
                _children: [
                  {
                    _id: '3b5ba369af849e24b82d0abb8b3a8a6b',
                    _rev: '53-a01088c862fd8a09ff5ec8992a752355',
                    name: 'PA-01 Philly South Solar',
                    type: 'office',
                    org: 'sales',
                    parent: 'cb9f6d33d058288f44ad03bd652e0108',
                    officeID: 6028,
                    districtManager: [
                      {
                        id: '95802',
                        name: 'Nick Hansen'
                      },
                      {
                        id: '29133',
                        name: 'Jeremy Long'
                      },
                      {
                        id: '55941',
                        name: 'Jon Sanders'
                      },
                      {
                        id: '118820',
                        name: 'Steven Habina'
                      },
                      {
                        id: '104369',
                        name: 'Stephen Ay'
                      },
                      {
                        id: '109619',
                        name: 'Chief Whitehead'
                      },
                      {
                        id: '57882',
                        name: 'Daniel Riddle'
                      },
                      {
                        id: '94316',
                        name: 'Zachary Allred'
                      },
                      {
                        id: '114001',
                        name: 'Mark Chase'
                      },
                      {
                        id: '103184',
                        name: 'Xavier Kimbrough'
                      },
                      {
                        id: '9152',
                        name: 'Jeff Strong'
                      },
                      {
                        id: '114747',
                        name: 'David Edwards'
                      },
                      {
                        id: '58036',
                        name: 'Dillon Brown'
                      },
                      {
                        id: '74344',
                        name: 'Anthony Monaco'
                      },
                      {
                        id: '64062',
                        name: 'Lynsey Wilson'
                      },
                      {
                        id: '200939',
                        name: 'Joel Perez'
                      }
                    ],
                    market: 'B',
                    _parent: 'cb9f6d33d058288f44ad03bd652e0108'
                  },
                  {
                    _id: '3b5ba369af849e24b82d0abb8b3d18df',
                    _rev: '37-c49199ddeefb33396afad60b0853f87a',
                    name: 'PA-02 Philly North Solar',
                    type: 'office',
                    org: 'sales',
                    parent: 'cb9f6d33d058288f44ad03bd652e0108',
                    officeID: 6324,
                    districtManager: [
                      {
                        id: '29133',
                        name: 'Jeremy Long'
                      },
                      {
                        id: '95802',
                        name: 'Nick Hansen'
                      },
                      {
                        id: '103184',
                        name: 'Xavier Kimbrough'
                      },
                      {
                        id: '120081',
                        name: 'William Ermi'
                      },
                      {
                        id: '123018',
                        name: 'Kimberly Baran'
                      },
                      {
                        id: '119064',
                        name: 'Terry Xanthos'
                      },
                      {
                        id: '104369',
                        name: 'Stephen Ay'
                      },
                      {
                        id: '109619',
                        name: 'Chief Whitehead'
                      },
                      {
                        id: '57882',
                        name: 'Daniel Riddle'
                      },
                      {
                        id: '94316',
                        name: 'Zachary Allred'
                      },
                      {
                        id: '9152',
                        name: 'Jeff Strong'
                      },
                      {
                        id: '114747',
                        name: 'David Edwards'
                      },
                      {
                        id: '109650',
                        name: 'Josh Chalphin'
                      },
                      {
                        id: '74344',
                        name: 'Anthony Monaco'
                      },
                      {
                        id: '51904',
                        name: 'Brian Brownlee'
                      },
                      {
                        id: '200939',
                        name: 'Joel Perez'
                      },
                      {
                        id: '64062',
                        name: 'Lynsey Wilson'
                      }
                    ],
                    market: 'B',
                    _parent: 'cb9f6d33d058288f44ad03bd652e0108'
                  }
                ],
                _parent: '750521139b7c4c3be0b855aad95453b4'
              }
            ],
            _parent: 'e427e8b712f7e9777693f1735d00422b'
          },
          {
            _id: '750521139b7c4c3be0b855aad9546396',
            _rev: '7-d9b18b30bd75037040a6d56da4f3cde3',
            parent: 'e427e8b712f7e9777693f1735d00422b',
            name: 'Legion Region',
            type: 'region',
            org: 'sales',
            districtManager: [
              {
                id: '20787',
                name: 'Darrell Doucette'
              },
              {
                id: '63133',
                name: 'Jordan Laplace'
              }
            ],
            _children: [
              {
                _id: '269866ab6d248e8b1512e56b744e9a36',
                _rev: '11-19f87df018532bd8e9c4c24f0e2d6e57',
                name: 'FL-02 West Orlando',
                type: 'office',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad9546396',
                officeID: 7762,
                districtManager: [
                  {
                    id: '201650',
                    name: 'Neal Rogers'
                  },
                  {
                    id: '20787',
                    name: 'Darrell Doucette'
                  },
                  {
                    id: '21868',
                    name: 'Michael Coons'
                  },
                  {
                    id: '64062',
                    name: 'Lynsey Wilson'
                  },
                  {
                    id: '94619',
                    name: 'Briant Katilus'
                  },
                  {
                    id: '118863',
                    name: 'George Berry'
                  }
                ],
                market: 'B',
                _parent: '750521139b7c4c3be0b855aad9546396'
              },
              {
                _id: '269866ab6d248e8b1512e56b74507b36',
                _rev: '13-36f7c72dad68dfafb1b05b69f912b394',
                name: 'FL-03 East Orlando',
                type: 'office',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad9546396',
                officeID: 7763,
                districtManager: [
                  {
                    id: '94619',
                    name: 'Briant Katilus'
                  },
                  {
                    id: '94345',
                    name: 'Joseph Wilkins'
                  },
                  {
                    id: '94619',
                    name: 'Briant Katilus'
                  },
                  {
                    id: '201650',
                    name: 'Neal Rogers'
                  },
                  {
                    id: '20787',
                    name: 'Darrell Doucette'
                  },
                  {
                    id: '63133',
                    name: 'Jordan Laplace'
                  },
                  {
                    id: '64062',
                    name: 'Lynsey Wilson'
                  },
                  {
                    id: '21868',
                    name: 'Michael Coons'
                  },
                  {
                    id: '118863',
                    name: 'George Berry'
                  }
                ],
                market: 'B',
                _parent: '750521139b7c4c3be0b855aad9546396'
              },
              {
                _id: '3b5ba369af849e24b82d0abb8b2e5494',
                _rev: '8-4242b55a0bc24bb59188497b9221e6e5',
                name: 'SC-01 Greenvile Solar',
                type: 'office',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad9546396',
                officeID: 6340,
                districtManager: [
                  {
                    id: '46665',
                    name: 'Mark Toone'
                  },
                  {
                    id: '29133',
                    name: 'Jeremy Long'
                  },
                  {
                    id: '94619',
                    name: 'Briant Katilus'
                  },
                  {
                    id: '62207',
                    name: 'Derek Landino'
                  },
                  {
                    id: '64062',
                    name: 'Lynsey Wilson'
                  }
                ],
                market: 'B',
                _parent: '750521139b7c4c3be0b855aad9546396'
              },
              {
                _id: '3b5ba369af849e24b82d0abb8b3103c5',
                _rev: '31-1cd050332e7a8aa6a15b0717cac23359',
                name: 'SC-02 Columbia Solar',
                type: 'office',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad9546396',
                officeID: 6341,
                districtManager: [
                  {
                    id: '46665',
                    name: 'Mark Toone'
                  },
                  {
                    id: '29133',
                    name: 'Jeremy Long'
                  },
                  {
                    id: '62207',
                    name: 'Derek Landino'
                  },
                  {
                    id: '94619',
                    name: 'Briant Katilus'
                  },
                  {
                    id: '64062',
                    name: 'Lynsey Wilson'
                  },
                  {
                    id: '96838',
                    name: 'Dakota LaBounty'
                  },
                  {
                    id: '106365',
                    name: 'Jacob Miller'
                  },
                  {
                    id: '119235',
                    name: 'Jacques Hatchett'
                  },
                  {
                    id: '63133',
                    name: 'Jordan Laplace'
                  },
                  {
                    id: '200340',
                    name: 'William Bernardi'
                  },
                  {
                    id: '201092',
                    name: 'Curtis Love'
                  },
                  {
                    id: '120059',
                    name: 'Joseph McClintock'
                  },
                  {
                    id: '64062',
                    name: 'Lynsey Wilson'
                  }
                ],
                market: 'B',
                _parent: '750521139b7c4c3be0b855aad9546396'
              },
              {
                _id: '3faca4278e55671ac3292dca48698309',
                _rev: '7-3d684f3c5629a365b5ba73116cccfe16',
                name: 'FL-07 Smarthome Solar',
                type: 'office',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad9546396',
                officeID: 50401,
                market: 'B',
                districtManager: [
                  {
                    id: '63133',
                    name: 'Jordan Laplace'
                  },
                  {
                    id: '20787',
                    name: 'Darrell Doucette'
                  }
                ],
                _parent: '750521139b7c4c3be0b855aad9546396'
              },
              {
                _id: '440adb9ef69b90eb3668b1def873bede',
                _rev: '2-c558f233795bfba081bfc79dd7afefe1',
                name: 'VA-01 Fairfax South Solar<br>',
                type: 'office',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad9546396',
                officeID: 50372,
                districtManager: [
                  {
                    id: '20787',
                    name: 'Darrell Doucette'
                  }
                ],
                _parent: '750521139b7c4c3be0b855aad9546396'
              },
              {
                _id: '440adb9ef69b90eb3668b1def876d6f5',
                _rev: '2-193bb3cf10b8a330331e60d333234698',
                name: 'VA-02 Fairfax North Solar',
                type: 'office',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad9546396',
                officeID: 50371,
                districtManager: [
                  {
                    id: '20787',
                    name: 'Darrell Doucette'
                  }
                ],
                _parent: '750521139b7c4c3be0b855aad9546396'
              },
              {
                _id: '47671d253151b14418b045b9f15c358b',
                _rev: '5-5d42f26d42e38e6dc13af5f02f1bf37c',
                name: 'FL-05 Tampa East Solar',
                type: 'office',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad9546396',
                officeID: 9001,
                districtManager: [
                  {
                    id: '63133',
                    name: 'Jordan Laplace'
                  },
                  {
                    id: '64062',
                    name: 'Lynsey Wilson'
                  }
                ],
                market: 'B',
                _parent: '750521139b7c4c3be0b855aad9546396',
                _children: [
                  {
                    _id: 'c430164ec6fa40186483dce75d99af57',
                    _rev: '1-7573a9a720603c897aa5ca5ef408239c',
                    name: 'New Organization',
                    type: 'office',
                    org: 'sales',
                    parent: '47671d253151b14418b045b9f15c358b',
                    officeID: 99999,
                    _parent: '47671d253151b14418b045b9f15c358b'
                  },
                  {
                    _id: 'c430164ec6fa40186483dce75d99ba82',
                    _rev: '1-7573a9a720603c897aa5ca5ef408239c',
                    name: 'New Organization',
                    type: 'office',
                    org: 'sales',
                    parent: '47671d253151b14418b045b9f15c358b',
                    officeID: 99999,
                    _parent: '47671d253151b14418b045b9f15c358b'
                  },
                  {
                    _id: 'c430164ec6fa40186483dce75d99bba1',
                    _rev: '1-7573a9a720603c897aa5ca5ef408239c',
                    name: 'New Organization',
                    type: 'office',
                    org: 'sales',
                    parent: '47671d253151b14418b045b9f15c358b',
                    officeID: 99999,
                    _parent: '47671d253151b14418b045b9f15c358b'
                  }
                ]
              },
              {
                _id: '65345b12978e814698473cdac72143c8',
                _rev: '9-c34985ca8bd46c3251f4767c7ebf0c9e',
                name: 'FL-04 Tampa West Solar',
                type: 'office',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad9546396',
                officeID: 9000,
                market: 'B',
                districtManager: [
                  {
                    id: '99604',
                    name: 'Juan Arraya'
                  },
                  {
                    id: '103921',
                    name: 'Shane McCann'
                  },
                  {
                    id: '201731',
                    name: 'Mark Letourneau'
                  }
                ],
                _parent: '750521139b7c4c3be0b855aad9546396'
              },
              {
                _id: '73443c0bbff612b808fe1f7236efc732',
                _rev: '21-c27d60dac4e13a8ac76f6025b6484333',
                name: 'SC-03 Charleston Solar',
                type: 'office',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad9546396',
                officeID: 6390,
                market: 'B',
                districtManager: [
                  {
                    id: '46665',
                    name: 'Mark Toone'
                  },
                  {
                    id: '94619',
                    name: 'Briant Katilus'
                  },
                  {
                    id: '62207',
                    name: 'Derek Landino'
                  },
                  {
                    id: '96477',
                    name: 'Brandon Lewis'
                  },
                  {
                    id: '96477',
                    name: 'Brandon Lewis'
                  },
                  {
                    id: '123807',
                    name: 'Erik Wilson'
                  },
                  {
                    id: '63133',
                    name: 'Jordan Laplace'
                  },
                  {
                    id: '64062',
                    name: 'Lynsey Wilson'
                  }
                ],
                _parent: '750521139b7c4c3be0b855aad9546396'
              },
              {
                _id: 'afb739dfee8175b2f163235d73307cef',
                _rev: '32-4ab06ffc84e1788c4d7647b6c31fa368',
                name: 'FL-01 Tampa Bay Solar',
                type: 'office',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad9546396',
                officeID: 7604,
                market: 'B',
                districtManager: [
                  {
                    id: '63133',
                    name: 'Jordan Laplace'
                  },
                  {
                    id: '201650',
                    name: 'Neal Rogers'
                  },
                  {
                    id: '69885',
                    name: 'Gene Lowell'
                  },
                  {
                    id: '61849',
                    name: 'Adam Mcclellan'
                  },
                  {
                    id: '46665',
                    name: 'Mark Toone'
                  },
                  {
                    id: '20787',
                    name: 'Darrell Doucette'
                  },
                  {
                    id: '99604',
                    name: 'Juan Arraya'
                  },
                  {
                    id: '64062',
                    name: 'Lynsey Wilson'
                  },
                  {
                    id: '103921',
                    name: 'Shane McCann'
                  },
                  {
                    id: '201969',
                    name: 'Clyde Larsen'
                  }
                ],
                _parent: '750521139b7c4c3be0b855aad9546396'
              },
              {
                _id: 'cb9f6d33d058288f44ad03bd6539545a',
                _rev: '3-fc5bf11e3f239c54748cd3ca14ce36ac',
                name: 'MD North Division',
                type: 'Region',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad9546396',
                officeID: 0,
                districtManager: [
                  {
                    id: '20787',
                    name: 'Darrell Doucette'
                  }
                ],
                _children: [
                  {
                    _id: '4364b6070c11a042d06e6c8c2d58fa6a',
                    _rev: '44-b1522017cd01424342ff7b3ff708d1ee',
                    name: 'MD-2 Baltimore Solar',
                    officeID: 4435,
                    supportEmail: 'baltimoresupport@vivintsolar.com',
                    org: 'sales',
                    parent: 'cb9f6d33d058288f44ad03bd6539545a',
                    type: 'office',
                    districtManager: [
                      {
                        id: '94303',
                        name: 'Brady Cullum',
                        bonusAllocation: '50'
                      },
                      {
                        id: '20787',
                        name: 'Darrell Douchette',
                        bonusAllocation: '50'
                      },
                      {
                        id: '46665',
                        name: 'Mark Toone'
                      },
                      {
                        id: '29133',
                        name: 'Jeremy Long'
                      },
                      {
                        id: '113991',
                        name: 'James White'
                      },
                      {
                        id: '118446',
                        name: 'Bridget McNally-Cardenas'
                      },
                      {
                        id: '94619',
                        name: 'Briant Katilus'
                      },
                      {
                        id: '94295',
                        name: 'Nicholas Butts'
                      },
                      {
                        id: '67280',
                        name: 'Nathan Bowen'
                      },
                      {
                        id: '74108',
                        name: 'Frantz Ostmann'
                      },
                      {
                        id: '120256',
                        name: 'Jason King'
                      },
                      {
                        id: '106583',
                        name: 'Gregory Carey'
                      },
                      {
                        id: '75769',
                        name: 'Nicholas Yucha'
                      },
                      {
                        id: '63133',
                        name: 'Jordan Laplace'
                      },
                      {
                        id: '64062',
                        name: 'Lynsey Wilson'
                      }
                    ],
                    market: 'B',
                    _parent: 'cb9f6d33d058288f44ad03bd6539545a'
                  },
                  {
                    _id: '9ead698e7eae5851e58c688b6a11a25b',
                    _rev: '40-a36ee265f4d14ab25d1a091c8539bc44',
                    name: 'MD-05 Eastern Shore Solar',
                    type: 'office',
                    org: 'sales',
                    parent: 'cb9f6d33d058288f44ad03bd6539545a',
                    officeID: 6391,
                    districtManager: [
                      {
                        id: '29133',
                        name: 'Jeremy Long'
                      },
                      {
                        id: '94345',
                        name: 'Joseph Wilkins'
                      },
                      {
                        id: '21304',
                        name: 'Jesse Pilcher'
                      },
                      {
                        id: '20787',
                        name: 'Darrell Doucette'
                      },
                      {
                        id: '46665',
                        name: 'Mark Toone'
                      },
                      {
                        id: '64062',
                        name: 'Lynsey Wilson'
                      },
                      {
                        id: '67280',
                        name: 'Nathan Bowen'
                      },
                      {
                        id: '94295',
                        name: 'Nicholas Butts'
                      },
                      {
                        id: '94770',
                        name: 'Michael Mussetter'
                      },
                      {
                        id: '74108',
                        name: 'Frantz Ostmann'
                      },
                      {
                        id: '94332',
                        name: 'Lee Oler'
                      },
                      {
                        id: '94303',
                        name: 'Brady Cullum'
                      },
                      {
                        id: '106583',
                        name: 'Gregory Carey'
                      },
                      {
                        id: '94774',
                        name: 'Dane McAllister'
                      },
                      {
                        id: '64062',
                        name: 'Lynsey Wilson'
                      }
                    ],
                    market: 'B',
                    _parent: 'cb9f6d33d058288f44ad03bd6539545a'
                  },
                  {
                    _id: 'e240c438f96f8419634673c7f991febf',
                    _rev: '59-32c4c60cc85f3963200b04e9ae235091',
                    name: 'MD-1 DC North Solar',
                    type: 'office',
                    parent: 'cb9f6d33d058288f44ad03bd6539545a',
                    org: 'sales',
                    officeID: 3264,
                    supportEmail: 'dcsupport@vivintsolar.com',
                    districtManager: [
                      {
                        id: '46665',
                        name: 'Mark Toone',
                        bonusAllocation: '70'
                      },
                      {
                        id: '63133',
                        name: 'Jordan Laplace',
                        bonusAllocation: '30'
                      },
                      {
                        id: '29344',
                        name: 'Keith Huling',
                        bonusAllocation: '0'
                      },
                      {
                        id: '29133',
                        name: 'Jeremy Long'
                      },
                      {
                        id: '96855',
                        name: 'Brian Brooker'
                      },
                      {
                        id: '113991',
                        name: 'James White'
                      },
                      {
                        id: '20787',
                        name: 'Darrell Doucette'
                      },
                      {
                        id: '118446',
                        name: 'Bridget McNally-Cardenas'
                      },
                      {
                        id: '67280',
                        name: 'Nathan Bowen'
                      },
                      {
                        id: '94295',
                        name: 'Nicholas Butts'
                      },
                      {
                        id: '37534',
                        name: 'Ryan Tall'
                      },
                      {
                        id: '74108',
                        name: 'Frantz Ostmann'
                      },
                      {
                        id: '114001',
                        name: 'Mark Chase'
                      },
                      {
                        id: '64062',
                        name: 'Lynsey Wilson'
                      },
                      {
                        id: '118152',
                        name: 'Quentin Dotson'
                      }
                    ],
                    market: 'B',
                    _parent: 'cb9f6d33d058288f44ad03bd6539545a'
                  }
                ],
                _parent: '750521139b7c4c3be0b855aad9546396'
              },
              {
                _id: 'cb9f6d33d058288f44ad03bd653f7e83',
                _rev: '3-6c8a4512e101fc4e72a74ff37b248510',
                name: 'MD South Division',
                type: 'Region',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad9546396',
                officeID: 0,
                districtManager: [
                  {
                    id: '20787',
                    name: 'Darrell Doucette'
                  }
                ],
                _children: [
                  {
                    _id: 'c0b51ea2a1d210578ae1c442deffb209',
                    _rev: '60-7bfe16282dcceeaf1f6d15ec2fb38431',
                    name: 'MD-04 DC South Solar',
                    type: 'office',
                    org: 'sales',
                    parent: 'cb9f6d33d058288f44ad03bd653f7e83',
                    officeID: 4924,
                    supportEmail: 'dcsupport@vivintsolar.com',
                    market: 'B',
                    districtManager: [
                      {
                        id: '47019',
                        name: 'Travis Hutchinson'
                      },
                      {
                        id: '46665',
                        name: 'Mark Toone'
                      },
                      {
                        id: '33707',
                        name: 'Blake Cammack'
                      },
                      {
                        id: '63773',
                        name: 'Gregory Larson'
                      },
                      {
                        id: '66043',
                        name: 'Marcus Ward'
                      },
                      {
                        id: '29133',
                        name: 'Jeremy Long'
                      },
                      {
                        id: '30793',
                        name: 'Chris Burgess'
                      },
                      {
                        id: '113991',
                        name: 'James White'
                      },
                      {
                        id: '118446',
                        name: 'Bridget McNally-Cardenas'
                      },
                      {
                        id: '104355',
                        name: 'Dallin Andrus'
                      },
                      {
                        id: '94295',
                        name: 'Nicholas Butts'
                      },
                      {
                        id: '67280',
                        name: 'Nathan Bowen'
                      },
                      {
                        id: '74108',
                        name: 'Frantz Ostmann'
                      },
                      {
                        id: '63133',
                        name: 'Jordan Laplace'
                      },
                      {
                        id: '20787',
                        name: 'Darrell Doucette'
                      },
                      {
                        id: '202517',
                        name: 'Hadley Ferrell'
                      },
                      {
                        id: '64062',
                        name: 'Lynsey Wilson'
                      }
                    ],
                    _parent: 'cb9f6d33d058288f44ad03bd653f7e83'
                  },
                  {
                    _id: 'e40a61784126037052d5cf75e6143ce1',
                    _rev: '8-b19999ee3b3a599bc545aa0d8f70db6c',
                    name: 'MD-07 Baltimore South Solar',
                    type: 'office',
                    org: 'sales',
                    parent: 'cb9f6d33d058288f44ad03bd653f7e83',
                    officeID: 7517,
                    market: 'B',
                    districtManager: [
                      {
                        id: '64062',
                        name: 'Lynsey Wilson'
                      }
                    ],
                    _parent: 'cb9f6d33d058288f44ad03bd653f7e83'
                  },
                  {
                    _id: 'e91a484d53e457c200fb599f393fed9e',
                    _rev: '31-486e8131a02d3afb7180a9c2df2f42bc',
                    name: 'MD-03 West Solar',
                    type: 'office',
                    org: 'sales',
                    parent: 'cb9f6d33d058288f44ad03bd653f7e83',
                    officeID: 4508,
                    supportEmail: 'fredericksupport@vivintsolar.com',
                    districtManager: [
                      {
                        id: '21304',
                        name: 'Jesse Pilcher'
                      },
                      {
                        id: '46665',
                        name: 'Mark Toone'
                      },
                      {
                        id: '29133',
                        name: 'Jeremy Long'
                      },
                      {
                        id: '113991',
                        name: 'James White'
                      },
                      {
                        id: '20787',
                        name: 'Darrell Doucette'
                      },
                      {
                        id: '63133',
                        name: 'Jordan Laplace'
                      },
                      {
                        id: '118495',
                        name: 'Wannita Landon'
                      },
                      {
                        id: '118446',
                        name: 'Bridget McNally-Cardenas'
                      },
                      {
                        id: '67280',
                        name: 'Nathan Bowen'
                      },
                      {
                        id: '94295',
                        name: 'Nicholas Butts'
                      },
                      {
                        id: '74108',
                        name: 'Frantz Ostmann'
                      },
                      {
                        id: '64062',
                        name: 'Lynsey Wilson'
                      }
                    ],
                    market: 'B',
                    _parent: 'cb9f6d33d058288f44ad03bd653f7e83'
                  }
                ],
                _parent: '750521139b7c4c3be0b855aad9546396'
              }
            ],
            _parent: 'e427e8b712f7e9777693f1735d00422b'
          },
          {
            _id: '750521139b7c4c3be0b855aad9547559',
            _rev: '9-ab5c897d325721ccc97ba1ae9fa85759',
            parent: 'e427e8b712f7e9777693f1735d00422b',
            name: 'New England Region',
            type: 'region',
            org: 'sales',
            districtManager: [
              {
                id: '61849',
                name: 'Adam Mcclellan'
              },
              {
                id: '46665',
                name: 'Mark Toone'
              }
            ],
            _parent: 'e427e8b712f7e9777693f1735d00422b',
            _children: [
              {
                _id: 'cb9f6d33d058288f44ad03bd65754a03',
                _rev: '4-907709fede355d4bbdbe96f8c726282b',
                name: 'North Mass Division',
                type: 'Region',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad9547559',
                officeID: 0,
                districtManager: [
                  {
                    id: '30160',
                    name: 'Chris Gallagher'
                  },
                  {
                    id: '94194',
                    name: 'Nicholas Howard'
                  }
                ],
                _parent: '750521139b7c4c3be0b855aad9547559',
                _children: [
                  {
                    _id: 'dfaf57bfd11d09ae9e0677647ed1620e',
                    _rev: '18-d30bfcb63931546940d1f2c5866312b2',
                    name: 'NH-01 Manchester Solar',
                    type: 'office',
                    org: 'sales',
                    parent: 'cb9f6d33d058288f44ad03bd65754a03',
                    officeID: 8419,
                    supportEmail: '',
                    market: 'B',
                    districtManager: [
                      {
                        id: '61849',
                        name: 'Adam Mcclellan'
                      },
                      {
                        id: '201162',
                        name: 'Donald Gomez'
                      },
                      {
                        id: '103254',
                        name: 'Mckenzie Watts'
                      },
                      {
                        id: '98456',
                        name: 'Jacob McClellan'
                      },
                      {
                        id: '64062',
                        name: 'Lynsey Wilson'
                      },
                      {
                        id: '119170',
                        name: 'Jeff Hershberger'
                      },
                      {
                        id: '120698',
                        name: 'Giancarlo Desario'
                      }
                    ],
                    _parent: 'cb9f6d33d058288f44ad03bd65754a03'
                  },
                  {
                    _id: 'dfaf57bfd11d09ae9e0677647ed1660c',
                    _rev: '20-f091198e371e616006fbe10bf0f2bdaf',
                    name: 'MA-05 Boston Central Solar',
                    type: 'office',
                    org: 'sales',
                    parent: 'cb9f6d33d058288f44ad03bd65754a03',
                    officeID: 6018,
                    market: 'B',
                    districtManager: [
                      {
                        id: '29133',
                        name: 'Jeremy Long'
                      },
                      {
                        id: '61849',
                        name: 'Adam Mcclellan'
                      },
                      {
                        id: '30160',
                        name: 'Chris Gallagher'
                      },
                      {
                        id: '68647',
                        name: 'Darcey Barrus'
                      },
                      {
                        id: '94194',
                        name: 'Nicholas Howard'
                      },
                      {
                        id: '65368',
                        name: 'Dave Yates'
                      },
                      {
                        id: '30831',
                        name: 'Troy Van Belle'
                      },
                      {
                        id: '50194',
                        name: 'Richard Howell'
                      },
                      {
                        id: '2587',
                        name: 'Howard Nell'
                      },
                      {
                        id: '201159',
                        name: 'Anthony Clark'
                      },
                      {
                        id: '64062',
                        name: 'Lynsey Wilson'
                      },
                      {
                        id: '119170',
                        name: 'Jeff Hershberger'
                      }
                    ],
                    _parent: 'cb9f6d33d058288f44ad03bd65754a03'
                  },
                  {
                    _id: 'e240c438f96f8419634673c7f9922057',
                    _rev: '54-316a0cad6412f00d4ed74983e914b5b1',
                    name: 'MA-1 Boston North Solar',
                    type: 'office',
                    parent: 'cb9f6d33d058288f44ad03bd65754a03',
                    org: 'sales',
                    officeID: 2659,
                    supportEmail: 'bostonnorthsupport@vivintsolar.com',
                    districtManager: [
                      {
                        id: '61849',
                        name: 'Adam Mcclellan'
                      },
                      {
                        id: '29133',
                        name: 'Jeremy Long'
                      },
                      {
                        id: '113996',
                        name: 'Amanda Powers'
                      },
                      {
                        id: '68647',
                        name: 'Darcey Barrus'
                      },
                      {
                        id: '94194',
                        name: 'Nicholas Howard'
                      },
                      {
                        id: '98456',
                        name: 'Jacob McClellan'
                      },
                      {
                        id: '121198',
                        name: 'Iran Hernandez'
                      },
                      {
                        id: '103254',
                        name: 'Mckenzie Watts'
                      },
                      {
                        id: '65368',
                        name: 'Dave Yates'
                      },
                      {
                        id: '50194',
                        name: 'Richard Howell'
                      },
                      {
                        id: '2587',
                        name: 'Howard Nell'
                      },
                      {
                        id: '30831',
                        name: 'Troy Van Belle'
                      },
                      {
                        id: '124254',
                        name: 'Serge Didenko'
                      },
                      {
                        id: '93549',
                        name: 'John Stanasek'
                      },
                      {
                        id: '71800',
                        name: 'Suki Singh'
                      },
                      {
                        id: '201162',
                        name: 'Donald Gomez'
                      },
                      {
                        id: '98456',
                        name: 'Jacob McClellan'
                      },
                      {
                        id: '64062',
                        name: 'Lynsey Wilson'
                      },
                      {
                        id: '119170',
                        name: 'Jeff Hershberger'
                      },
                      {
                        id: '120698',
                        name: 'Giancarlo Desario'
                      }
                    ],
                    market: 'B',
                    _parent: 'cb9f6d33d058288f44ad03bd65754a03'
                  }
                ]
              },
              {
                _id: 'cb9f6d33d058288f44ad03bd657db74e',
                _rev: '3-77a7f533e92dc3cbcb89cf4b96ee94e0',
                name: 'Western Mass Division',
                type: 'Region',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad9547559',
                officeID: 0,
                districtManager: [
                  {
                    id: '50194',
                    name: 'Richard Howell'
                  },
                  {
                    id: '94194',
                    name: 'Nicholas Howard'
                  }
                ],
                _children: [
                  {
                    _id: '288f4954c602c2048c919b84a2e6104c',
                    _rev: '50-b56ef93be15cb3b4596f8b44f7a3a0a6',
                    name: 'MA-4 Pioneer Valley Solar',
                    type: 'office',
                    org: 'sales',
                    parent: 'cb9f6d33d058288f44ad03bd657db74e',
                    districtManager: [
                      {
                        id: '65368',
                        name: 'Dave Yates',
                        bonusAllocation: '40'
                      },
                      {
                        id: '76974',
                        name: 'Douglas Yates'
                      },
                      {
                        id: '61849',
                        name: 'Adam Mcclellan'
                      },
                      {
                        id: '29133',
                        name: 'Jeremy Long'
                      },
                      {
                        id: '68647',
                        name: 'Darcey Barrus'
                      },
                      {
                        id: '50194',
                        name: 'Richard Howell'
                      },
                      {
                        id: '2587',
                        name: 'Howard Nell'
                      },
                      {
                        id: '30831',
                        name: 'Troy Van Belle'
                      },
                      {
                        id: '94185',
                        name: 'Carl Crosland'
                      },
                      {
                        id: '94194',
                        name: 'Nicholas Howard'
                      },
                      {
                        id: '117351',
                        name: 'John DeCaro'
                      },
                      {
                        id: '64062',
                        name: 'Lynsey Wilson'
                      },
                      {
                        id: '119170',
                        name: 'Jeff Hershberger'
                      },
                      {
                        id: '96869',
                        name: 'Tristen Smith'
                      }
                    ],
                    officeID: 4518,
                    supportEmail: 'pioneervalleysupport@vivintsolar.com',
                    market: 'B',
                    _parent: 'cb9f6d33d058288f44ad03bd657db74e'
                  },
                  {
                    _id: '4364b6070c11a042d06e6c8c2d597607',
                    _rev: '47-96d800fcd5da94ba7bf5f64132727462',
                    name: 'MA-2 Boston West Solar',
                    officeID: 4456,
                    supportEmail: 'bostonwestsupport@vivintsolar.com',
                    org: 'sales',
                    parent: 'cb9f6d33d058288f44ad03bd657db74e',
                    type: 'office',
                    districtManager: [
                      {
                        id: '50194',
                        name: 'Richard Howell',
                        bonusAllocation: '30'
                      },
                      {
                        id: '61849',
                        name: 'Adam Mcclellan'
                      },
                      {
                        id: '29133',
                        name: 'Jeremy Long'
                      },
                      {
                        id: '68647',
                        name: 'Darcey Barrus'
                      },
                      {
                        id: '92905',
                        name: 'Brian Wagner'
                      },
                      {
                        id: '94064',
                        name: 'Austin Kelley'
                      },
                      {
                        id: '95372',
                        name: 'Gary Harrison'
                      },
                      {
                        id: '94203',
                        name: 'Bryce Nelson'
                      },
                      {
                        id: '94349',
                        name: 'James Richins'
                      },
                      {
                        id: '65368',
                        name: 'Dave Yates'
                      },
                      {
                        id: '30831',
                        name: 'Troy Van Belle'
                      },
                      {
                        id: '2587',
                        name: 'Howard Nell'
                      },
                      {
                        id: '103284',
                        name: 'Daniel Noel'
                      },
                      {
                        id: '105005',
                        name: 'Gregory Penn'
                      },
                      {
                        id: '94194',
                        name: 'Nicholas Howard'
                      },
                      {
                        id: '64062',
                        name: 'Lynsey Wilson'
                      },
                      {
                        id: '119170',
                        name: 'Jeff Hershberger'
                      }
                    ],
                    market: 'B',
                    _parent: 'cb9f6d33d058288f44ad03bd657db74e'
                  }
                ],
                _parent: '750521139b7c4c3be0b855aad9547559'
              },
              {
                _id: 'cb9f6d33d058288f44ad03bd658e813b',
                _rev: '4-1197818168577576c46416ae9b23edce',
                name: 'South Mass Division',
                type: 'Region',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad9547559',
                officeID: 0,
                districtManager: [
                  {
                    id: '2587',
                    name: 'Howard Nell'
                  },
                  {
                    id: '94194',
                    name: 'Nicholas Howard'
                  }
                ],
                _children: [
                  {
                    _id: '3ae35d6414164b5b50a6ac649030cdf2',
                    _rev: '13-c65277e34409ed3abe0d39042e835f6a',
                    name: 'MA-06 Cape Cod Solar',
                    type: 'office',
                    org: 'sales',
                    parent: 'cb9f6d33d058288f44ad03bd658e813b',
                    officeID: 6322,
                    market: 'B',
                    districtManager: [
                      {
                        id: '2587',
                        name: 'Howard Nell'
                      },
                      {
                        id: '29133',
                        name: 'Jeremy Long'
                      },
                      {
                        id: '61849',
                        name: 'Adam Mcclellan'
                      },
                      {
                        id: '94185',
                        name: 'Carl Crosland'
                      },
                      {
                        id: '94506',
                        name: 'B. Dexter Hofhines'
                      },
                      {
                        id: '200187',
                        name: 'David Precourt'
                      },
                      {
                        id: '65368',
                        name: 'Dave Yates'
                      },
                      {
                        id: '50194',
                        name: 'Richard Howell'
                      },
                      {
                        id: '2587',
                        name: 'Howard Nell'
                      },
                      {
                        id: '30831',
                        name: 'Troy Van Belle'
                      },
                      {
                        id: '64062',
                        name: 'Lynsey Wilson'
                      },
                      {
                        id: '119170',
                        name: 'Jeff Hershberger'
                      }
                    ],
                    _parent: 'cb9f6d33d058288f44ad03bd658e813b'
                  },
                  {
                    _id: '4364b6070c11a042d06e6c8c2d599bdb',
                    _rev: '38-da1962c05b73d4a2f7bfb408400bc41a',
                    name: 'MA-3 Boston South Solar',
                    officeID: 4457,
                    supportEmail: 'bostonsouthsupport@vivintsolar.com',
                    org: 'sales',
                    parent: 'cb9f6d33d058288f44ad03bd658e813b',
                    type: 'office',
                    districtManager: [
                      {
                        id: '68647',
                        name: 'Darcey Barrus',
                        bonusAllocation: '30'
                      },
                      {
                        id: '2587',
                        name: 'Howard Nell',
                        bonusAllocation: '70'
                      },
                      {
                        id: '61849',
                        name: 'Adam Mcclellan'
                      },
                      {
                        id: '29133',
                        name: 'Jeremy Long'
                      },
                      {
                        id: '94179',
                        name: 'Eric Israelsen'
                      },
                      {
                        id: '95107',
                        name: 'James Nell'
                      },
                      {
                        id: '65368',
                        name: 'Dave Yates'
                      },
                      {
                        id: '30831',
                        name: 'Troy Van Belle'
                      },
                      {
                        id: '50194',
                        name: 'Richard Howell'
                      },
                      {
                        id: '201266',
                        name: 'Juary Goncalves'
                      },
                      {
                        id: '105005',
                        name: 'Gregory Penn'
                      },
                      {
                        id: '94194',
                        name: 'Nicholas Howard'
                      },
                      {
                        id: '64062',
                        name: 'Lynsey Wilson'
                      },
                      {
                        id: '119170',
                        name: 'Jeff Hershberger'
                      },
                      {
                        id: '94185',
                        name: 'Carl Crosland'
                      }
                    ],
                    market: 'B',
                    _parent: 'cb9f6d33d058288f44ad03bd658e813b'
                  }
                ],
                _parent: '750521139b7c4c3be0b855aad9547559'
              },
              {
                _id: 'cb9f6d33d058288f44ad03bd65a72efa',
                _rev: '4-1ea706abf4d6e643d6b9e3bc8f9c8c08',
                name: 'Connecticut Division',
                type: 'Region',
                org: 'sales',
                parent: '750521139b7c4c3be0b855aad9547559',
                officeID: 0,
                districtManager: [
                  {
                    id: '30831',
                    name: 'Troy Van Belle'
                  },
                  {
                    id: '71800',
                    name: 'Suki Singh'
                  },
                  {
                    id: '202113',
                    name: 'Clint Cushing'
                  }
                ],
                _children: [
                  {
                    _id: 'bf9ce062dd1629ac62121be807e65ca1',
                    _rev: '35-d2a9268ec0a2803344995bf9c677da08',
                    name: 'CT-03 Hartford Solar',
                    type: 'office',
                    org: 'sales',
                    parent: 'cb9f6d33d058288f44ad03bd65a72efa',
                    officeID: 6387,
                    market: 'B',
                    districtManager: [
                      {
                        id: '61849',
                        name: 'Adam Mcclellan'
                      },
                      {
                        id: '30831',
                        name: 'Troy Van Belle'
                      },
                      {
                        id: '119175',
                        name: 'Alex Pederson'
                      },
                      {
                        id: '119170',
                        name: 'Jeffrey Hershberger'
                      },
                      {
                        id: '200816',
                        name: 'David Jones'
                      },
                      {
                        id: '65368',
                        name: 'Dave Yates'
                      },
                      {
                        id: '50194',
                        name: 'Richard Howell'
                      },
                      {
                        id: '2587',
                        name: 'Howard Nell'
                      },
                      {
                        id: '94320',
                        name: 'Dylan McMurtry'
                      },
                      {
                        id: '103672',
                        name: 'Joshua Jones'
                      },
                      {
                        id: '202113',
                        name: 'Clint Cushing'
                      },
                      {
                        id: '118911',
                        name: 'Paul Amenta'
                      },
                      {
                        id: '64062',
                        name: 'Lynsey Wilson'
                      }
                    ],
                    _parent: 'cb9f6d33d058288f44ad03bd65a72efa'
                  },
                  {
                    _id: 'dfaf57bfd11d09ae9e0677647ed15f36',
                    _rev: '46-79e382acfcfdcca7334d1e9274bf8e8d',
                    name: 'CT-01 New Haven Solar',
                    type: 'office',
                    org: 'sales',
                    parent: 'cb9f6d33d058288f44ad03bd65a72efa',
                    officeID: 4893,
                    supportEmail: 'Newhavensupport@vivintsolar.com',
                    market: 'B',
                    districtManager: [
                      {
                        id: '29133',
                        name: 'Jeremy Long'
                      },
                      {
                        id: '67723',
                        name: 'Nicholas Gallagher'
                      },
                      {
                        id: '61849',
                        name: 'Adam Mcclellan'
                      },
                      {
                        id: '30831',
                        name: 'Troy Van Belle'
                      },
                      {
                        id: '103672',
                        name: 'Joshua Jones'
                      },
                      {
                        id: '65368',
                        name: 'Dave Yates'
                      },
                      {
                        id: '50194',
                        name: 'Richard Howell'
                      },
                      {
                        id: '2587',
                        name: 'Howard Nell'
                      },
                      {
                        id: '101653',
                        name: 'Lance Rich'
                      },
                      {
                        id: '119170',
                        name: 'Jeff Hershberger'
                      },
                      {
                        id: '94320',
                        name: 'Dylan McMurtry'
                      },
                      {
                        id: '118911',
                        name: 'Paul Amenta'
                      },
                      {
                        id: '202113',
                        name: 'Clint Cushing'
                      },
                      {
                        id: '64062',
                        name: 'Lynsey Wilson'
                      }
                    ],
                    _parent: 'cb9f6d33d058288f44ad03bd65a72efa'
                  },
                  {
                    _id: 'dfaf57bfd11d09ae9e0677647ed174f7',
                    _rev: '24-c30e68f6ea338d04021282666d721df4',
                    name: 'CT-02 Stamford Solar',
                    type: 'office',
                    org: 'sales',
                    parent: 'cb9f6d33d058288f44ad03bd65a72efa',
                    officeID: 4548,
                    supportEmail: 'Stamfordsupport@vivintsolar.com',
                    market: 'B',
                    districtManager: [
                      {
                        id: '29133',
                        name: 'Jeremy Long'
                      },
                      {
                        id: '94320',
                        name: 'Dylan McMurtry'
                      },
                      {
                        id: '101653',
                        name: 'Lance Rich'
                      },
                      {
                        id: '61849',
                        name: 'Adam Mcclellan'
                      },
                      {
                        id: '30831',
                        name: 'Troy Van Belle'
                      },
                      {
                        id: '110828',
                        name: 'Glen Myers'
                      },
                      {
                        id: '50194',
                        name: 'Richard Howell'
                      },
                      {
                        id: '2587',
                        name: 'Howard Nell'
                      },
                      {
                        id: '65368',
                        name: 'Dave Yates'
                      },
                      {
                        id: '103672',
                        name: 'Joshua Jones'
                      },
                      {
                        id: '202113',
                        name: 'Clint Cushing'
                      },
                      {
                        id: '64062',
                        name: 'Lynsey Wilson'
                      },
                      {
                        id: '119170',
                        name: 'Jeff Hershberger'
                      }
                    ],
                    _parent: 'cb9f6d33d058288f44ad03bd65a72efa'
                  },
                  {
                    _id: 'f02fbbb4dd62dbde3068b399459d651a',
                    _rev: '14-bdf77fb005007e43b5d8d86d3cae7372',
                    name: 'RI-01 Providence Solar',
                    type: 'office',
                    org: 'sales',
                    parent: 'cb9f6d33d058288f44ad03bd65a72efa',
                    officeID: 8434,
                    supportEmail: '',
                    market: 'B',
                    districtManager: [
                      {
                        id: '2587',
                        name: 'Howard Nell'
                      },
                      {
                        id: '64062',
                        name: 'Lynsey Wilson'
                      },
                      {
                        id: '119170',
                        name: 'Jeff Hershberger'
                      }
                    ],
                    _parent: 'cb9f6d33d058288f44ad03bd65a72efa'
                  }
                ],
                _parent: '750521139b7c4c3be0b855aad9547559'
              }
            ]
          }
        ],
        _parent: '8e4003dbf818f90637881e2d8e0efc66'
      }
    ]
  },
  oversights: [
    {
      name: 'Western',
      id: 'e240c438f96f8419634673c7f991eb31',
      type: 'region',
      officeId: null
    },
    {
      name: 'AZ-01 West Solar',
      id: '288f4954c602c2048c919b84a2d1da9a',
      type: 'office',
      officeId: 4530
    },
    {
      name: 'AZ-02 East Solar',
      id: '288f4954c602c2048c919b84a2d1e08b',
      type: 'office',
      officeId: 4531
    },
    {
      name: 'UT-06 Dixie Solar',
      id: 'af95fc6e4f479183d866c04a40dd7695',
      type: 'office',
      officeId: 8433
    },
    {
      name: 'SC-01 Greenvile Solar',
      id: '3b5ba369af849e24b82d0abb8b2e5494',
      type: 'office',
      officeId: 6340
    },
    {
      name: 'SC-02 Columbia Solar',
      id: '3b5ba369af849e24b82d0abb8b3103c5',
      type: 'office',
      officeId: 6341
    },
    {
      name: 'NY-2 Long Island East Solar',
      id: '288f4954c602c2048c919b84a2d22ee0',
      type: 'office',
      officeId: 4443
    },
    {
      name: 'NY-1 Long Island West Solar',
      id: 'e240c438f96f8419634673c7f992162f',
      type: 'office',
      officeId: 3378
    },
    {
      name: 'NY-03 Nassau Solar',
      id: 'f02fbbb4dd62dbde3068b399459d39b3',
      type: 'office',
      officeId: 6026
    },
    {
      name: 'NY-06 Rockland Solar',
      id: '73443c0bbff612b808fe1f7236f97e9c',
      type: 'office',
      officeId: 6388
    },
    {
      name: 'NY-07 Poughkeepsie Solar',
      id: '73443c0bbff612b808fe1f7236fd6686',
      type: 'office',
      officeId: 6389
    },
    {
      name: 'NY-04 Albany Solar',
      id: 'e91a484d53e457c200fb599f3900d10e',
      type: 'office',
      officeId: 4529
    },
    {
      name: 'NY-05 NYC North Solar',
      id: 'f02fbbb4dd62dbde3068b399459d307d',
      type: 'office',
      officeId: 6027
    },
    {
      name: 'NJ-4 Jersey Shore Solar',
      id: 'cec29b1c39ba5bdbea527ad91a84aaef',
      type: 'office',
      officeId: 4549
    },
    {
      name: 'NJ-03 South Jersey Solar',
      id: 'e91a484d53e457c200fb599f390031ab',
      type: 'office',
      officeId: 4438
    },
    {
      name: 'NJ-06 Atlantic City Solar',
      id: 'f02fbbb4dd62dbde3068b399459cfbf0',
      type: 'office',
      officeId: 6021
    },
    {
      name: 'NJ-1 North Jersey Solar',
      id: '288f4954c602c2048c919b84a2d43cda',
      type: 'office',
      officeId: 2266
    },
    {
      name: 'NJ-2 NYC South Solar',
      id: '4364b6070c11a042d06e6c8c2d58d207',
      type: 'office',
      officeId: 4412
    },
    {
      name: 'NJ-05 Princeton Solar',
      id: 'dfaf57bfd11d09ae9e0677647ed15b1f',
      type: 'office',
      officeId: 6020
    },
    {
      name: 'PA-01 Philly South Solar',
      id: '3b5ba369af849e24b82d0abb8b3a8a6b',
      type: 'office',
      officeId: 6028
    },
    {
      name: 'PA-02 Philly North Solar',
      id: '3b5ba369af849e24b82d0abb8b3d18df',
      type: 'office',
      officeId: 6324
    },
    {
      name: 'MD-2 Baltimore Solar',
      id: '4364b6070c11a042d06e6c8c2d58fa6a',
      type: 'office',
      officeId: 4435
    },
    {
      name: 'MD-05 Eastern Shore Solar',
      id: '9ead698e7eae5851e58c688b6a11a25b',
      type: 'office',
      officeId: 6391
    },
    {
      name: 'MD-1 DC North Solar',
      id: 'e240c438f96f8419634673c7f991febf',
      type: 'office',
      officeId: 3264
    },
    {
      name: 'MD-04 DC South Solar',
      id: 'c0b51ea2a1d210578ae1c442deffb209',
      type: 'office',
      officeId: 4924
    },
    {
      name: 'MD-03 West Solar',
      id: 'e91a484d53e457c200fb599f393fed9e',
      type: 'office',
      officeId: 4508
    },
    {
      name: 'MA-05 Boston Central Solar',
      id: 'dfaf57bfd11d09ae9e0677647ed1660c',
      type: 'office',
      officeId: 6018
    },
    {
      name: 'MA-1 Boston North Solar',
      id: 'e240c438f96f8419634673c7f9922057',
      type: 'office',
      officeId: 2659
    },
    {
      name: 'MA-4 Pioneer Valley Solar',
      id: '288f4954c602c2048c919b84a2e6104c',
      type: 'office',
      officeId: 4518
    },
    {
      name: 'MA-2 Boston West Solar',
      id: '4364b6070c11a042d06e6c8c2d597607',
      type: 'office',
      officeId: 4456
    },
    {
      name: 'MA-06 Cape Cod Solar',
      id: '3ae35d6414164b5b50a6ac649030cdf2',
      type: 'office',
      officeId: 6322
    },
    {
      name: 'MA-3 Boston South Solar',
      id: '4364b6070c11a042d06e6c8c2d599bdb',
      type: 'office',
      officeId: 4457
    },
    {
      name: 'CT-01 New Haven Solar',
      id: 'dfaf57bfd11d09ae9e0677647ed15f36',
      type: 'office',
      officeId: 4893
    },
    {
      name: 'CT-02 Stamford Solar',
      id: 'dfaf57bfd11d09ae9e0677647ed174f7',
      type: 'office',
      officeId: 4548
    }
  ]
};

const traverse = curry((dict, node) => {
  const { _children, ...rest } = node;

  const flatNode = {
    ...rest,
    _children: map(prop('_id'), _children)
  };

  dict.set(flatNode._id, flatNode);

  if (!isNil(_children)) {
    forEach(traverse(dict), _children);
  }

  return dict;
});

const dict = traverse(new Map(), tree.root);
const keys = Array.from(dict.keys());

console.log('dictionary', keys);
console.log('# nodes', keys.length);

const homeOfficeId = 'e240c438f96f8419634673c7f9924a18';
const homeOfficeNode = dict.get(homeOfficeId);

console.log('home office node', homeOfficeNode);

const homeOfficeParentNode = dict.get(homeOfficeNode._parent);

console.log('Home Office Parent Node', homeOfficeParentNode);
