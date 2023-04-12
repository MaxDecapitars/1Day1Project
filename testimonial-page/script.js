const d = document,
  $testimonialContainer = d.querySelector('.testimonial-container'),
  $template = d.querySelector('.testimonial-template').content;

let testimonials;

const loadTestimonials = async () => {
  try {
    const res = await fetch('testimonials.json');
    testimonials = await res.json();
  } catch (error) {
    testimonials = false;
    console.log(error);
  }
};

const fillTestimonials = () => {
  const $fragment = d.createDocumentFragment();

  testimonials.forEach((testimony) => {
    const $clone = $template.cloneNode('true');

    $clone.querySelector('.img').src = `assets/${testimony.profile_img}`;
    $clone.querySelector('.img').alt = `Photo of ${testimony.name}`;
    $clone.querySelector('.name').textContent = testimony.name;
    $clone.querySelector('.testimony').textContent = testimony.testimony;

    $fragment.appendChild($clone);
  });

  $testimonialContainer.appendChild($fragment);
};

const moveTestimonials = () => {
  let index = 0;

  setInterval(() => {
    const width = $testimonialContainer.firstElementChild.offsetWidth;
    index = (index + 1) % testimonials.length;

    $testimonialContainer.style.transform = `translateX(-${index * width}px)`;
  }, 5000);
};

d.addEventListener('DOMContentLoaded', async (_) => {
  await loadTestimonials();

  if (!testimonials) {
    const $err = d.createElement('h6');

    $err.classList.add('error');
    $err.textContent = 'Something went wrong';

    return $testimonialContainer.appendChild($err);
  }

  fillTestimonials();
  moveTestimonials();
});
