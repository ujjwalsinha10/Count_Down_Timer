
let input_Value=0;
let current_interval;

let input=document.querySelector("input");
input.addEventListener("input", validateForm);

function enableButton(btnName) {
//   console.log(btnName);
  document.getElementById(btnName).removeAttribute("disabled");
}

function disableButton(btnName) {
    // console.log(btnName);
    document.getElementById(btnName).toggleAttribute("disabled");
  }

function validateForm(){
    event.preventDefault();
    input_Value=document.getElementById("timeInput").value;
    // console.log(document.getElementById("timeInput").value);
    if(input_Value>0 && input_Value!==""){
        enableButton("submitButton");
        console.log(Math.floor(input_Value));
        return Math.round(input_Value);
    }
}

function startTimer(){
    // console.log("timer button Clicked");
    document.getElementById('timeInput').value='';
    startCountDown(input_Value);
}

let interval;
let startCountDown=(input_Value)=>{
    disableButton("submitButton");
    enableButton('pauseButton');
    let given_Value=input_Value;
    // console.log(given_Value);
    let curr_PBValue=fetch_Current_progressBar_value();
        interval=setInterval(() => {
        current_interval-=interval;
        input_Value=input_Value-1;
        // console.log(input_Value);
        current_Timer_Value(input_Value);
        changeTimerColor(input_Value);
        let val=update_PB_Value(given_Value);
        // console.log("Val:",val);
        if(input_Value==0){
            stopCountDown(interval);
            disableButton('pauseButton');
            let classes=document.getElementById('progressBar1').classList;
            classes.remove('bg-danger');
            document.getElementById('progressBar1').setAttribute('class',classes);
        }
    }, 1000);
}

let stopCountDown=(interval)=>{
    clearInterval(interval)
}
let current_Timer_Value=(currentValue)=>{
    document.getElementById('timeValue').innerHTML=currentValue;
}

let changeTimerColor=(input_Value)=>{
    if(input_Value<6){
        document.getElementById("timeValue").style.color="red";
        let existing_Class=document.getElementById('progressBar1').getAttribute('class');
        // console.log("?????",document.getElementById('progressBar1').hasAttribute('bg-danger'));
        if(!document.getElementById('progressBar1').hasAttribute('bg-danger')){
            document.getElementById('progressBar1').setAttribute('class',existing_Class+' bg-danger');
        }
        // console.log(document.getElementById('progressBar1').getAttribute('class'));
    }
}
let is_paused=false;
let current_Time_Value;
let pauseTimer=()=>{
    console.log("pauseClicked");
    if(!is_paused){
        is_paused=true;
        clearInterval(interval);
        current_Time_Value=document.getElementById('timeValue').innerText;
        console.log('current_Time_Value',current_Time_Value);
        disableButton('pauseButton');
        enableButton('resumeButton');
    }
}

let resumeTimer=()=>{
    if(is_paused){
        is_paused=false;
        disableButton('submitButton');
        disableButton('resumeButton');
        console.log('Resume Clicked');
        startCountDown(current_Time_Value);
    }
}

let fetch_Current_progressBar_value=()=>{
    let currentPBValue= document.getElementById('progressBar1').style.getPropertyValue('width');
    //process the value
    let index=currentPBValue.lastIndexOf('%');
    let slicedValue=parseInt(currentPBValue.slice(0,index));
    return slicedValue;
}

let update_PB_Value=(input_Value)=>{
    let now_Value=document.getElementById('timeValue').innerText;
    // console.log("IP"+input_Value, "NV"+now_Value);
    let pBValue=Math.floor(((now_Value)/input_Value)*100);
    document.getElementById('progressBar1').setAttribute('style', 'width: '+pBValue+'%');
    return pBValue;
}


// Prevents form to refresh after submission
let form=document.getElementById('form-user');
function submitForm(event){
    event.preventDefault();
}
form.addEventListener('submit', submitForm);

function check(){
    let checkBox_value=document.getElementById('inlineCheckbox1');
    if(checkBox_value.checked){
        document.getElementById('prg').style.display="";
    }else{
        document.getElementById('prg').style.display="none";
    }
}