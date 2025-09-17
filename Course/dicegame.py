diceSize = input("Choose Dice Size (4, 6, 8, 10, 12, 20): ")
if diceSize not in ["4", "6", "8", "10", "12", "20"]:
    print("Invalid dice size. Please choose from 4, 6, 8, 10, 12, or 20.")
    exit()
import random
roll = random.randint(1, int(diceSize))
print(f"You rolled a {roll} on a d{diceSize}.")
# Simple Dice Roller