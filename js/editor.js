function update() {
	var idoc = document.getElementById('iframe').contentWindow.document;
	idoc.open();
	idoc.write(editor.getValue());
	idoc.close();
}

const parent = 'parent';
const child = 'child';

function addParent() {
	editor.session.insert(editor.getCursorPosition(), `<div class="${parent}"></div>`);
	beautify();
}

function addChild() {
	editor.session.insert(editor.getCursorPosition(), `<div class="${child}"></div>`);
	beautify();
}

function setupEditor() {
	window.editor = ace.edit('editor');
	editor.setTheme('ace/theme/monokai');
	editor.getSession().setMode('ace/mode/html');
	editor.setValue(``, 1); //1 = moves cursor to end

	editor.getSession().on('change', function () {
		update();
	});

	editor.focus();

	editor.setOptions({
		fontSize: '12pt',
		showLineNumbers: true,
		showGutter: false,
	});

	editor.setShowPrintMargin(false);
	editor.setBehavioursEnabled(false);
}

function beautify() {
	var val = editor.session.getValue();
	val = html_beautify(val);
	editor.session.setValue(val);
}

setupEditor();
update();
