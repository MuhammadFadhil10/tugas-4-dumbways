let data = [];

const submitBlog = (e) => {
	e.preventDefault();
	let techChecked = [];
	let techStr = '';
	const projectName = document.getElementById('name-input').value;
	const startDate = document.getElementById('start-date-input').value;
	const endDate = document.getElementById('end-date-input').value;
	const description = document.getElementById('desc-input').value;
	const technologies = document.getElementsByClassName('checkbox');
	let image = document.getElementById('file-input').files[0];
	image = URL.createObjectURL(image);

	for (let i = 0; i < technologies.length; i++) {
		if (technologies[i].checked) {
			techStr += ` <img src="assets/icon/${technologies[i].name}.png" alt="" srcset="" />`;
		}
	}

	let project = {
		projectName,
		description,
		techStr,
		image,
		postedAt: 'Baru saja',
		author: 'Muhammad Fadhil Akbar',
	};
	console.log(techStr);
	data.push(project);
	console.log(techStr);

	blogCardRender();
};

const blogCardRender = () => {
	// console.log(data);
	document.getElementById('blog-container').innerHTML = '';
	for (let i = 0; i < data.length; i++) {
		document.getElementById('blog-container').innerHTML += `
        <div class="blog-card" onclick="goToBlogDetail('/projectDetail.html')">
            <div class="blog-card-header">
                <img src="${data[i].image}" alt="" srcset="" />
                <div class="blog-card-title">
                    <h1>${data[i].projectName}</h1>
                    <p>Diposting pada: ${data[i].postedAt} | ${
			data[i].author
		}</p>
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
	window.location.href = path;
};

// const getTechIcon = (techImgName) => {
// 	let imgTag = '';
// 	for (let i = 0; i < techImgName; i++) {
// 		imgTag += `<img src="assets/icon/${techImgName[i]}.png" alt="" srcset="" />`;
// 	}
// 	console.log(imgTag);
// 	return imgTag;
// };
