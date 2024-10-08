import random

def guess_the_number():
    print("Welcome to the Number Guessing Game!")
    print("I have selected a number between 1 and 100.")
    
    number_to_guess = random.randint(1, 100)
    number_of_attempts = 0
    
    while True:
        try:
            player_guess = int(input("Enter your guess: "))
            number_of_attempts += 1

            if player_guess < number_to_guess:
                print("Too low! Try again.")
            elif player_guess > number_to_guess:
                print("Too high! Try again.")
            else:
                print(f"Congratulations! You've guessed the correct number in {number_of_attempts} attempts.")
                break
        except ValueError:
            print("Invalid input. Please enter a number.")
            
if __name__ == "__main__":
    guess_the_number(py)
