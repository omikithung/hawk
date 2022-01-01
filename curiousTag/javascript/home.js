
var slide = document.querySelectorAll('.slide');
var container = document.querySelector('.content');
var current = 0;

//slide function
var interval;
function startSlider() {
    //setInterval(function, time)
    interval = setInterval(()=>{
        for(var i=0; i<slide.length; i++) {
            slide[i].style.display = "none";
        }
        current = (current+1)%slide.length;
        slide[current].style.display = 'flex'; 
        
    }, 2000)
}
function stopSlider(){
    clearInterval(interval);
} 
container.addEventListener("mouseenter", ()=> {
    stopSlider();
});
container.addEventListener("mouseleave", ()=> {
    startSlider();
});
startSlider();

//menu control 
const c = document.querySelector('.c');
const signin = document.querySelector('#signin');
const signup = document.querySelector('#signup');
const menu  = document.querySelector('.header .menu');
const navi = document.querySelector('.header .navi');
const projectTitle = document.querySelector('.projectTitle');
const welcomeMessage = document.querySelector('.welcomeMessage');
menu.addEventListener('click', ()=> {
    if(signup) {
        if(signup.style.display === 'none') {
            signup.style.display = 'block';
            navi.style.display = 'none';
        }
        else {
            signup.style.display = 'none';
            navi.style.display = 'flex';
        }
    }
    else if(signin) {
        if(signin.style.display === 'none') {
            signin.style.display = 'block';
            navi.style.display = 'none';
        }
        else {
            signin.style.display = 'none';
            navi.style.display = 'flex';
        }
    }
    else if(c) {
        if(c.style.display === 'none') {
            c.style.display = 'flex';
            navi.style.display = 'none';
        }
        else {
            c.style.display = 'none';
            navi.style.display = 'flex';
        }
    }
    else if(welcomeMessage) {
        if(welcomeMessage.style.display === 'none') {
            welcomeMessage.style.display = 'flex';
            navi.style.display = 'none';
        }
        else {
            welcomeMessage.style.display = 'none';
            navi.style.display = 'flex';
        }
    }
    else if(projectTitle) {
        if(projectTitle.style.display==='none') {
            projectTitle.style.display = 'flex';
            navi.style.display = 'none';   
        }
        else {
            projectTitle.style.display = 'none';
            navi.style.display = 'flex';
        }
    }
});