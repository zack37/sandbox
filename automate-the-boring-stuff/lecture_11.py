# def div42by(divide_by):
#     try:
#         return 42 / divide_by
#     except ZeroDivisionError:
#         print('Error: You tried to divide by 0')

# print(div42by(2))
# print(div42by(12))
# print(div42by(0))
# print(div42by(1))

print('How many cats do you have?')
try:
    num_cats = int(input())
    if num_cats >= 4:
        print('That is a lot of cats')
    else:
        print('That is not that many cats')
except ValueError:
    print('You did not enter a number')
