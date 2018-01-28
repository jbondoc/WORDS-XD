import random
import string
import requests

NUM_LETTERS = 6
letters = []

def get_letters():
	letters = []
	for x in range(0, NUM_LETTERS):
		letters += random.choice(string.letters).lower()
	return letters


def is_valid(letter):
	letter = letter.lower()
	if letter in letters:
		return true
	return false

def check_word(word):
	response = requests.get("https://api.datamuse.com/words?sp=" + word)
	if not response.json():
		return false
	if (len(response.json()[0]['word']) > 0):
		return true
	return false


def main():
    letters = get_letters()
    print letters


if __name__ == "__main__":
    main()