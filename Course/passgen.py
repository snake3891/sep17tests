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
import re
pattern = r"[@?*/,]"
password = "".join(temp)
def invalid_char(password, pattern):

    if (re.search(pattern,str(password)) is False):  
        return False
    else: 
        return True
    
    return bool(re.search(pattern,str(password)))
    
while invalid_char(password, pattern):
    if invalid_char(password, pattern):
        temp = random.sample(all, length)
        password = "".join(temp)
        print("Your new password is: " + password)
        break
    else:
        password = "".join(temp)
        print("Your new password is: " + password)
        break
        
        
# Simple Password Generator
