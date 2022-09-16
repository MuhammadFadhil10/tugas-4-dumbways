const submitData = () => {
	// import field value
	const nameValue = document.querySelector('#input-name').value;
	const emailValue = document.querySelector('#input-email').value;
	const phoneValue = document.querySelector('#input-phone').value;
	const subjectValue = document.querySelector('#input-select').value;
	const messageValue = document.querySelector('#input-message').value;
	// input validation
	if (!nameValue) {
		alert('Name field cannot be empty!');
		return;
	} else if (!emailValue) {
		alert('Email field cannot be empty!');
		return;
	} else if (!phoneValue) {
		alert('Phone field cannot be empty!');
		return;
	} else if (!subjectValue) {
		alert('Subject field cannot be empty!');
		return;
	} else if (!messageValue) {
		alert('Message field cannot be empty!');
		return;
	}

	let emailReceiver = 'johndoe@gmail.com';

	let a = document.createElement('a');
	a.href = `mailto:${emailReceiver}?subject=${subjectValue}&body=Hallo nama saya ${nameValue}, ${messageValue}, silahkan kontak ke nomor ${phoneValue}`;
	// a.href = `https://mail.google.com/mail/?view=cm&fs=1&from=${emailValue}&to=${emailReceiver}&su=${subjectValue}&body=${messageValue}, silahkan kontak ke nomor ${phoneValue}. Terimakasih`;
	a.target = '_blank';
	a.click();
};
