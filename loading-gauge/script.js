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
    console.log(percentage, typeof(percentage));
    percentageHTML.innerHTML =  `${percentage}%`;
    let degToROtate = percentage / 100 * 240;
    // degToROtate = 180;
    console.log(degToROtate);

    var rotateMask1 = document.createElement("style");
    rotateMask1.innerHTML=`
        .rotate-mask-1{
            transform: rotate(${degToROtate}deg);
        }
    `;
    head.appendChild(rotateMask1);
    mask1.classList.add("rotate-mask-1");

    var rotateRoundCorner = document.createElement("style");
    rotateRoundCorner.innerHTML=`
        .rotate-round-corner{
            transform: rotate(${degToROtate}deg);
        }
    `;
    head.appendChild(rotateRoundCorner);
    roundCorner.classList.add("rotate-round-corner")

    var rotateMask2 = document.createElement("style");
    if (degToROtate>120 && degToROtate<=240){
        rotateMask2.innerHTML=`
        .rotate-mask-2{
            transform: rotate(${degToROtate-120}deg);
        }
    `;
    }else{
        rotateMask2.innerHTML=`
        .rotate-mask-2{
            transform: rotate(${0}deg);
        }
    `;
    }
    head.appendChild(rotateMask2);
    mask2.classList.add("rotate-mask-2");

})