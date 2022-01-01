
/******websocket connection*******/

window.onload = ()=> {
    const ws = new WebSocket (`ws://${location.hostname}:3000/u/devices`); //mind the case-sensitivity
    console.log("websocket connection established!");

    //light1 1
    const light1 = document.querySelectorAll('#light1 .control p');
    const light1Img = document.querySelector('#light1 .row2 img');
    const statusL1 = document.querySelector('#light1 .row1 .column2 em');
    var L1status = 0
    ,   L2status = 0;
    light1[0].addEventListener('click', ()=> {
        L1status = 1;
        sendToServerL1();   //sending it to ws server
    });
    light1[1].addEventListener('click', ()=> {
        L1status = 0;
        sendToServerL1();   //sending it to server
    });
    //light 2
    var light2 = document.querySelectorAll('#light2 .control p');
    var light2Img = document.querySelector('#light2 .row2 img');
    var statusL2 = document.querySelector('#light2 .row1 .column2 em');
    light2[0].addEventListener('click', ()=> { 
        L2status = 1;
        sendToServerL2();
    });
    light2[1].addEventListener('click', ()=> {
        L2status = 0;
        sendToServerL2();
    });

    //sending light1 light2 status to ws server
    let sendToServerL1 = function() {
        //sending as JSON data, be very careful with the syntax
        //var doesn't define any datatype for arduino c, so define it yourself when sending it
        var sendingData = `{"light1": ${L1status}}`;
        console.log(sendingData);
        ws.send(sendingData);
    }
    let sendToServerL2 = function() {
        var sendingData = `{"light2": ${L2status}}`;
        console.log(sendingData);
        ws.send(sendingData);
    }
    ws.onmessage = (message)=> {
        var fullData = message.data;
        // console.log(fullData);
        var extractData = JSON.parse(fullData);
        console.log(extractData);

        //for light1
        if(extractData.light1===1) {
            light1[0].style.opacity = '0.3';
            light1[1].style.opacity = '1';
            light1Img.src = '../images/bulbOn.png';
            statusL1.innerHTML = 'On';
        }
        if(extractData.light1===0) {
            light1[1].style.opacity = '0.3';
            light1[0].style.opacity = '1';
            light1Img.src = '../images/bulbOff.png';
            statusL1.innerHTML = 'Off';
        }
        //for light2
        if(extractData.light2===1) {
            light2[0].style.opacity = '0.3';
            light2[1].style.opacity = '1';
            light2Img.src = '../images/bulbOn.png';
            statusL2.innerHTML = 'On';
        }
        if(extractData.light2===0) {
            light2[0].style.opacity = '1';
            light2[1].style.opacity = '0.3';
            light2Img.src = '../images/bulbOff.png';
            statusL2.innerHTML = 'Off';
        }
        //for ldr
        var ldrReading = document.querySelector('#ldrIntensity .row2 meter');
        var statusLdr = document.querySelector('#ldrIntensity .row1 .column2 em');
        var valueSLdr = document.querySelector('#ldrIntensity .row2 .control p');   //give same value
        if(extractData.ldr){
            ldrReading.value = extractData.ldr;
            statusLdr.innerHTML = extractData.ldr; + ' &#9788;';
            valueSLdr.innerHTML = extractData.ldr; + ' &#9788;';
        }
        //for temp, hum
        var statusTemp = document.querySelector('#temperature .row1 .column2 em');
        var valueSTemp = document.querySelector('#temperature .row2 .control p');   //give same value
        var tempReading = document.querySelector('#temperature .row2 meter');
        // valueSTemp.innerHTML = tempReading.value + ' &#8451;';
        // statusTemp.innerHTML = tempReading.value + ' &#8451;';
        var statusHum = document.querySelector('#humidity .row1 .column2 em');
        var valueSHum = document.querySelector('#humidity .row2 .control p');   //give same value
        var humReading = document.querySelector('#humidity .row2 meter');
        // valueSHum.innerHTML = humReading.value + ' &percnt;';
        // statusHum.innerHTML = humReading.value + ' &percnt;';
        if(extractData.temp) {
           tempReading.value = extractData.temp;
           statusTemp.innerHTML = extractData.temp + ' &#8451;';
           valueSTemp.innerHTML = extractData.temp + ' &#8451;';
 
           humReading.value = extractData.hum;
           statusHum.innerHTML = extractData.hum + ' &percnt;';
           valueSHum.innerHTML = extractData.hum + ' &percnt;';
        }
    }
}