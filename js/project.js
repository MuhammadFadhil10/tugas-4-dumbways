let data = [];

const submitBlog = (e) => {
	e.preventDefault();
	let techStr = '';
	const projectName = document.getElementById('name-input').value;
	const startDate = document.getElementById('start-date-input').value;
	const endDate = document.getElementById('end-date-input').value;
	const description = document.getElementById('desc-input').value;
	const technologies = document.getElementsByClassName('checkbox');
	let image = document.getElementById('file-input').files[0];
	image = image ? URL.createObjectURL(image) : '';

	for (let i = 0; i < technologies.length; i++) {
		if (technologies[i].checked) {
			techStr += ` <img src="assets/icon/${technologies[i].name}.png" 
			alt="${technologies[i].name}-icon"/>`;
		}
	}

	const error = validate([
		{
			fieldName: 'name',
			value: projectName,
		},
		{
			fieldName: 'start date',
			value: startDate,
		},
		{
			fieldName: 'end date',
			value: endDate,
		},
		{
			fieldName: 'description',
			value: description,
		},
		{
			fieldName: 'technologies',
			value: techStr,
		},
		{
			fieldName: 'image',
			value: image,
		},
	]);
	if (error.length !== 0) {
		document.getElementById('error-message').innerHTML = error.join(', <br>');
		return;
	} else {
		document.getElementById('error-message').innerHTML = error.join('');
	}

	let project = {
		projectName,
		description,
		techStr,
		duration: getDuration(startDate, endDate),
		image,
	};

	data.push(project);

	blogCardRender();
};

const blogCardRender = () => {
	let blogContainer = document.getElementById('blog-container');
	blogContainer.innerHTML = '';
	for (let i = 0; i < data.length; i++) {
		blogContainer.innerHTML += `
        <div class="blog-card" onclick="goToBlogDetail('/projectDetail.html')">
            <div class="blog-card-header">
                <img src="${data[i].image}" alt="" srcset="" />
                <div class="blog-card-title">
                    <h1>${data[i].projectName}</h1>
					<p>Duration: ${data[i].duration}</p>
                </div>
            </div>
            <!-- <div class="blog-card-body"> -->
            <p class="blog-desc">
                ${data[i].description}
            </p>
            <div class="blog-icon-list">
                ${data[i].techStr.toString()}
            </div>
            
            <!-- </div> -->
            <div class="blog-card-action">
                <button class="edit-blog-button">Edit</button>
                <button class="delete-blog-button">Delete</button>
            </div>
        </div>
    `;
	}
};

const goToBlogDetail = (path) => {
	let a = document.createElement('a');
	a.href = `projectDetail.html`;
	a.target = '_blank';
	a.click();
};

const getDuration = (startDate, endDate) => {
	let duration = null;
	const timeStart = new Date(startDate).getTime();
	const timeEnd = new Date(endDate).getTime();
	const millisecondsMargin = timeEnd - timeStart;
	const dayMargin = Math.floor(millisecondsMargin / (1000 * 60 * 60 * 24));

	if (dayMargin < 30) {
		if (dayMargin === 0) {
			duration = 'a few hours';
		} else {
			duration = `${dayMargin} Day`;
		}
	} else {
		if (dayMargin < 365) {
			if (dayMargin % 30 === 0) {
				duration = `${Math.floor(dayMargin / 30)} Month`;
			} else {
				duration = `${Math.floor(dayMargin / 30)} Month ${dayMargin % 30} Day`;
			}
		} else {
			if (dayMargin % 365 === 0) {
				duration = `${Math.floor(dayMargin / 365)} Year`;
			} else {
				if (dayMargin % 365 <= 29) {
					duration = `${Math.floor(dayMargin / 365)} Year ${Math.floor(
						dayMargin % 365
					)} Day`;
				} else {
					duration = `${Math.floor(dayMargin / 365)} Year ${Math.floor(
						(dayMargin % 365) / 30
					)} Month`;
				}
			}
		}
	}
	return duration;
};

const validate = (fieldData) => {
	let errorMessage = [];
	for (let i = 0; i < fieldData.length; i++) {
		if (fieldData[i].value.trim().length === 0) {
			document
				.getElementsByName(`${fieldData[i].fieldName}`)[0]
				.classList.add('input-error');
			errorMessage.push(`${fieldData[i].fieldName} field required!!`);
		} else {
			if (fieldData[i].fieldName === 'end date') {
				if (fieldData[i - 1].value > fieldData[i].value) {
					document
						.getElementsByName(`${fieldData[i].fieldName}`)[0]
						.classList.add('input-error');
					errorMessage.push(
						`${fieldData[i].fieldName} cant't be more backward than ${
							fieldData[i - 1].fieldName
						}!!`
					);
				} else {
					document
						.getElementsByName(`${fieldData[i].fieldName}`)[0]
						.classList.remove('input-error');
				}
			} else {
				document
					.getElementsByName(`${fieldData[i].fieldName}`)[0]
					.classList.remove('input-error');
			}
		}
	}
	return errorMessage;
};
