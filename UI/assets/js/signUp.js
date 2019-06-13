const url = 'localhost:4000/api/v1/user';

const signupForm = document.querySelector('form');

function signUp(e) {
  e.preventDefault();
 
  const data = {
    fname: signupForm.fname.value,
    lname: signupForm.lname.value,
    email: signupForm.email.value,
    pwd: signupForm.pwd.value,
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status !== 'success') return flashMessage(response.message, 'error');

      flashMessage('Signup successful! Logging you in ...', 'success');
    })
    .catch((error) => {
      console.error(error);
      flashMessage('Something went wrong while signing you up', 'error');
    });
  return flashMessage('good to go!');
}

signupForm.addEventListener('submit', signUp);