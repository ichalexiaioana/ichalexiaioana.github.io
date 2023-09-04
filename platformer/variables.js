const square = document.getElementById('square');
const container = document.querySelector('.container');
const limX = parseInt(getComputedStyle(container).width.slice(0, -2));
const limY = parseInt(getComputedStyle(container).height.slice(0, -2));
const obst=document.getElementById('dummy');
const obstW=parseInt(getComputedStyle(obst).width.slice(0, -2));
const obstH=parseInt(getComputedStyle(obst).height.slice(0, -2));
const body=document.querySelector('body');
const distOnKey=90;
const upMomentum=1.2;
const downMomentum=1.2;

const btnReset=document.getElementById('btn-reset');
const btnReadMe=document.getElementById('read-me');
const message=document.getElementById('message');
const display=document.getElementById('display');
const err=document.getElementById('err');
// console.log(obstH, obstW);
// console.log(body);
body.removeChild(obst);
obst.remove();
// console.log(body);
// console.log(limX, limY, "ba");

const makeDummy=function(object){
    const objectDummy={
        top: parseInt(getComputedStyle(object).top.slice(0, -2)),
        left: parseInt(getComputedStyle(object).left.slice(0, -2)),
        height: parseInt(getComputedStyle(object).height.slice(0, -2)),
        width: parseInt(getComputedStyle(object).width.slice(0, -2)),
    }
    return objectDummy;
}
const makeShadow=function(dummy, name){
    const shadow=document.createElement('div')
    shadow.classList.add(name);
    shadow.style.top=`${dummy.top}px`;
    shadow.style.left=`${dummy.left}px`;
    container.appendChild(shadow);
    console.log(shadow, '------------------------------------------------------');
}

export {square, container, btnReset, btnReadMe, message, display, err, limX, limY, obstW, obstH, distOnKey, upMomentum, downMomentum, makeDummy, makeShadow};