import {container} from './variables.js';

const handleObstacles=function(obstacles){
    obstacles.forEach(function(obstacle){
        if(obstacle.classList.contains('hidden')){
            container.removeChild(obstacle);
            obstacle.remove();
        }
    });
    // console.log(obstacles);
}
export {handleObstacles};