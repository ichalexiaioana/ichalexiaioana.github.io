const screens=document.querySelectorAll('.screen');
const chooseInsectBtns=document.querySelectorAll('.choose-insect-btn');
const startBtn=document.getElementById('start-btn');
const gameContainer=document.querySelector('.insect-container');
const timeEl=document.getElementById('time');
const scoreEl=document.getElementById('score');
const messageEl=document.getElementById('message');

let seconds=0;
let score=0;
let selectedInsect={};

startBtn.addEventListener('click', function(){
    screens[0].classList.add('up');
})

const increaseTime=function(){
    let m=Math.floor(seconds/60);
    let s=seconds%60;
    m=m<10 ? `0${m}` : m;
    s=s<10 ? `0${s}` : s;
    timeEl.innerHTML=`Time  ${m}:${s}`;
    seconds++;
}

const startGame=function(){
    setInterval(increaseTime, 1000);
}

const addInsects=function(){
    setTimeout(createInsect, 1000);
    setTimeout(createInsect, 1500);
}

const catchInsect=function(){
    increaseScore();
    this.classList.add('caught');
    setTimeout(function(){
        this.remove();
    }, 2000);
    addInsects();
}

const increaseScore=function(){
    score++;
    if(score>=20){
        messageEl.classList.add('visible');
    }
    scoreEl.innerHTML=`Score:  ${score}`;
}

const createInsect=function(){
    const insect=document.createElement('div');
    insect.classList.add('insect');
    const topRand=Math.floor(Math.random()*100);
    const leftRand=Math.floor(Math.random()*100);
    const degRand=Math.floor(Math.random()*360);
    insect.style.top=`${topRand}%`;
    insect.style.left=`${leftRand}%`;
    insect.innerHTML=`
        <img src="${selectedInsect.src}" alt="${selectedInsect.alt}" style="transform: rotate(${degRand}deg)"/>
    `

    insect.addEventListener('click', catchInsect);

    gameContainer.appendChild(insect);
}

chooseInsectBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
        screens[1].classList.add('up');
        const img=btn.querySelector('img');
        const src=img.getAttribute('src');
        const alt=img.getAttribute('alt');
        selectedInsect={src, alt};
        setTimeout(createInsect, 1000);
        startGame();
    })
})