import {container} from './variables.js';

// const obstacles=document.querySelectorAll('.obstacle');

// const extraPadding=50;
// console.log(obstacles);

const checkForObstacle=function(obstacle, square, extraPadding=0){
    // const widthSquare=parseInt(getComputedStyle(square).width.slice(0, -2));
    // const heightSquare=parseInt(getComputedStyle(square).height.slice(0, -2));
    // const widthObstacle=obstacle.width;
    // const heightObstacle=obstacle.height;
    // // console.log(widthObstacle, heightObstacle, widthSquare, heightSquare, "+++");
    // const topSquare=parseInt(getComputedStyle(square).top.slice(0, -2));
    // const leftSquare=parseInt(getComputedStyle(square).left.slice(0, -2));
    // const topObstacle=obstacle.top;
    // const leftObstacle=obstacle.left;
    // console.log(topObstacle, leftObstacle, topSquare, leftSquare, "---");
    let cnt=0;
    // if(square.left<=obstacle.left-(obstacle.width/2+square.width/2+extraPadding)) {cnt+=1;} //square is comming from right
    // if(square.left>=obstacle.left+(obstacle.width/2+square.width/2+extraPadding)) {cnt+=2;} //square is comming from left
    // if(square.top<=obstacle.top-(obstacle.height/2+square.height/2+extraPadding)) {cnt+=10;}//square is comming from bottom
    // if(square.top>=obstacle.top+(obstacle.height/2+square.height/2+extraPadding)) {cnt+=20;}//square is comming from top

    if(square.left>obstacle.left-(obstacle.width/2+square.width/2+extraPadding) && 
    square.left<obstacle.left+(obstacle.width/2+square.width/2+extraPadding)){cnt+=2;} //pe coloana
    if(square.top>obstacle.top-(obstacle.height/2+square.height/2+extraPadding) && 
    square.top<obstacle.top+(obstacle.height/2+square.height/2+extraPadding)){cnt+=1;} //pe linie
    // if(leftSquare<=leftObstacle-(widthObstacle/2+widthSquare/2+extraPadding) || leftSquare>=leftObstacle+(widthObstacle/2+widthSquare/2+extraPadding)){cnt+=2;}
    // if(topSquare<=topObstacle-(heightObstacle/2+heightSquare/2+extraPadding) || topSquare>=topObstacle+(heightObstacle/2+heightSquare/2+extraPadding)){cnt++;}
    // console.log(cnt);
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
