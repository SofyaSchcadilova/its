//let fs = require('fs');
//const t = fs.readFileSync(process.argv[2], 'utf8');
//const s = fs.readFileSync(process.argv[2], 'utf8');
t = "колокол"
s = "колокол и колокольчик"
m = t.length;

//Алфавит строки t
let alph = new Array();
for (let i = 0; i < m; i++)
    alph[t.charAt(i)] = 0;

//В двумерном массиве del храним таблиицу переходов
del = new Array(m + 1);
for (let j = 0; j < m + 1; j++)
    del[j] = new Array;
//Инициализируем таблицу переходов
for (i in alph)
    del[0][i] = 0;
//Формируем таблицу пепреходов
for (let j = 0; j < m; j++)
{
    prev = del[j][t.charAt(j)]
    del[j][t.charAt(j)] = j + 1;
    for(i in alph)
        del[j + 1][i] = del[prev][i]
}
console.log(del)

let state = 0;
let positions = new Array();
for (let i = 0; i < s.length; i++)
{
    if (s.charAt(i) in alph)
        state = del[state][s.charAt(i)];
    else
        state = 0;
    if (state == m)
        positions.push(i + 1 - m );
}
console.log(positions)