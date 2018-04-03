### This is a guess the number game.
import random
import sys

def get_guess():
    guess = int(input())
    if guess < 1 or guess > 20:
        raise ValueError('outside of range (1, 20)')
    return guess


def number_game():
    print('Hello. What is your name?')
    name = input()
    secret_number = random.randint(1, 20)
    print('Well ' + name + ', I am thinking of a number between 1 and 20')

    guesses_taken = 0
    guess = ''

    while guesses_taken < 7:
        print('Take a guess')
        try:
            guess = get_guess()
        except ValueError as ve:
            print('Please try again:', ve)
            continue
        except:
            sys.exit(1)

        guesses_taken += 1

        if guess < secret_number:
            print('Your guess is too low')
        elif guess > secret_number:
            print('Your guess is too high')
        else:
            break

    if guess == secret_number:
        print('Good job {}! You guess my number in {} guesses'.format(name, guesses_taken))
        # print('Good job,', name + '! You guessed my number in', guesses_taken, 'guesses')
    else:
        print('Nope. The number I was thinking of was', secret_number)

number_game()
