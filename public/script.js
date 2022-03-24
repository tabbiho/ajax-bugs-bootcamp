const createABugBtn = document.createElement('button');
createABugBtn.innerText = 'Create a Bug';
document.body.appendChild(createABugBtn);

const formDiv = document.createElement('div');

const formHeader = document.createElement('h1');
formHeader.innerText = 'Create Bug Form';
const problemInput = document.createElement('input');
const errorTextInput = document.createElement('input');
const commitInput = document.createElement('input');
const featuresDiv = document.createElement('div');

const submitBtn = document.createElement('button');

formDiv.appendChild(formHeader);
formDiv.appendChild(problemInput);
formDiv.appendChild(errorTextInput);
formDiv.appendChild(commitInput);
formDiv.appendChild(featuresDiv);
formDiv.appendChild(submitBtn);

problemInput.placeholder = 'Input problem here';
errorTextInput.placeholder = 'Input error text here, if any';
commitInput.placeholder = 'Input associated Git commit here, if any';
submitBtn.innerText = 'Submit Bug';

const errorDiv = document.createElement('div');
errorDiv.className = 'errorDiv';

const resultDiv = document.createElement('div');

formDiv.style.display = 'none';

document.body.appendChild(formDiv);
document.body.appendChild(errorDiv);
document.body.appendChild(resultDiv);

const bugListDiv = document.createElement('div');
const bugListHeader = document.createElement('h1');
bugListHeader.innerText = 'Bug List';
const bugListContentDiv = document.createElement('div');

bugListDiv.appendChild(bugListHeader);
bugListDiv.appendChild(bugListContentDiv);
document.body.appendChild(bugListDiv);

const createAFeatureBtn = document.createElement('button');
createAFeatureBtn.innerText = 'Create a Feature';
document.body.appendChild(createAFeatureBtn);

const createFeaturesDiv = document.createElement('div');
document.body.appendChild(createFeaturesDiv);

const featureResultDiv = document.createElement('div');
document.body.appendChild(featureResultDiv);

const featureErrorDiv = document.createElement('div');
featureErrorDiv.className = 'errorDiv';
document.body.appendChild(featureErrorDiv);

const featureFormDiv = document.createElement('div');
const featureFormHeader = document.createElement('h1');
featureFormHeader.innerText = 'Create Feature Form';
const featureInput = document.createElement('input');
featureInput.placeholder = 'Input feature here';
const featureSubmitBtn = document.createElement('button');
featureSubmitBtn.innerText = 'Submit Feature';

featureFormDiv.appendChild(featureFormHeader);
featureFormDiv.appendChild(featureInput);
featureFormDiv.appendChild(featureSubmitBtn);
createFeaturesDiv.appendChild(featureFormDiv);

createFeaturesDiv.style.display = 'none';

const loginDiv = document.createElement('div');

const emailInput = document.createElement('input');
emailInput.placeholder = 'Enter e-mail here';
const passwordInput = document.createElement('input');
passwordInput.placeholder = 'Enter password here';
passwordInput.type = 'password';
const loginBtn = document.createElement('button');
loginBtn.innerText = 'Login';
const loginResult = document.createElement('div');
loginResult.className = 'errorDiv';

loginDiv.appendChild(emailInput);
loginDiv.appendChild(passwordInput);
loginDiv.appendChild(loginBtn);
loginDiv.appendChild(loginResult);

document.body.appendChild(loginDiv);

// ==== HTML ELEMENTS ABOVE ====

createABugBtn.style.display = 'none';
bugListDiv.style.display = 'none';
createAFeatureBtn.style.display = 'none';

const loginCheck = async () => {
  // eslint-disable-next-line no-undef
  const result = await axios.get('/users/loginCheck');
  if (result.data) {
    createABugBtn.style.display = '';
    bugListDiv.style.display = '';
    createAFeatureBtn.style.display = '';
  }
};
loginCheck();

loginBtn.addEventListener('click', async () => {
  if (emailInput.value && passwordInput.value) {
    const data = {
      email: emailInput.value,
      password: passwordInput.value,
    };
    // eslint-disable-next-line no-undef
    const result = await axios.post('/users/login', data);
    if (result) {
      loginCheck();
      loginResult.innerText = '';
      loginDiv.style.display = 'none';
      return;
    }
  }
  loginResult.innerText = 'Please enter a valid email address and password.';
});

createAFeatureBtn.addEventListener('click', () => {
  createAFeatureBtn.style.display = 'none';
  createFeaturesDiv.style.display = '';
  featureResultDiv.innerHTML = '';
});

const createFeature = async () => {
  const feature = featureInput.value;
  if (!feature.length) {
    featureErrorDiv.innerText = 'Error! Please ensure feature is not null!';
    return;
  }
  const data = {
    feature,
  };
  // eslint-disable-next-line no-undef
  const result = await axios.post('/features/create', data);
  console.log(result);
  featureResultDiv.innerHTML = `Success! Feature '${result.data.feature}' added`;
  featureInput.value = '';
  featureErrorDiv.innerText = '';
  createFeaturesDiv.style.display = 'none';
  createAFeatureBtn.style.display = '';
};

featureSubmitBtn.addEventListener('click', createFeature);

const getBugList = async () => {
  bugListContentDiv.innerHTML = '';
  // eslint-disable-next-line no-undef
  const bugList = await axios.get('/bugs/index');
  bugList.data.forEach((x) => {
    const currentBug = document.createElement('p');
    currentBug.innerText = `Bug ${x.id}: ${x.problem}, ${x.errorText} ${x.commit} ${x.feature ? x.feature.feature : ''}`;
    bugListContentDiv.appendChild(currentBug);
  });
};

getBugList();

const create = async () => {
  const problem = problemInput.value;
  const errorText = errorTextInput.value;
  const commit = commitInput.value;
  const featureId = document.querySelector('input[name = featureId]:checked') ? document.querySelector('input[name = featureId]:checked').value : 0;
  if (!problem.length || !featureId) {
    errorDiv.innerText = 'Error! Please ensure problem/features is not null!';
    return;
  }
  const data = {
    problem,
    errorText,
    commit,
    featureId,
  };
  // eslint-disable-next-line no-undef
  const result = await axios.post('/create', data);
  resultDiv.innerHTML = `Success! Log ${result.data[0].id}: ${result.data[0].problem}, ${result.data[0].errorText} (commit: ${result.data[0].commit}; feature: ${result.data[1].feature})`;
  problemInput.value = '';
  errorTextInput.value = '';
  commitInput.value = '';
  errorDiv.innerText = '';
  featuresDiv.innerHTML = '';
  formDiv.style.display = 'none';
  createABugBtn.style.display = '';
  getBugList();
};

submitBtn.addEventListener('click', create);

const getFeatureInput = async () => {
  // eslint-disable-next-line no-undef
  const features = await (axios.get('/features/index'));
  features.data.forEach((x) => {
    const radioDiv = document.createElement('div');
    const newRadio = document.createElement('input');
    newRadio.type = 'radio';
    newRadio.name = 'featureId';
    newRadio.id = x.feature;
    newRadio.value = x.id;
    newRadio.style.display = 'inline';
    newRadio.style.width = '20px';
    const newRadioLabel = document.createElement('label');
    newRadioLabel.setAttribute('for', x.feature);
    newRadioLabel.innerText = x.feature;
    radioDiv.appendChild(newRadio);
    radioDiv.appendChild(newRadioLabel);
    featuresDiv.appendChild(radioDiv);
  });
};

createABugBtn.addEventListener('click', () => {
  createABugBtn.style.display = 'none';
  resultDiv.innerHTML = '';
  getFeatureInput();
  formDiv.style.display = '';
});
