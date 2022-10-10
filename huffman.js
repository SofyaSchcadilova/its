/*Щадилова Соня кн-101
Постановка задачи:
huffman.js [файл длф чтения строки] [файл для записи закодированной строки] [файл для записи декодированной строки]*/


let fs = require('fs');
let arg = process.argv;
let inpStr = fs.readFileSync(arg[2], 'utf-8');

function Node(letter, freq, father, code){
    this.letter = letter;
    this.freq = freq;
    this.father = father;
    this.code = code;
}

//частотность
let alph = new Array();
let alphLength = 0;
for (i = 0; i < inpStr.length; i++){
    if (alph[inpStr.charAt(i)]){
        alph[inpStr.charAt(i)] ++;
    }else{
        alph[inpStr.charAt(i)] = 1;
        alphLength ++
    }
}

//лепестки дерева
let tree = new Array(alphLength * 2 - 1);
let counter = 0;
for (i in alph){
    let n = new Node(i, alph[i], null, '');
    tree[counter] = n;
    counter ++;
}

while (counter < alphLength * 2 - 1){
    // нахождение двух элементов с минимальной частотностью
    let freqMin = inpStr.length;
    let freqPmin = inpStr.length;
    for(i = 0; i < counter; i ++){
        if(tree[i].freq < freqMin && tree[i].father == null){
            freqPmin = freqMin;
            freqMin = tree[i].freq;
        }else if (tree[i].freq < freqPmin && tree[i].father == null){
            freqPmin = tree[i].freq;
        }
    }
    // построение дерева
    for(i = 0; i < counter; i ++){
        for (j = 0; j < counter; j++){
            if(i != j && tree[i].freq == freqMin && tree[j].freq == freqPmin && tree[i].father == null && tree[j].father == null){
                tree[i].father = counter;
                tree[i].code = '0';
                tree[j].father = counter;
                tree[j].code = '1';
                tree[counter] = new Node(tree[i].letter + tree[j].letter, tree[i].freq + tree[j].freq, null, '');
            }
            if ((tree[j]).father == counter)
                break;
        }
        if ((tree[i]).father == counter)
            break;
    }
    counter++;
}
// обратные последовательности для кодирования
let  decodeArr = new Array();
for (i in alph){
    if (alphLength == 1){
        decodeArr[i] = '0';
    }else{
    for (k = 0; k < alphLength; k++){
        if (i == tree[k].letter){
            decodeArr[i] = tree[k].code;
            j = tree[k].father;
            while (tree[j].code != ''){
                decodeArr[i] += tree[j].code;
                j = tree[j].father;
            }
        }
    }
    }
}

let encodeStr = '';
let decodeStr = '';
if (alphLength == 1){
    for (i in decodeArr)
    encodeStr = decodeArr[i].repeat(inpStr.length);
    decodeStr = i.repeat(inpStr.length);
}else{
    //последовательности для кодирования
    let encodeArr = new Array();
    for (i in decodeArr)
        encodeArr[i] = decodeArr[i].split('').reverse().join('');

    //кодирование
    for (i in inpStr){
        encodeStr += encodeArr[inpStr[i]];
    }

    //декодирование
    let st = 0;
    let fin = 1;
    while (fin < encodeStr.length + 1){
        count = 0;
        for (i in encodeArr) {
            count += 1;
            if(encodeStr.slice(st, fin) == encodeArr[i]){
                decodeStr += i;
                st = fin;
                fin = st +1;
                break;
            }
            if (count == alphLength){
                fin ++;
                break;
            }
        }
    }
}
fs.writeFileSync(arg[3], encodeStr);
fs.writeFileSync(arg[4], decodeStr);
