const words = [
    "АРЕСТ", "АВТОР", "АРХИВ", "АДРЕС",
    "БИЛЕТ", "БРЕШЬ", "БУКЕТ", "БАЛЕТ", 
    "ВАЛЕТ", "ВЕТКА", "ВОКАЛ", "ВОЙНА",
    "ГЕЙША", "ГРУНТ", "ГАРЕМ", "ГУБКА",
    "ДВЕРЬ", "ДИВАН", "ДЕКАН", "ДУРАК",
    "ЖАКЕТ", "ЖЕНИХ", "ЖОКЕЙ", "ЖИРАФ",
    "ЗАБЕГ", "ЗЕВОК", "ЗАВОД", "ЗНАТЬ", "ЗЛОБА", "ЗЕФИР",
    "ИНДУС", "ИГРОК", "ИСПУГ", "ИКОНА",
    "КНИГА", "КРУПА", "КОБРА", "КЛОУН"
] // TODO fill database

for (const wrapper of document.getElementsByClassName('key')) {
    wrapper.addEventListener('click', (event) => {
        if (event.target.classList.contains('enter')) {
            enter();
        } else if (event.target.classList.contains('erase')) {
            erase();
        } else {
            addToStack(event.target.textContent);
        }
    });
}

var randomIndex = Math.floor((Math.random() * words.length));
var target = words[randomIndex];
console.log(`Target: ${target}`);
var curRow = 1;
var stack = [];
var gameOver = false;

function enter() {
    if (gameOver)
        return;
    if (stack.length != 5){
        alert('Введите слово длиной 5 символов');
        return;
    }
    var curWord = stack.join('');
    if (!checkWord(curWord)) {
        alert(`Слово ${curWord} не найдено!`);  // erase word?
        return;
    }
    // color row
    const rowId = `row${curRow}`;
    const row = document.getElementById(rowId);
    var i = 0;
    var keyColors = new Map();
    row.childNodes.forEach((item) => {
        if (item.nodeName !== 'TD')
            return;        
        var char = stack[i];
        var cls = ''
        if (char == target[i]) {
            cls = 'green';
        } else if (target.includes(char)) {
            cls = 'yellow';
        } else {
            cls = 'dark';
        }
        item.classList.add(cls);
        keyColors.set(char, cls);
        i++;
    });
    // color keyboard
    keyColors.forEach((value, key) => {
        var keyNode = document.getElementById(key);
        if (keyNode.classList.contains('green'))
            return;
        if (keyNode.classList.contains('yellow'))
            keyNode.classList.remove('yellow');
        keyNode.classList.add(value);
    });
    // upgrade state
    curRow++;
    stack = [];
    gameOver = target == curWord;
    if (gameOver){
        alert('Игра окончена!');
    }
}

function checkWord(word) {
    return true;
}

function erase() {
    if (gameOver)
        return;
    stack.pop();
    updateCurrentRow();
}

function addToStack(letter) {
    if (gameOver)
        return;
    if (stack.length >= 5)
        return;
    stack.push(letter);
    updateCurrentRow();
}

function updateCurrentRow() {
    const rowId = `row${curRow}`;
    const row = document.getElementById(rowId);
    var i = 0;
    row.childNodes.forEach((item) => {
        if (item.nodeName !== 'TD')
            return;
        if (i < stack.length) {
            item.textContent = stack[i];
            i++;
        } else {
            item.textContent = '';
        }
    })
}