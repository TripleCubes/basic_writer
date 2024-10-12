let textarea = document.querySelector('textarea');
let fileInput = document.querySelector('#file_input');
let saveStatus = document.querySelector('.save_status');

const TIMEOUT = 2000;
let timeoutId = 0;
let localStorageItemName = 'text';

let text = localStorage.getItem(localStorageItemName);
if (text != null) {
	textarea.value = text;
}

textarea.addEventListener('input', () => {
	saveStatus.innerHTML = 'unsaved';

	clearTimeout(timeoutId);
	timeoutId = setTimeout(() => {
		localStorage.setItem(localStorageItemName, textarea.value);
		saveStatus.innerHTML = 'saved';
	}, TIMEOUT);
});

let changeFont = () => {
	if (textarea.classList.contains('textarea_monospace')) {
		textarea.classList.remove('textarea_monospace');
	}
	else {
		textarea.classList.add('textarea_monospace');
	}
}

let openFile = async () => {
	if (fileInput.files.length == 0) {
		console.log('no file selected');
		return;
	}

	file = fileInput.files[0];
	textarea.value = await file.text();
}

let downloadFile = async () => {
	let a = document.createElement('a');
	a.href = 'data:text/plain;charset=utf-8,'
		+ encodeURIComponent(textarea.value);

	a.download = 'text.txt';
	a.display = 'none';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}
