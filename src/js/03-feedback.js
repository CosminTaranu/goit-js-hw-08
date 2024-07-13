import throttle from 'lodash.throttle';


const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageTextarea = form.elements.message;

const STORAGE_KEY = 'feedback-form-state';

const saveFormState = throttle(() => {
  const formState = {
    email: emailInput.value,
    message: messageTextarea.value
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formState));
}, 1000);


const loadFormState = () => {
  const savedState = localStorage.getItem(STORAGE_KEY);
  if (savedState) {
    const { email, message } = JSON.parse(savedState);
    emailInput.value = email;
    messageTextarea.value = message;
  }
};

form.addEventListener('input', saveFormState);

document.addEventListener('DOMContentLoaded', loadFormState);

form.addEventListener('submit', (event) => {
  event.preventDefault(); 
  const formState = {
    email: emailInput.value,
    message: messageTextarea.value
  };
  console.log('Formul a fost trimis:', formState);
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
});