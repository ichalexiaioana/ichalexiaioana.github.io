import {container} from './variables.js';

const checkForObstacle=function(obstacle, square, extraPadding=0){
    let cnt=0;


    if(square.left>obstacle.left-(obstacle.width/2+square.width/2+extraPadding) && 
    square.left<obstacle.left+(obstacle.width/2+square.width/2+extraPadding)){cnt+=2;} //pe coloana
    if(square.top>obstacle.top-(obstacle.height/2+square.height/2+extraPadding) && 
    square.top<obstacle.top+(obstacle.height/2+square.height/2+extraPadding)){cnt+=1;} //pe linie

    if(cnt==3){
        // console.log('vere esti in ceva', extraPadding);
        // daca esti lipit de obstacol NU o sa zica ca esti in el
        // daca vrei sa ia in considerare cand sunt overlapped ori pui extraPadding=0.1 sau pui egaluri la ineg (nu recomand asta lol)
        // console.log(obstacle, square, cnt, extraPadding, "***", square);
    }
    // console.log(cnt);
    return cnt;
}


export {checkForObstacle};
