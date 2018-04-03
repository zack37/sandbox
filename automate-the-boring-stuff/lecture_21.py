### String formatting

print('hello' + 'world')

name = 'Alice'
place = 'Main Street'
time = '6 pm'
food = 'turnips'

print('Hello ' + name + ', you are invited to a party at ' + place + ' at ' + time + '. Please bring ' + food + '.')

print('Hello {0}, you are invited to a party at {1} at {2}. Please bring {3}.'.format(name, place, time, food))
