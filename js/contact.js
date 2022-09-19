const submitData = (e) => {
	e.preventDefault();
	const nameValue = document.querySelector('#input-name').value;
	const emailValue = document.querySelector('#input-email').value;
	const phoneValue = document.querySelector('#input-phone').value;
	const subjectValue = document.querySelector('#input-select').value;
	const messageValue = document.querySelector('#input-message').value;

	const error = validate([
		{
			fieldName: 'name',
			value: nameValue,
		},
		{
			fieldName: 'email',
			value: emailValue,
		},
		{
			fieldName: 'phone-number',
			value: phoneValue,
		},
		{
			fieldName: 'subject',
			value: subjectValue,
		},
		{
			fieldName: 'message',
			value: messageValue,
		},
	]);
	if (error.length !== 0) {
		document.getElementById('error-message').innerHTML = error.join(', <br>');
		return;
	} else {
		document.getElementById('error-message').innerHTML = error.join('');
	}

	let emailReceiver = 'johndoe@gmail.com';

	let a = document.createElement('a');
	a.href = `mailto:${emailReceiver}?subject=${subjectValue}&body=Hallo nama saya ${nameValue}, ${messageValue},
		silahkan kontak ke nomor ${phoneValue}`;
	a.target = '_blank';
	a.click();
};

const validate = (fieldData) => {
	console.log(fieldData);
	let errorMessage = [];
	for (let i = 0; i < fieldData.length; i++) {
		if (fieldData[i].value.trim().length === 0) {
			errorMessage.push(`${fieldData[i].fieldName} field required!!`);
			document
				.getElementsByName(`${fieldData[i].fieldName}`)[0]
				.classList.add('input-error');
		} else {
			document
				.getElementsByName(`${fieldData[i].fieldName}`)[0]
				.classList.remove('input-error');
		}
	}
	console.log(errorMessage);
	return errorMessage;
};
