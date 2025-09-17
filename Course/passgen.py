input("Press enter to generate new password:")
import random
import string
length = 16
lower = string.ascii_lowercase
upper = string.ascii_uppercase
num = string.digits
symbols = string.punctuation
all = lower + upper + num + symbols
temp = random.sample(all, length)
password = "".join(temp)
print("Your new password is: " + password)
