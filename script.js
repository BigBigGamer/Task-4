// Маска возможных ходов
var mask = [ 
    [false,true,false,true,false],
    [true,false,false,false,true],
    [false,false,false,false,false], 
    [true,false,false,false,true],
    [false,true,false,true,false],
]

// Массив шахматной доски - со всеми делениями
var chessBoard = [];
var alphabet = 'ABCDEFGH';
for (var i = 0; i < 8; i++ ) {
    chessBoard[i] = [];
    for (var j = 0; j < 8; j++ ) {
        chessBoard[i][j] =  alphabet[i] + (1+j)
    } 
}

/* Функция для очистки окрашеной доски
   Проходит по значениям массива chessBoard - и у элементов документа с такими id
   меняет значение class на дефолтный (ч\б)
*/ 
function refreshBoard() {
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if (i%2 == j%2) {
                document.getElementById(chessBoard[i][j]).className = 'white';
            } else {
                document.getElementById(chessBoard[i][j]).className = 'black';
            }
        }
    }
}

// Функция поиска возможных маршрутов
// Принимает start - начальный индекс в виде 'D4'
function whereToGo(start) {

    refreshBoard() // Чистим доску

    var startRow, startColumn; 
    var output = [];  // Переменная для выыода результата

    startRow = alphabet.indexOf(start[0]);  // Находим индекс введенного символа(буквы) в alphabet 
    startColumn = start[1] - 1 ;  // Второй индекс введенного значения 

    if (startColumn <= 7 && startRow != -1) {  // Условие на нахождение внутри доски изначальной точки

        for (var i = 0; i < 5 ; i++){  // Проходим циклами по маске
            for (var j = 0; j < 5 ; j++){  

                row = i + startRow - 2;  // Индексы для самой доски смещены в соответствии с введенным значением
                column = j + startColumn - 2;

                if ( row >= 0 && column >= 0 && column <= 7 && row <= 7) {  // Если индексация внутри доски, то
                    if (mask[i][j]) {  // Если по маске ход возможен, то
                        output.push(chessBoard[row][column]); // Добавить элемент к результату
                    }
                }

            }
        }
        // Смена класса(цвета) для каждого элемента из output
        output.forEach( function(key){
            document.getElementById(key).className = 'green';
        } )
        // Смена класса(цвета) для старта
        document.getElementById(start).className = 'blue';
    } 
}


// Создание визуала шахматной доски 
var chessTable = document.createElement('table')
chessTable.className = 'chess_table'

for (var i = 0; i < 10; i++) {
    var tr = document.createElement('tr'); // Создаем элемент строки
    for (var j = 0; j < 10; j++) {
        var td = document.createElement('td'); // Создаем элемент столбца
        if (i > 0 && j > 0 && i < 9 && j<9) {
            
            if (i%2 == j%2) { // Проверка на четность
                td.className = 'white';
            } else {
                td.className = 'black';
            }
            td.id = alphabet[j-1] + (i); // Присваиваем каждому элементу таблицы id как у доски (напр. id = 'A2')
            td.onclick = function() { whereToGo( this.id ) } // Добавляем реакцию на клик с передачей своего id

        } else {
            // Здесь обработка граничных букв & цифр 
            td.className = 'bordercell';
            
            // Можно в одну строчку
            // td.innerHTML = (j == 0 || j == 9) ? ( (i == 0 || i == 9)? '': i ) : ( alphabet[j-1] );

            // Но так читаемее
            if (j == 0 || j == 9) {
                if (i != 0 && i != 9) {
                    td.innerHTML = i; // Пишем цифру
                }
            } else {
                td.innerHTML = alphabet[j-1];  // Пишем букву
            }
           
        }
        tr.appendChild(td); // Подключаем столбец к строке
    }
    chessTable.appendChild(tr); // Подключаем строку к таблице
}
document.body.appendChild(chessTable) // Подключаем таблицу к body



