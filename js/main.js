const codeEditor = document.getElementById("codeEditor");
const lineCounter = document.getElementById("lineCounter");
const viewSide = document.getElementById("viewside");

codeEditor.addEventListener("scroll", () => {
	lineCounter.scrollTop = codeEditor.scrollTop;
	lineCounter.scrollLeft = codeEditor.scrollLeft;
});

codeEditor.addEventListener("keydown", e => {
	let { keyCode } = e;
	let { value, selectionStart, selectionEnd } = codeEditor;
	update();
	if (keyCode === 9) {
		// TAB = 9
		e.preventDefault();
		codeEditor.value = value.slice(0, selectionStart) + "  " + value.slice(selectionEnd);
		codeEditor.setSelectionRange(selectionStart + 2, selectionStart + 2);
	}
});

codeEditor.addEventListener("change", update);
codeEditor.addEventListener("click", update);
codeEditor.addEventListener("copy", update);
codeEditor.addEventListener("cut", update);
codeEditor.addEventListener("paste", update);
codeEditor.addEventListener("focusin", update);
codeEditor.addEventListener("focusout", update);
codeEditor.addEventListener("keypress", update);
codeEditor.addEventListener("keyup", update);

var lineCountCache = 0;
function line_counter() {
	var lineCount = codeEditor.value.split("\n").length;
	var outarr = new Array();
	if (lineCountCache != lineCount) {
		for (var x = 0; x < lineCount; x++) {
			outarr[x] = x + 1 + ".";
		}
		lineCounter.value = outarr.join("\n");
	}
	lineCountCache = lineCount;
}
codeEditor.addEventListener("input", () => {
	line_counter();
});

function update() {
	viewSide.innerHTML = codeEditor.value;
}
