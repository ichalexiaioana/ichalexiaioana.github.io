import { container, square, distOnKey, makeDummy, makeShadow, limX, limY, upMomentum, downMomentum } from "./variables.js";
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
    if((checkPress['w'] || checkPress['arrowup'])){
        // const sqdm=makeDummy(square);
        // const shadow=makeShadow(sqdm, 'shadow');
        // const shadow1=makeShadow(nextSquareDummy, 'shadow1');
        // const shadow2=makeShadow(nextSquareDummyX, 'shadow2');
        // const shadow3=makeShadow(nextSquareDummyY, 'shadow3');
    }
    obstacles.forEach(function(obstacle, j){
        let checkAroundX=false;
        let checkAroundY=false;
        let limitVal=0;
        const obstacleDummy=makeDummy(obstacle);
        const pozHere=checkForObstacle(onScreenSquareDummy, obstacleDummy, 0);
        const pozAround=checkForObstacle(onScreenSquareDummy, obstacleDummy, 150);
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
        // console.log(obstacle, checkAroundX, checkAroundY, nextX, nextY)
        // console.log(obstacleDummy);
        // for(let i=1; i>=1; i--){
        //     let pretendSquareDummy=onScreenSquareDummy;
        //     if(i==0){pretendSquareDummy=computedSquareDummy;}

        //     if(ok && j==0){
        //         console.log(obstacle, pretendSquareDummy, onScreenSquareDummy, computedSquareDummy, distY, distX, checkPress, '***');
        //         console.log(checkForObstacle(pretendSquareDummy, obstacleDummy, padding), "haha")
        //     }
        //     let newVal=0;
            
        //     if(checkForObstacle(pretendSquareDummy, obstacleDummy, padding)==3){
        //         obstColided++;
        //         const prevSquareXDummy={
        //             top: pretendSquareDummy.top,
        //             left: pretendSquareDummy.left,
        //             height: pretendSquareDummy.height,
        //             width: pretendSquareDummy.width,
        //         }
        //         const prevSquareYDummy={
        //             top: pretendSquareDummy.top,
        //             left: pretendSquareDummy.left,
        //             height: pretendSquareDummy.height,
        //             width: pretendSquareDummy.width,
        //         }
        //         const prevSquareXYDummy={
        //             top: pretendSquareDummy.top,
        //             left: pretendSquareDummy.left,
        //             height: pretendSquareDummy.height,
        //             width: pretendSquareDummy.width,
        //         }
        //         // console.log(prevSquareXYDummy);
        //         prevSquareXYDummy.top-=distY;
        //         prevSquareXYDummy.left-=distX;

        //         prevSquareYDummy.top-=distY;    //daca merg doar pe X
        //         prevSquareXDummy.left-=distX;   //daca merg doar pe Y

        //         if(ok && j==0){
        //             makeShadow(prevSquareXDummy, 'shadow');
        //             makeShadow(prevSquareYDummy, 'shadow3');
        //         }

        //         let restrictionX=false;
        //         let restrictionY=false;
        //         // console.log(limitX, limitY, obstacle);
        //         if(checkForObstacle(prevSquareXDummy, obstacleDummy, padding)==3){
        //             restrictionY=true; //trebuie sa restrictionez miscarea pe Y ws
        //         }
        //         if(checkForObstacle(prevSquareYDummy, obstacleDummy, padding)==3){
        //             restrictionX=true; //trebuie sa restrictionez miscarea pe X ad
        //         }
        //         if((checkPress['w'] || checkPress['arrowup']) && restrictionY){
        //             newVal=obstacleDummy.top+(obstacleDummy.height/2+pretendSquareDummy.height/2);
        //             if(obstColided>1){
        //                 limitY=Math.max(limitY, newVal);
        //             }else{
        //                 limitY=newVal;
        //             }
        //             // console.log('sus', i);
        //         }
        //         if((checkPress['s'] || checkPress['arrowdown']) && restrictionY){
        //             newVal=obstacleDummy.top-(obstacleDummy.height/2+pretendSquareDummy.height/2);
        //             if(obstColided>1){
        //                 limitY=Math.min(limitY, newVal);
        //             }else{
        //                 limitY=newVal;
        //             }
        //             // console.log('jos', i);
        //             // if(i==1){newOnTheGround=true;}
                    
        //         }
        //         if((checkPress['a'] || checkPress['arrowleft']) && restrictionX){
        //             newVal=obstacleDummy.left+(obstacleDummy.width/2+pretendSquareDummy.width/2);
        //             if(obstColided>1){
        //                 limitX=Math.max(limitX, newVal);
        //             }else{
        //                 limitX=newVal;
        //             }
        //             // console.log('stanga', i);
        //         }
        //         if((checkPress['d'] || checkPress['arrowright']) && restrictionX){
        //             newVal=obstacleDummy.left-(obstacleDummy.width/2+pretendSquareDummy.width/2);
        //             if(obstColided>1){
        //                 limitX=Math.min(limitX, newVal);
        //             }else{
        //                 limitX=newVal;
        //             }
        //             // console.log('dreapta', i);
        //         }
        //         if(ok){
        //         console.log('esti in', obstacle, square, i);
        //         console.log(restrictionX, 'ad', restrictionY, 'ws');
        //         console.log(limitX, limitY, 'limite');
        //         }
        //         // console.log(shadow, '------------------------------------------------------');
        //         // console.log(shadow2, '------------------------------------------------------');

        //     }
        // }//for

    })
    // console.log(limitX, limitY, '*****************');
    // console.log('hey')
    // limitX-=distX;
    // limitY-=distY;
    // console.log(newAdjustForJump, '+++');
    return {limitX, limitY};
}

export {gravity};

