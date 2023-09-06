import {container, square, obstW, obstH, makeDummy, makeShadow, limX, limY} from './variables.js';
import { checkForObstacle } from './checkForObstacle.js';

const noObstaclesRand=Math.floor(Math.random()*30)+1;


const generateObstacles=function(noObstacles=noObstaclesRand, typeOfObstacle, limXmax, limXmin=0, limYmax, limYmin=0, limSquare=50, limObst=20){
    // console.log(`${noObstacles} obstacles`);
    const squareDummy=makeDummy(square);
    squareDummy.top=limY;
    squareDummy.left=parseInt(limX/2);

    // const shadow=makeShadow(squareDummy, 'shadow3');
    let i=0;
    while(i<noObstacles){
        const topVal=Math.floor(Math.random()*(limYmax-limYmin+1))+limYmin;
        const leftVal=Math.floor(Math.random()*(limXmax-limXmin+1))+limXmin;
        const obstacleDummy={
            top: topVal,
            left: leftVal,
            height: obstH,
            width: obstW
        }
        if(checkForObstacle(obstacleDummy, squareDummy, limSquare)==3){
            // console.log('pus prost fata de ROSU');
        }else{
            const obsts=document.querySelectorAll(`.${typeOfObstacle}`);
            // console.log(i, 'heyyy', obsts);
            let ok=1;
            let j=0;
            while(j<obsts.length && ok==1){
                const obstsDummy=makeDummy(obsts[j])
                if(checkForObstacle(obstacleDummy, obstsDummy, limObst)==3){
                    ok=0;
                }
                j++;
            }
            if(ok==1){
                const obstacle=document.createElement('div');
                obstacle.classList.add(`${typeOfObstacle}`);
                
                obstacle.style.top=`${topVal}px`;
                obstacle.style.left=`${leftVal}px`;
                container.appendChild(obstacle);
                i++;
            }else{
                // console.log('pus prost fata de ALBASTRU');
            }
        }
    }
}

export {generateObstacles};
// createObstacles();
