user_input = input("Select your weapon (rock, paper, scissors): ").strip().lower()
print ("You selected:", user_input)
import random
random_number = random.randint(0, 2)
array = ["rock", "paper", "scissors"]
computer_choice = array[random_number]
print ("The computer selected:", computer_choice)
if user_input == computer_choice:
    print ("It's a tie!")
elif user_input == "rock":
    if computer_choice == "scissors":
        print ("You win!")
    else:
        print ("You lose!")
elif user_input == "paper":
    if computer_choice == "rock":
        print ("You win!")
    else:
        print ("You lose!")
elif user_input == "scissors":
    if computer_choice == "paper":
        print ("You win!")
    else:
        print ("You lose!")