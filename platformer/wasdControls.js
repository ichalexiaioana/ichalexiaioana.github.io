import {square, btnReset, btnReadMe, message, display, err, container, limX, limY, obstH, obstW, distOnKey, makeDummy, makeShadow, upMomentum, downMomentum} 
from './variables.js';

import { generateObstacles } from './generateObstacles.js';
import { checkForObstacle } from './checkForObstacle.js';
import { gravity } from './gravity.js';

let moveX = parseInt(limX/2);
let moveY = limY;
let prevX=moveX;
let prevY=moveY;
console.log(limX, limY);
let distX = 0;
let distY = 0;
let checkPress = [];
let isOnTheGround=true;
const framesJump=9;
const framesUp=8;


const resertScreen=function(label){
    const objects=document.querySelectorAll(`.${label}`);
    objects.forEach(function(object){
        container.removeChild(object);
        object.remove();
    })
}
const moveSquare = function (x, y) {
    square.style.left = `${x}px`
    square.style.top = `${y}px`
}
const updateDist = function (isGravityOn) {
    distX = (checkPress['d'] | checkPress['arrowright']) * distOnKey - (checkPress['a'] | checkPress['arrowleft']) * distOnKey;
    distY = (checkPress['s'] | checkPress['arrowdown'])  * distOnKey - (checkPress['w'] | checkPress['arrowup'])   * distOnKey;
    if(isGravityOn){
        if(adjustForJump>0){
            // console.log('0');
            if (adjustForJump>framesJump-framesUp){
                distY=-upMomentum*distOnKey;
                checkPress['s']=checkPress['arrowdown']=false;
                checkPress['w']=checkPress['arrowup']=true;
                // console.log(distY, 'sus');
            }else{
                distY=downMomentum*distOnKey;
                checkPress['s']=checkPress['arrowdown']=true;
                checkPress['w']=checkPress['arrowup']=false;
                // console.log(distY, 'jos');
            }
            // const sqdm=makeDummy(square);
            // const shadow=makeShadow(sqdm, 'shadow');
        }else{//s a terminat saritura
            distY=downMomentum*distOnKey;
            checkPress['s']=checkPress['arrowdown']=true;
            checkPress['w']=checkPress['arrowup']=false;
        }
        // console.log(distY);
        adjustForJump--;
        if(adjustForJump<-1)
            adjustForJump=-1;
    }
    // console.log(distX, distY)
}
const restrictCoords = function (distX, distY) {
    
    let {limitX, limitY}=gravity(distX, distY, checkPress);

    let nX = limitX;
    let nY = limitY;
    // console.log(limX, limY);
    
    if (0 > nX) { nX = 0; }
    if (nX > limX) { nX = limX; }
    if (0 > nY) { nY = 0; }
    if (nY > limY) { nY = limY;}

    limitX=nX;
    limitY=nY;
    return { limitX, limitY};
    // d + 0
    // a - 0
    // w 0 -
    // s 0 +
    
}
const updateSquare = function (isGravityOn) {
    // console.log(checkJump);
    updateDist(isGravityOn);

    moveX += distX;
    moveY += distY;
    
    let {limitX, limitY}=restrictCoords(distX, distY);
    moveX=limitX;
    moveY=limitY;

    if(moveX==prevX && moveY==prevY){
        // console.log('nu te mut');
        
    }else{
        // console.log('te mut');

        moveSquare(moveX, moveY);
        prevX=moveX;
        prevY=moveY;
    }

}
const gameLoop=function(){

    window.addEventListener('keydown', function(e){
        if((e.key.toLowerCase()=='arrowup') || (e.key.toLowerCase()=='w')){
            if(isGravityOn &&  isOnTheGround==true){
                checkJump=1;
                adjustForJump=framesJump;
            }
        }else{
            checkJump=0;
        }
        // console.log(e);
        checkPress[e.key.toLowerCase()]=true;
    })
    window.addEventListener('keyup', function(evt){
        checkPress[evt.key.toLowerCase()]=false;
    })

    
    
    updateSquare(isGravityOn);
    // console.log(1*(countSeconds%6>2));
    countSeconds++;
    if(checkPress['d'] || checkPress['arrowright']){
        string='right';
    }
    if(checkPress['a'] || checkPress['arrowleft']){
        string='left';
    }
    square.style.backgroundImage=`url('${string}${1*(countSeconds%10>4)}.png')`

    isOnTheGround=false;
    const squareDummy=makeDummy(square);
    if(squareDummy.top==limY){
        isOnTheGround=true;
        // console.log('podea');
    }
    obstacles.forEach(function(obstacle, j){
        const obstacleDummy=makeDummy(obstacle);
        if(squareDummy.top==obstacleDummy.top-(squareDummy.height/2+obstacleDummy.height/2)){
            isOnTheGround=true;
        }
        if(checkForObstacle(obstacleDummy, squareDummy, 3)==3){
            if(!obstacle.classList.contains('colected')){
                obstacle.classList.add('colected');
                obstLeft--;
                let displayInnerText=`${obstLeft} targets left`;
                if(obstLeft==1){
                    displayInnerText=`${obstLeft} target left`;
                }else if(obstLeft==0){
                    displayInnerText='You got them all!';
                }
                display.innerHTML=displayInnerText;

            }
        }
        if(checkForObstacle(obstacleDummy, squareDummy, 0)==3){
            // console.log('ba ai intrat in ceva');
            if(!obstacle.classList.contains('red-flag')){
                console.log('coliziuneeee');
                obstacle.classList.add('red-flag');
                noErr++;
                const squareDummy=makeDummy(square);
                const shadow=makeShadow(squareDummy, 'shadow2');
                squareDummy.top=prevY;
                squareDummy.left=prevX;
                const shadow2=makeShadow(squareDummy, 'shadow');
                // clearInterval(gameLoopID);
            }
            if(noErr>0){
                err.classList.remove('hidden');
            }
        }
    })
}
let adjustForJump=0;
let checkJump=0;
let isGravityOn=1;
if(isGravityOn){
    checkPress['s']=checkPress['arrowdown']=true;
    checkPress['w']=checkPress['arrowup']=false;
    square.classList.add('square-gravity');
}
// const generateObstacles=function(noObstacles=noObstaclesRand, typeOfObstacle, limXmax, limXmin=0, limYmax, limYmin=0, limSquare=50, limObst=20)
const gameArea=limX*limY;
const obstArea=obstH*obstW;
const precentage=8;
let noObst=0;
let noErr=0;
let countSeconds=0;
let string='left';
noObst=parseInt((gameArea/obstArea)*precentage/100);
console.log(noObst);
generateObstacles(noObst, 'obstacle', limX, 0, limY, 0, 50, 40);
let obstacles=document.querySelectorAll('.obstacle');
let obstLeft=noObst;
display.innerHTML=`${obstLeft} targets left`;


let gameLoopInterval=40;
let gameLoopID=setInterval(gameLoop, gameLoopInterval);
// clearInterval(gameLoopID);


btnReadMe.addEventListener('click', function(){
    btnReadMe.classList.toggle('btn-inverted');
    message.classList.toggle('hidden');
})
btnReset.addEventListener('click', function(){
    btnReadMe.classList.remove('btn-inverted');
    message.classList.add('hidden');
    clearInterval(gameLoopID);

    moveX = parseInt(limX/2);
    moveY = limY;


    setTimeout(function(){
        square.classList.add('square-teleport');
    }, 10);
    setTimeout(function(){
        moveSquare(moveX, moveY);
    }, 30);
    setTimeout(function(){
        square.classList.remove('square-teleport');
    }, 50);

    resertScreen('obstacle');
    resertScreen('shadow2');
    resertScreen('shadow');
    generateObstacles(noObst, 'obstacle', limX, 0, limY, 0, 50, 60);
    obstacles=document.querySelectorAll('.obstacle');
    obstLeft=noObst;
    noErr=0;
    countSeconds=0;
    string='left';
    err.classList.add('hidden');
    display.innerHTML=`${obstLeft} targets left`;
    // console.log(getComputedStyle(square).left)
    gameLoopID=setInterval(gameLoop, gameLoopInterval)
})
