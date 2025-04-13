import fs from "fs";

const data = fs.readFileSync("./data/words.txt", "utf-8");
const wordsArray = data.split("\n").map((word) => word.trim());

function hasOnlyUniqueLetters(word) {
  return new Set(word).size === word.length;
}

function getRandomWord(length, allowDuplicates = true) {
  const filtered = wordsArray.filter((word) => {
    if (word.length !== length) return false;
    if (!allowDuplicates && !hasOnlyUniqueLetters(word)) return false;
    return true;
  });

  const randomWord = filtered[Math.floor(Math.random() * filtered.length)];

  return randomWord;
}

export default getRandomWord;
