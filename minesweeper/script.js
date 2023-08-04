const select = document.querySelector('.select');
let minesLeft = select.options[select.selectedIndex].value;
const minesText = document.querySelector('.minesText');
const divBoard = document.querySelector('#board');
let allCells = document.querySelectorAll('.cell');

const di=[-1, -1, -1, 0, 1, 1, 1, 0];
const dj=[-1, 0, 1, 1, 1, 0, -1, -1];

let boardDetails = {
    rows: 10,
    cells: 10,
    diff: 10,
    class: "easy"
}
boardDetails.diff = parseInt(minesLeft);
let board = [];
allCells = document.querySelectorAll('.cell');

const changeBoardDimensions = function (board) {
    if (board.diff === 10) {
        board.rows = 10;
        board.cells = 10;
        board.class = "easy";
    } else if (board.diff === 40) {
        board.rows = 16;
        board.cells = 16;
        board.class = 'intermediare';
    } else if (board.diff === 99) {
        board.rows = 16;
        board.cells = 30;
        board.class = 'hard';
    }
    return board;
}
const renderBoard = function (boardDetails) {
    divBoard.innerHTML = '';
    divBoard.classList.remove('easy', 'hard', 'intermediare');
    divBoard.classList.add(boardDetails.class);
    // console.log("before", divBoard.innerHTML);
    let h = 0;
    board = [];
    for (let i = 0; i < boardDetails.rows; i++) {
        board[i] = [];
        const row = document.createElement('div');
        row.classList.add('row', boardDetails.class);
        for (let j = 0; j < boardDetails.cells; j++) {
            board[i][j] = {
                value: 0,
                id: h,
                clicked: false,
                safe: true,
                placedFlag: false,
                imgLink:'0.png'
            }
            const cell = document.createElement('div');
            cell.classList.add('cell', boardDetails.class);


            cell.classList.add('inactive');
            // cell.classList.add('active');

            cell.setAttribute('id', h);
            row.appendChild(cell);

            // cell.innerHTML=board[i][j].value;
            h++;
        }
        divBoard.appendChild(row);
    }
    h=minesLeft;
    while(h){
        const noCells=boardDetails.rows*boardDetails.cells-1;
        const randMine=Math.floor(Math.random()*noCells);
        const i=Math.floor(randMine/boardDetails.cells);
        const j=randMine%boardDetails.cells;
        // console.log(board[i][j]);
        if(board[i][j].safe==true){
            const fetchCell=document.getElementById(board[i][j].id);
            board[i][j].safe=false;
            board[i][j].value=-1;
            // fetchCell.style.backgroundImage=`url('-1.png')`

            fetchCell.innerHTML=board[i][j].value;

            h--;
        }
    }
    console.log(board);
    for (let i = 0; i < boardDetails.rows; i++) {
        for (let j = 0; j < boardDetails.cells; j++) {
            let cnt=0;
            if(board[i][j].safe==true){
                for(let k=0; k<8; k++){
                    // console.log(i+di[k], j+dj[k]);
                    if(0<=i+di[k] && i+di[k]<boardDetails.rows && 0<=j+dj[k] && j+dj[k]<boardDetails.cells){
                        if(board[i+di[k]][j+dj[k]].safe===false)
                            cnt++;
                    }
                }
            }
            else
                cnt=-1;
            const fetchCell=document.getElementById(board[i][j].id);
            board[i][j].value=cnt;
            board[i][j].imgLink=`${cnt}.png`;
            // fetchCell.style.backgroundImage=`url('${cnt}.png')`;
            // fetchCell.style.backgroundSize='cover';

            fetchCell.innerHTML=board[i][j].value;
        }
    }
    // console.log("after", divBoard.innerHTML);
    // console.log(board);
    allCells = document.querySelectorAll('.cell');
}
renderBoard(boardDetails);

function floodFill(board, boardDetails, i, j){
    const fetchCell=document.getElementById(board[i][j].id);
    board[i][j].clicked=true;
    fetchCell.classList.add('active');
    fetchCell.classList.remove('inactive');
    fetchCell.style.backgroundImage=`url('${board[i][j].imgLink}')`;
    // console.log('acum sunt la', board[i][j]);
    for(let k=0; k<8; k++){
        if(0<=i+di[k] && i+di[k]<boardDetails.rows && 0<=j+dj[k] && j+dj[k]<boardDetails.cells){
            if(board[i+di[k]][j+dj[k]].value>0 && board[i+di[k]][j+dj[k]].clicked==false){
                // console.log("acum am marcat numarul", board[i+di[k]][j+dj[k]]);
                const numberCell=document.getElementById(board[i+di[k]][j+dj[k]].id);
                board[i+di[k]][j+dj[k]].clicked=true;
                numberCell.classList.add('active');
                numberCell.classList.remove('inactive');
                numberCell.style.backgroundImage=`url('${board[i+di[k]][j+dj[k]].imgLink}')`;
            }else if(board[i+di[k]][j+dj[k]].value===0 && board[i+di[k]][j+dj[k]].clicked===false){
                // console.log('acum ma mut la', board[i+di[k]][j+dj[k]])
                floodFill(board, boardDetails, i+di[k], j+dj[k]);
            }
        }
    }
}

const freezeBoard=function(board, boardDetails){
    for (let ii = 0; ii < boardDetails.rows; ii++) {
        for (let jj = 0; jj < boardDetails.cells; jj++) {
            const fetchCell=document.getElementById(board[ii][jj].id);
            fetchCell.classList.add('active');
            fetchCell.classList.remove('inactive');
            fetchCell.style.backgroundImage=`url('${board[ii][jj].imgLink}')`
        }
    }
}

const checkMines=function(board, boardDetails){
    console.log("verific harta");
    // if(minesLeft===0){
        let cntMines=0;
        let cntClicked=0;
        for (let i = 0; i < boardDetails.rows; i++) {
            for (let j = 0; j < boardDetails.cells; j++) {
                if(board[i][j].value===-1 && board[i][j].placedFlag===true)
                    cntMines++;
                if(board[i][j].clicked===true && board[i][j].placedFlag===false)
                    cntClicked++;
            }
        }
        console.log(`am gasit ${cntMines} mine marcate corect`, boardDetails);
        console.log(`am gasit ${cntClicked} celule apasate`, boardDetails);
        if(cntMines===boardDetails.diff || cntClicked===boardDetails.rows*boardDetails.cells-boardDetails.diff){
            console.log("you won!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            minesText.innerHTML='Congrats! You won!';
            divBoard.style.pointerEvents='none';
            freezeBoard(board, boardDetails);
        }
    // }
}

const openAdjacentCells=function(i, j){
    const currentCell=document.getElementById(`${board[i][j].id}`);
    let cntMines=0;
    for(let k=0; k<8; k++){
        if(0<=i+di[k] && i+di[k]<boardDetails.rows && 0<=j+dj[k] && j+dj[k]<boardDetails.cells)
        {
            if(board[i+di[k]][j+dj[k]].value===-1 && board[i+di[k]][j+dj[k]].placedFlag===true)
                    cntMines++;
        }
    }
    console.log(currentCell, board[i][j], cntMines, "hello");
    if(cntMines==board[i][j].value){
        for(let k=0; k<8; k++){
            if(0<=i+di[k] && i+di[k]<boardDetails.rows && 0<=j+dj[k] && j+dj[k]<boardDetails.cells)
            {
                if(board[i+di[k]][j+dj[k]].value>0){
                    const adjacentCell=document.getElementById(`${board[i+di[k]][j+dj[k]].id}`);
                    console.log('******', adjacentCell);
                    board[i+di[k]][j+dj[k]].clicked=true;
                    adjacentCell.classList.add('active');
                    adjacentCell.classList.remove('inactive');
                    adjacentCell.style.backgroundImage=`url('${board[i+di[k]][j+dj[k]].imgLink}')`
                }else if(board[i+di[k]][j+dj[k]].value==0){
                    floodFill(board, boardDetails, i, j);
                }
            }
        }
    }
}

const handleChanges=function(board, boardDetails){

    const handleRightClick = function (e) {
        e.preventDefault();
        const clickedCell = parseInt(e.target.id);
        const targetedCell = document.getElementById(clickedCell);
        console.log(targetedCell);
        const i=Math.floor(clickedCell/boardDetails.cells);
        const j=clickedCell%boardDetails.cells;
        console.log(board[i][j]);
        if((minesLeft>0 && (board[i][j].clicked===false || board[i][j].placedFlag===true)) || (board[i][j].placedFlag===true)){
            if(board[i][j].placedFlag==false){
                minesLeft--;
                targetedCell.style.backgroundImage=`url('flag.png')`;
            }else{
                minesLeft++;
                targetedCell.style.backgroundImage=`url('')`;
            }
            // boardDetails.diff = parseInt(minesLeft);
            minesText.innerHTML = `${minesLeft} mines left`
            board[i][j].placedFlag=!board[i][j].placedFlag;
            board[i][j].clicked=!board[i][j].clicked;
            targetedCell.classList.toggle('flagged');
        }
        checkMines(board, boardDetails);
        // alert('right click');
    }
    const handleClick = function (e) {
        const clickedCell = parseInt(e.target.id);
        const targetedCell = document.getElementById(clickedCell);
        console.log(targetedCell);
        const i=Math.floor(clickedCell/boardDetails.cells);
        const j=clickedCell%boardDetails.cells;
        console.log(board[i][j]);
        if(board[i][j].value===-1 && board[i][j].placedFlag===false){
            console.log('you lose');
            minesText.innerHTML='You lost!';
            divBoard.style.pointerEvents='none';
            freezeBoard(board, boardDetails);
        } else if(board[i][j].value>0){
            if(board[i][j].clicked==true){
                openAdjacentCells(i, j);
            }
            board[i][j].clicked=true;
            targetedCell.classList.add('active');
            targetedCell.classList.remove('inactive');
            targetedCell.style.backgroundImage=`url('${board[i][j].imgLink}')`
        } else if(board[i][j].value===0){
            //aici vine floodFill
            floodFill(board, boardDetails, i, j);
        }
        checkMines(board, boardDetails);
        // alert('click');
    }

    allCells.forEach(function (cell) {
        cell.addEventListener('contextmenu', handleRightClick);
        cell.addEventListener('click', handleClick);
        
    })
}
handleChanges(board, boardDetails);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
select.addEventListener('change', function () {
    minesLeft = select.options[select.selectedIndex].value;
    console.log(minesLeft, "S A SCHIMBAT");
    boardDetails.diff = parseInt(minesLeft);
    minesText.innerHTML = `${minesLeft} mines left`
    boardDetails = changeBoardDimensions(boardDetails);
    renderBoard(boardDetails);
    handleChanges(board, boardDetails);
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
allCells = document.querySelectorAll('.cell');


allCells = document.querySelectorAll('.cell');
