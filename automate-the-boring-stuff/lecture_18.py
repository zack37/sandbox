def init_board():
    the_board = {}
    rows = ['top', 'mid', 'low']
    cols = ['L', 'M', 'R']

    for r in rows:
        for c in cols:
            the_board[r+'-'+c] = ' '

    return the_board

def print_board(board):
    print(board['top-L'] + '|' + board['top-M'] + '|' + board['top-R'])
    print('-----')
    print(board['mid-L'] + '|' + board['mid-M'] + '|' + board['mid-R'])
    print('-----')
    print(board['low-L'] + '|' + board['low-M'] + '|' + board['low-R'])

def main():
    the_board = init_board()

    print_board(the_board)

if __name__ == '__main__':
    main()
