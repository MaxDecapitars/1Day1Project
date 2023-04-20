const d = document,
  $form = d.querySelector('.form'),
  $password = d.querySelector('.password'),
  $clipBoard = d.querySelector('.clipboard'),
  $clipBoardCheck = d.querySelector('.clipboard-check'),
  $error = d.querySelector('.error');

const activeError = (error) => {
  $error.textContent = error;

  $error.classList.add('error-active');
  setTimeout(() => {
    $error.classList.remove('error-active');
  }, 6000);
};

const alternateClipBoardIcon = (check) => {
  if (check) {
    $clipBoard.classList.add('d-none');
    $clipBoardCheck.classList.remove('d-none');
  } else {
    $clipBoard.classList.remove('d-none');
    $clipBoardCheck.classList.add('d-none');
  }
};

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText($password.textContent);
    alternateClipBoardIcon(true);
  } catch {
    activeError('There was an error while trying to copy to clipboard.');
    alternateClipBoardIcon();
  }
};

const generatePassword = async (e) => {
  e.preventDefault();

  const checkboxes = ['uppercase', 'lowercase', 'numbers', 'special_characters_check'],
    atLeastOneSelected = checkboxes.some((checkbox) => $form[checkbox].checked);

  if (!atLeastOneSelected) {
    return activeError('You must select at least one character type.');
  }
  const passLength = Number.parseInt($form.pass_length.value),
    totalChecks = [],
    availableChars = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      special_characters_check: $form.special_characters.value,
    };

  checkboxes.forEach((checkbox) => {
    const $checkbox = $form[checkbox];
    if ($checkbox.checked) totalChecks.push(checkbox);
  });

  let newPassword = '';

  for (let i = 0; i < passLength; i++) {
    await new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * 40)));

    const randomCheck = totalChecks[Math.floor(Math.random() * totalChecks.length)];

    const randomChar = availableChars[randomCheck].charAt(
      Math.floor(Math.random() * availableChars[randomCheck].length)
    );

    newPassword = newPassword
      .split('')
      .concat(randomChar)
      .sort(() => Math.random() - 0.5)
      .join('');
    $password.textContent = newPassword;
  }

  alternateClipBoardIcon();
};

d.addEventListener('DOMContentLoaded', generatePassword);

d.addEventListener('click', (e) => {
  if (e.target.matches('.btn-copy')) copyToClipboard();
});

$form.addEventListener('submit', generatePassword);

$form.special_characters_check.addEventListener('change', () => {
  $form.special_characters.disabled = !$form.special_characters_check.checked;
});
