alphabet = "abcdefghijklmnopqrstuvwxyz"
partialOne=""
partialTwo=""
newAlphabet=""
message = input("Please enter the message you want to translate: ").lower()
key = int(input("Please enter the number you want to shift by: "))

if key == 0:
    newAlphabet = alphabet
elif key > 0:
    partialOne = alphabet[:key]
    partialTwo = alphabet[key:]
    newAlphabet = partialTwo + partialOne
else:
    partialOne = alphabet[:(26 + key)]
    partialTwo = alphabet[(26 + key):]
    newAlphabet = partialTwo + partialOne


encrypted=""
for message_index in range(0,len(message)):
    if message[message_index] == " ":
        encrypted+= " "
    for alphabet_index in range(0,len(newAlphabet)):
        if message[message_index] == alphabet[alphabet_index]:
            encrypted+= newAlphabet[alphabet_index]

print(encrypted)