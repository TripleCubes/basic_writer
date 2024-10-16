let textarea = document.querySelector('textarea');
let fileInput = document.querySelector('#file_input');
let saveStatus = document.querySelector('.save_status');
let wordCount = document.querySelector('.word_count');

const TIMEOUT = 500;
const LOCAL_STORAGE_TEXT = 'text';
const LOCAL_STORAGE_FONT = 'font';
const LOCAL_STORAGE_FONT_MONOSPACE = 'monospace';
const LOCAL_STORAGE_FONT_SANS_SEFIR = 'sans_serif';
let timeoutId = 0;

let init = () => {
	if (localStorage.getItem(LOCAL_STORAGE_FONT) == null) {
		localStorage.setItem(LOCAL_STORAGE_FONT, LOCAL_STORAGE_FONT_SANS_SEFIR);
	}

	let text = localStorage.getItem(LOCAL_STORAGE_TEXT);
	if (text != null) {
		textarea.value = text;
		wordCount.innerHTML = '' + getWordCount(textarea.value);
	}
}


textarea.addEventListener('input', () => {
	saveStatus.innerHTML = 'unsaved';

	clearTimeout(timeoutId);
	timeoutId = setTimeout(() => {
		localStorage.setItem(LOCAL_STORAGE_TEXT, textarea.value);
		saveStatus.innerHTML = 'saved';
		wordCount.innerHTML = '' + getWordCount(textarea.value);
	}, TIMEOUT);
});

let changeFont = () => {
	if (localStorage.getItem(LOCAL_STORAGE_FONT)
	== LOCAL_STORAGE_FONT_MONOSPACE) {
		localStorage.setItem(LOCAL_STORAGE_FONT, LOCAL_STORAGE_FONT_SANS_SEFIR);
		textarea.classList.remove('textarea_monospace');
	}
	else {
		localStorage.setItem(LOCAL_STORAGE_FONT, LOCAL_STORAGE_FONT_MONOSPACE);
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

let strRmAt = (str, i) => {
	return str.substring(0, i) + str.substring(i + 1);
}

let getWordCount = (str) => {
	if (str.length == 0) {
		return 0;
	}

	str = str.replaceAll('.', ' ').replaceAll(',', ' ');

	let i = 0;
	while (i < str.length - 1) {
		if (str[i] == ' ' && str[i + 1] == ' ') {
			str = strRmAt(str, i + 1);
			continue;
		}
		i++;
	}

	if (str[str.length - 1] == ' ') {
		str = strRmAt(str, str.length - 1);
	}

	return str.split(' ').length;
}

init();
