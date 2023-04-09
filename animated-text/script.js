const d = document,
  $texts = d.querySelectorAll('.content'),
  ideas = [
    'Dream',
    'Believe',
    'Do it',
    'Live',
    'Love',
    'Shine',
    'Persist',
    'Smile',
    'Inspire',
    'Fight',
    'Laugh',
    'Change',
    'Grow',
    'Impact',
    'Transform',
    'Achieve',
    'Courage',
    'Hope',
    'Passion',
    'Perseverance',
    'Never stop',
    'Go ahead',
    'Determination',
    'Take a risk',
    'Optimism',
    'Strength',
    'Belief',
    'Confidence',
    'Focus',
    'Action',
    'Ambition',
    'Growth',
    'Inspiration',
    'Motivation',
    'Progress',
    'Resilience',
    'Wisdom',
    'Imagination',
    'Innovation',
  ];

let text = 3;

const changeIdeas = () => {
  const actualIdeas = [
      $texts[0].textContent,
      $texts[1].textContent,
      $texts[2].textContent,
      $texts[3].textContent,
    ],
    remainingIdeas = ideas.filter((idea) => !actualIdeas.includes(idea)),
    randomIdea = remainingIdeas[Math.floor(Math.random() * remainingIdeas.length)];

  $texts[text].textContent = randomIdea;

  if (text >= 3) {
    text = 0;
  } else {
    text++;
  }
};

setInterval(() => {
  changeIdeas();
}, 2500);
