const button = document.getElementById("click-button");
const input = document.getElementById("percentage-pick");
const head = document.getElementsByTagName("head")[0];

const percentageHTML = document.getElementById("text-container")


const mask1 = document.getElementById("rotating-gauge-mask-1");
const mask2 = document.getElementById("rotating-gauge-mask-2");
const roundCorner = document.getElementById("rotating-round-corner");

button.addEventListener("click", function(evt){
    const value = input.value;
    let percentage = parseInt(value) || 0;
    percentage = ( (percentage % 100) + 100 * (percentage==100))
    percentageHTML.innerHTML =  `${percentage}%`;
    let degToRotate = percentage / 100 * 240;
    // degToROtate = 180;

    // ---------------------------------
    // applying the rotation on the first mask
    var rotateMask1 = document.createElement("style");
    rotateMask1.innerHTML=`
        .rotate-mask-1{
            transform: rotate(${degToRotate}deg);
        }
    `;
    head.appendChild(rotateMask1);
    mask1.classList.add("rotate-mask-1");
    // ---------------------------------

    // ---------------------------------
    // applying the rotation on the rounded corner
    var rotateRoundCorner = document.createElement("style");
    rotateRoundCorner.innerHTML=`
        .rotate-round-corner{
            transform: rotate(${degToRotate}deg);
        }
    `;
    head.appendChild(rotateRoundCorner);
    roundCorner.classList.add("rotate-round-corner");
    // ---------------------------------


    // ---------------------------------
    // applying the rotation on the second mask
    var rotateMask2 = document.createElement("style");
    if (degToRotate>120 && degToRotate<=240){
        // the 2nd mask doesnt need to rotate if the gauge doesnt go more than halway
        rotateMask2.innerHTML=`
        .rotate-mask-2{
            transform: rotate(${degToRotate-120}deg);
        }
    `;
    }else{
        //this is here just for testing
        rotateMask2.innerHTML=`
        .rotate-mask-2{
            transform: rotate(${0}deg);
        }
    `;
    }
    head.appendChild(rotateMask2);
    mask2.classList.add("rotate-mask-2");
    // ---------------------------------

})
