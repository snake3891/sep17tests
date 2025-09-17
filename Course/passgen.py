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
pattern = r"[@?*]"
password = ""
if (re.search(pattern,str(temp)) is False):  
    password = "".join(temp)
else: 
    password = "password error pass word contains invalid symbol"
    temp = random.sample(all, length);
    password = "".join(temp)
    
print("Your new password is: " + password)
# Simple Password Generator
