"""
***************
*             *
*             *
*             *
***************
"""

def box_print(symbol, width, height):
    if len(symbol) != 1:
        raise Exception('"symbol" must be of length 1')
    if width < 2 or height < 2:
        raise Exception('"width" and "height" must be greater than 1')

    print(symbol * width)

    for _ in range(height - 2):
        print(symbol + ' ' * (width - 2) + symbol)

    print(symbol * width)

box_print('*', 10, 10)
