const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
};

document.addEventListener('DOMContentLoaded', () => {
  const themeButton = document.getElementById("theme-button");
  const signNowButton = document.getElementById('sign-now-button');

  if (themeButton) {
    themeButton.addEventListener("click", toggleDarkMode);
  } else {
    console.error("Theme button not found");
  }

  if (signNowButton) {
    signNowButton.addEventListener('click', validateForm);
  }

  setupScrollAnimations();  
  window.addEventListener('scroll', handleReveal);
});

const addSignature = (person) => {
  const signatureText = `🖊️ ${person.name} from ${person.hometown} supports this.`;
  const signature = createSignatureElement(signatureText);
  appendSignatureToContainer(signature);
  toggleModal(person);
};

const createSignatureElement = (text) => {
  const signature = document.createElement('p');
  signature.textContent = text;
  return signature;
};

const appendSignatureToContainer = (signature) => {
  const signaturesContainer = document.querySelector('.signatures');
  signaturesContainer.appendChild(signature);
};

const validateForm = () => {
  let containsErrors = false;
  const petitionInputs = document.getElementById("sign-petition").elements;
  let person = {
    name: petitionInputs[0].value,
    hometown: petitionInputs[1].value,
    email: petitionInputs[2].value
  };

  Object.keys(person).forEach((key, index) => {
    if (person[key].length < 2) {
      petitionInputs[index].classList.add('error');
      containsErrors = true;
    } else {
      petitionInputs[index].classList.remove('error');
    }
  });

  if (!containsErrors) {
    addSignature(person);
    Array.from(petitionInputs).forEach(input => input.value = "");
  }
};

const handleReveal = () => {
  const revealableElements = document.querySelectorAll('.revealable');
  const windowHeight = window.innerHeight;
  revealableElements.forEach(element => {
    let top = element.getBoundingClientRect().top;
    element.classList.toggle('active', top < windowHeight - 100);
  });
};

const setupScrollAnimations = () => {
  const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('active', entry.isIntersecting);
    });
  };

  const observerOptions = {
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(handleIntersection, observerOptions);

  const revealableElements = document.querySelectorAll('.revealable');
  revealableElements.forEach(el => observer.observe(el));
};

function toggleModal(person) {
  const modal = document.getElementById('thanks-modal');
  const modalText = document.getElementById('modal-text-container').getElementsByTagName('p')[0];

  modalText.textContent = `Thank you so much ${person.name} from ${person.hometown} for your support!`;

  modal.style.display = 'flex';

  const intervalId = setInterval(scaleImage, 500);
  
  setTimeout(() => {
    modal.style.display = 'none';
    clearInterval(intervalId);
  }, 5000);
}

document.addEventListener('DOMContentLoaded', function() {
  const closeButton = document.getElementById('close-modal-button');
  const modal = document.getElementById('thanks-modal');

  const closeModal = () => {
    modal.style.display = 'none';
  };

  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }
});

let scaleFactor = 1;

const modalImage = document.querySelector('#thanks-modal img');

const scaleImage = () => {
  scaleFactor = (scaleFactor === 1) ? 0.7 : 1;
  modalImage.style.transform = `scale(${scaleFactor})`;
};
