import { container, square, distOnKey, makeDummy, makeShadow, limX, limY, upMomentum } from "./variables.js";
import { checkForObstacle } from "./checkForObstacle.js";

//stiu ca am apasat pe sus sau W


const gravity=function(distX, distY, checkPress){
    const onScreenSquareDummy=makeDummy(square);
    let limitX=onScreenSquareDummy.left+distX;//acolo ma duc
    let limitY=onScreenSquareDummy.top+distY; //acolo ma duc
    const nextSquareDummyX=makeDummy(square);
    const nextSquareDummyY=makeDummy(square);
    const nextSquareDummy=makeDummy(square);
    const divideNext=2;
    nextSquareDummyY.top+=parseInt(distY/(divideNext));
    nextSquareDummyX.left+=parseInt(distX/divideNext);

    nextSquareDummy.top+=parseInt(distY/(divideNext));
    nextSquareDummy.left+=parseInt(distX/divideNext);

    const obstacles=document.querySelectorAll('.obstacle');
    obstacles.forEach(function(obstacle, j){
        let checkAroundX=false;
        let checkAroundY=false;
        let limitVal=0;
        const obstacleDummy=makeDummy(obstacle);
        const pozHere=checkForObstacle(onScreenSquareDummy, obstacleDummy, 0);
        const pozAround=checkForObstacle(onScreenSquareDummy, obstacleDummy, 100);
        // const futureX
        if(pozHere==1 && pozAround==3){
            // console.log('esti langa ceva pe acc linie', obstacle, square);
            // console.log('esti langa ceva pe acc linie');
            checkAroundX=true;
        }
        if(pozHere==2 && pozAround==3){
            // console.log('esti langa ceva pe acc coloana', obstacle, square);
            // console.log('esti langa ceva pe acc coloana');
            checkAroundY=true;
        }
        let nextX=false;
        let nextY=false;
        if(checkForObstacle(nextSquareDummyX, obstacleDummy, 0)==3){
            nextX=true;
        }
        if(checkForObstacle(nextSquareDummyY, obstacleDummy, 0)==3){
            nextY=true;
        }
        if(checkForObstacle(nextSquareDummy, obstacleDummy, 0)==3 && !nextY && !nextX){
            nextX=nextY=true;
            // console.log('aloo');
        }
        if((nextX && nextY)){
            if(Math.abs(onScreenSquareDummy.top-obstacleDummy.top)/upMomentum>=Math.abs(onScreenSquareDummy.left-obstacleDummy.left)){//ii ia mai mult pe axa Y decat pe axa X
                nextX=false;
                // checkAroundY=false;
            }else{
                nextY=false;
                // checkAroundX=false;
            }
        }
        if(pozHere==3){
            // nextY=nextX=false;
            if(Math.abs(onScreenSquareDummy.top-obstacleDummy.top)>=Math.abs(onScreenSquareDummy.left-obstacleDummy.left)){
                checkAroundY=true;
            }else{
                checkAroundX=true;
            }
            // console.log(obstacle, checkAroundX, checkAroundY, nextX, nextY)
        }
        checkAroundX=(checkAroundX || nextX);
        checkAroundY=(checkAroundY || nextY);
        if(checkAroundX){//trebe sa restrictionez limitX
            if(onScreenSquareDummy.left>obstacleDummy.left){
                // console.log('esti la dreapta obstacolului', obstacle);
            }else{
                // console.log('esti la stanga obstacolului', obstacle);
            }
            if((checkPress['a'] || checkPress['arrowleft'])){
                // console.log('te duci in stanga vere');
                if(onScreenSquareDummy.left>obstacleDummy.left){
                    // console.log('din dreapta vii spre', obstacle);
                    limitVal=obstacleDummy.left+(obstacleDummy.width/2+onScreenSquareDummy.width/2);
                    limitX=Math.max(limitX, limitVal);
                }
            }else if((checkPress['d'] || checkPress['arrowright'])){
                // console.log('te duci in dreapta vere');
                if(onScreenSquareDummy.left<=obstacleDummy.left){
                    // console.log('din stanga vii spre', obstacle);
                    limitVal=obstacleDummy.left-(obstacleDummy.width/2+onScreenSquareDummy.width/2);
                    limitX=Math.min(limitX, limitVal);
                }
            }else{
                // console.log('esti ok pe axa X');
            }
        }
        if(checkAroundY){//trebe sa restrictionez limitY
            if(onScreenSquareDummy.top>obstacleDummy.top){
                // console.log('esti dedesubtul obstacolului', obstacle);
            }else{
                // console.log('esti deasupra obstacolului', obstacle);
            }
            if((checkPress['w'] || checkPress['arrowup'])){
                // console.log('te duci in jos vere');
                if(onScreenSquareDummy.top>obstacleDummy.top){
                    // console.log('de jos vii spre', obstacle);
                    limitVal=obstacleDummy.top+(obstacleDummy.height/2+onScreenSquareDummy.height/2);
                    limitY=Math.max(limitY, limitVal);
                }
            }else if((checkPress['s'] || checkPress['arrowdown'])){
                // console.log('te duci in sus vere');
                if(onScreenSquareDummy.top<=obstacleDummy.top){
                    // console.log('de sus vii spre', obstacle);
                    limitVal=obstacleDummy.top-(obstacleDummy.height/2+onScreenSquareDummy.height/2);
                    limitY=Math.min(limitY, limitVal);
                }
            }else{
                // console.log('esti ok pe axa Y');
            }
        }
    })
    return {limitX, limitY};
}

export {gravity};

