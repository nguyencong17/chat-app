/**
 * generate a random meaningful sentence with 15 -> 20 words
 *
 * @returns {string}
 */
const generateRandomSentence = (words=10) => {
  const subjects = ['The cat', 'The dog', 'The bird', 'The fish', 'The elephant'];
  const verbs = ['eats', 'sleeps', 'runs', 'jumps', 'flies'];
  const objects = ['the food', 'the ball', 'the book', 'the tree', 'the water'];
  const adjectives = ['big', 'small', 'beautiful', 'ugly', 'fast'];
  const adverbs = ['quickly', 'slowly', 'happily', 'sadly', 'carefully'];
  const prepositions = ['on', 'in', 'under', 'over', 'beside'];

  const sentenceLength = Math.floor(Math.random() * 6) + words;

  let sentence = '';
  for (let i = 0; i < sentenceLength; i++) {
      if (i > 0) {
          sentence += ' ';
      }
      const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
      const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
      const randomObject = objects[Math.floor(Math.random() * objects.length)];
      const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
      const randomAdverb = adverbs[Math.floor(Math.random() * adverbs.length)];
      const randomPreposition = prepositions[Math.floor(Math.random() * prepositions.length)];

      const randomNumber = Math.random();
      if (randomNumber < 0.2) { // Add adverb
          sentence += randomAdverb;
      } else if (randomNumber < 0.4) { // Add adjective
          sentence += randomAdjective;
      } else if (randomNumber < 0.6) { // Add preposition
          sentence += randomPreposition;
      } else { // Add subject, verb, or object
          const randomChoice = Math.random();
          if (randomChoice < 0.33) {
              sentence += randomSubject;
          } else if (randomChoice < 0.66) {
              sentence += randomVerb;
          } else {
              sentence += randomObject;
          }
      }
  }

  return sentence + '.';
}

export default generateRandomSentence;