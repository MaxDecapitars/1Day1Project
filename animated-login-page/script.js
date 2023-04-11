const d = document;

d.addEventListener('DOMContentLoaded', (_) => {
  setTimeout(() => {
    d.querySelector('.login-form').classList.remove('hidden');
  }, 500);
});

d.addEventListener('focusin', (e) => {
  if (e.target.matches('input')) {
    e.target.nextElementSibling.classList.add('label-active');
  }
});

d.addEventListener('focusout', (e) => {
  if (e.target.matches('input') && e.target.value === '') {
    e.target.nextElementSibling.classList.remove('label-active');
  }
});
