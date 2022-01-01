
/****************menu control*****************/

// const menu  = document.querySelector('.header .menu'); //already declared in home.js
const devices = document.querySelector('.devices');
menu.addEventListener('click', ()=> {
    if(devices.style.display === 'none') {
        devices.style.display = 'flex';
        navi.style.display = 'none';
        settingsMenu.style.display = 'none';
    }
    else {
        devices.style.display = 'none';
        navi.style.display = 'flex';
    }
});
// settingsT, settingsMenu are defined in vhome.js
settingsT.addEventListener('click', ()=> {
    if(settingsMenu.style.display === 'flex') {
        settingsMenu.style.display = 'none';
        navi.style.display = 'none';
    }
    else {
        settingsMenu.style.display = 'flex';
        navi.style.display = 'none';
    }
});
const closeT = document.querySelector('.close');
closeT.addEventListener('click', ()=> {
    if(settingsMenu.style.display === 'flex') {
        navi.style.display = 'flex';
        settingsMenu.style.display = 'none';
    }
});


/*********************row control***********************/   
var legitInfo = document.querySelectorAll('.details');
var infoOutInL1 = document.querySelector('#light1 .row1 .column4');
var infoOutInL2 = document.querySelector('#light2 .row1 .column4');
var infoOutInHum = document.querySelector('#humidity .row1 .column4');
var infoOutInTemp = document.querySelector('#temperature .row1 .column4');
var infoOutInLdr = document.querySelector('#ldrIntensity .row1 .column4');
const menuInDevices = document.querySelectorAll('.menuInDevices li');
infoOutInL1.addEventListener('click', ()=> {
    legitInfo[0].style.display='none';
    menuInDevices[0].style.display = 'flex';
});
infoOutInL2.addEventListener('click', ()=> {
    legitInfo[1].style.display='none';
    menuInDevices[1].style.display = 'flex';
});
infoOutInHum.addEventListener('click', ()=> {
    legitInfo[2].style.display='none';
    menuInDevices[2].style.display = 'flex';
});
infoOutInTemp.addEventListener('click', ()=> {
    legitInfo[3].style.display='none';
    menuInDevices[3].style.display = 'flex';
});
infoOutInLdr.addEventListener('click', ()=> {
    legitInfo[4].style.display='none';
    menuInDevices[4].style.display = 'flex';
});
menuInDevices[0].addEventListener('click', ()=> {
    legitInfo[0].style.display='block';
    menuInDevices[0].style.display = 'none';
});
menuInDevices[1].addEventListener('click', ()=> {
    legitInfo[1].style.display='block';
    menuInDevices[1].style.display = 'none';
});
menuInDevices[2].addEventListener('click', ()=> {
    legitInfo[2].style.display='block';
    menuInDevices[2].style.display = 'none';
});
menuInDevices[3].addEventListener('click', ()=> {
    legitInfo[3].style.display='block';
    menuInDevices[3].style.display = 'none';
});
menuInDevices[4].addEventListener('click', ()=> {
    legitInfo[4].style.display='block';
    menuInDevices[4].style.display = 'none';
});
/*  light1 */
const light1TrigR1 = document.querySelector('#light1 .row1');
const light1CtrlR2 = document.querySelector('#light1 .row2');
const light1CtrlR1C3 = document.querySelector('#light1 .row1 .column3'); 
light1TrigR1.addEventListener('click',()=>{
    if(light1CtrlR2.style.display === 'none') {         
        light1CtrlR2.style.display = 'flex';
        light1CtrlR1C3.style.transform = 'rotateX(0)';
    }
    else {
        light1CtrlR2.style.display = 'none';
        light1CtrlR1C3.style.transform = 'rotateX(180deg)';
    }
});
/*  light2 */
const light2TrigR1 = document.querySelector('#light2 .row1');
const light2CtrlR2 = document.querySelector('#light2 .row2');
const light2CtrlR1C3 = document.querySelector('#light2 .row1 .column3'); 
light2TrigR1.addEventListener('click',()=>{
    if(light2CtrlR2.style.display === 'none') {         
        light2CtrlR2.style.display = 'flex';
        light2CtrlR1C3.style.transform = 'rotateX(0)';
    }
    else {
        light2CtrlR2.style.display = 'none';
        light2CtrlR1C3.style.transform = 'rotateX(180deg)';
    }
});
/*  temp */
const tempTrigR1 = document.querySelector('#temperature .row1');
const tempCtrlR2 = document.querySelector('#temperature .row2');
const tempCtrlR1C3 = document.querySelector('#temperature .row1 .column3');
tempTrigR1.addEventListener('click', ()=> {
    if(tempCtrlR2.style.display === 'none') {         
        tempCtrlR2.style.display = 'flex';
        tempCtrlR1C3.style.transform = 'rotateX(0)';
    }
    else {
        tempCtrlR2.style.display = 'none';
        tempCtrlR1C3.style.transform = 'rotateX(180deg)';
    }
});
/*  humidity */
var humTrigR1 = document.querySelector('#humidity .row1');
var humCtrlR2 = document.querySelector('#humidity .row2');
var humCtrlR1C3 = document.querySelector('#humidity .row1 .column3'); 
humTrigR1.addEventListener('click', ()=> {
    if(humCtrlR2.style.display === 'none') {         
        humCtrlR2.style.display = 'flex';
        humCtrlR1C3.style.transform = 'rotateX(0)';
    }
    else {
        humCtrlR2.style.display = 'none';
        humCtrlR1C3.style.transform = 'rotateX(180deg)';
    }
});
/* ldr intensity */
const ldrIntTrigR1 = document.querySelector('#ldrIntensity .row1');
const ldrIntCtrlR2 = document.querySelector('#ldrIntensity .row2');
const ldrIntCtrlR1C3 = document.querySelector('#ldrIntensity .row1 .column3');
ldrIntTrigR1.addEventListener('click', ()=> {
    if(ldrIntCtrlR2.style.display === 'none') {         
        ldrIntCtrlR2.style.display = 'flex';
        ldrIntCtrlR1C3.style.transform = 'rotateX(0)';
    }
    else {
        ldrIntCtrlR2.style.display = 'none';
        ldrIntCtrlR1C3.style.transform = 'rotateX(180deg)';
    }
});