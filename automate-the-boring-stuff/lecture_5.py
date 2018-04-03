# `if` example

# name = 'Bob'
# if name == 'Alice':
#     print 'Hi Alice'
# print 'Done'

# `if else` example

# password = 'swordfish'

# if password == 'swordfish':
#   print 'Access granted.'
# else:
#   print 'Wrong password.'

# `if elif` example
# name = 'Bob'
# age = 3000
# if name == 'Alice':
#     print 'Hi Alice'
# elif age < 12:
#     print 'You are not Alice, kiddo'
# elif age > 2000:
#     print 'Unlike you, Alice is not an undead, immortal vampire'
# elif age > 100:
#     print 'You are not Alice, grannie'

### Truthey Falsey Values
print('Enter a name')
name = input()
if name:
  print('Thank you for entering a name.')
else:
  print('You did not enter a name.')
