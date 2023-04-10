const d = document,
  $main = d.querySelector('main'),
  $form = d.querySelector('.quiz'),
  $resultContainer = d.querySelector('.result-container'),
  $formLegend = d.querySelector('.quiz legend'),
  $formOptionOne = d.getElementById('label-1'),
  $formOptionTwo = d.getElementById('label-2'),
  $formOptionThree = d.getElementById('label-3'),
  $startBtn = d.querySelector('.start'),
  $resultTemplate = d.getElementById('result-template').content,
  answers = [];

let questions,
  questionIndex = 0,
  questionCount = 0;

const loadQuestions = async () => {
  try {
    const res = await fetch('questions.json');
    questions = await res.json();
  } catch (error) {
    console.log(error);
    questions = false;
  }
};

const loadQuestionsError = () => {
  const $err = d.createElement('p');
  $err.textContent = 'Something went wrong';
  $main.appendChild($err);

  setTimeout(() => {
    $err.remove();
    $startBtn.classList.remove('d-none');
  }, 6000);
};

const fillForm = (qIndex) => {
  console.log(questions);

  $formLegend.textContent = questions[qIndex].question;
  $formOptionOne.textContent = questions[qIndex].options[0];
  $formOptionTwo.textContent = questions[qIndex].options[1];
  $formOptionThree.textContent = questions[qIndex].options[2];

  questionIndex++;
};

const giveResult = () => {
  const $againBtn = d.createElement('button'),
    $fragment = d.createDocumentFragment();

  $againBtn.classList.add('again');
  $againBtn.type = 'button';
  $againBtn.textContent = 'Try Again';

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i],
      $clone = $resultTemplate.cloneNode(true);

    $clone.querySelector('h4').textContent = question.question;
    $clone.querySelector('.response-1').textContent = question.options[0];
    $clone.querySelector('.response-2').textContent = question.options[1];
    $clone.querySelector('.response-3').textContent = question.options[2];

    $clone.querySelector(`.response-${answers[i]}`).classList.add('selected');
    $clone.querySelector(`.response-${question.answer}`).classList.add('correct');

    if (answers[i] === question.answer) {
      questionCount++;
    }

    $fragment.appendChild($clone);
  }

  $resultContainer.querySelector('h3').textContent = `${questionCount} / ${questions.length}`;
  $resultContainer.appendChild($fragment);
  $resultContainer.appendChild($againBtn);

  $resultContainer.classList.remove('d-none');
};

d.addEventListener('click', async (e) => {
  if (e.target.matches('.start')) {
    $startBtn.classList.add('d-none');

    await loadQuestions();

    if (!questions) {
      return loadQuestionsError();
    }

    fillForm(questionIndex);

    $form.classList.remove('d-none');
  }

  if (e.target.matches('.again')) {
    location.reload();
  }
});

$form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!$form.option.value) return;

  console.log($form.option.value);
  answers.push(Number.parseInt($form.option.value));

  if (questionIndex >= questions.length) {
    $form.classList.add('d-none');
    giveResult();
  } else {
    fillForm(questionIndex);
    $form.reset();
  }

  console.log(answers);
});
