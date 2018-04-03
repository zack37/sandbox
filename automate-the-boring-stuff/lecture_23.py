import re

message = 'Call me 415-555-1011 tomorrow, or at 415-555-9999 for my office line.'

def is_phone_number(text):
    if len(text) != 12:
        return False
    for i in text[:3]:
        if not i.isdecimal():
            return False
    if text[3] != '-':
        return False
    for i in text[4:7]:
        if not i.isdecimal():
            return False
    if text[7] != '-':
        return False
    for i in text[8:]:
        if not i.isdecimal():
            return False

    return True

def find_phone_numbers():
    results = []
    for i in range(len(message)):
        chunk = message[i:i+12]
        if(is_phone_number(chunk)):
            results.append(chunk)
    return results

print(find_phone_numbers())

phone_number_regex = re.compile(r'\d\d\d-\d\d\d-\d\d\d\d')
matches = phone_number_regex.findall(message)
print(matches)

# print(is_phone_number())
