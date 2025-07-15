function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) {
    return;
  }

  const submitButton = document.getElementById('submit-button');
  const resultDiv = document.getElementById('form-result');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    submitButton.disabled = true;
    submitButton.innerText = 'Submitting...';
    resultDiv.innerText = '';
    const formData = new FormData(form);
    const object = {};
    formData.forEach((value, key) => { object[key] = value; });
    const json = JSON.stringify(object);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: json
      });
      const resJson = await response.json();
      if (resJson.success) {
        resultDiv.style.color = 'green';
        resultDiv.innerText = 'Success! Your message has been sent.';
        form.reset();
      } else {
        resultDiv.style.color = 'red';
        resultDiv.innerText = resJson.message || 'An error occurred. Please try again.';
      }
    } catch (error) {
      console.error('Submission error:', error);
      resultDiv.style.color = 'red';
      resultDiv.innerText = 'An error occurred. Please check your connection and try again.';
    } finally {
      submitButton.disabled = false;
      submitButton.innerText = 'Send Message';
      setTimeout(() => { resultDiv.innerText = ''; }, 5000);
    }
  });
}

initContactForm();
document.addEventListener('astro:page-load', initContactForm);