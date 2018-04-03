import re

phone_num_regex = re.compile(r'(\d\d\d)-((\d\d\d)-(\d\d\d\d))')
mo = phone_num_regex.search('My number is 415-555-4242')

print(mo.group())
print(mo.group(1))
print(mo.group(2))
print(mo.group(3))
print(mo.group(4))

bat_regex = re.compile(r'Bat(man|mobile|copter|bat)')

mo = bat_regex.search('Batmobile lost a wheel')

print(mo.group())
