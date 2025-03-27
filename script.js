//const url="https://v6.exchangerate-api.com/v6/99a0aec004527b1a155623da/latest/INR";
const url="https://v6.exchangerate-api.com/v6/99a0aec004527b1a155623da/latest";

const dropdowns=document.querySelectorAll(".dropdown select"); 
const btn=document.querySelector("button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
const arrow=document.querySelector(".fa-solid.fa-arrow-right-arrow-left");

for(let select of dropdowns){
    for (currcode in countryList){
        let newopt=document.createElement("option");
        newopt.innerText=currcode;
        newopt.value=currcode;
        if(select.name==="from" && currcode==="USD"){
            newopt.selected="selected";
        }else if(select.name==="to" && currcode==="USD"){
            newopt.selected="selected";
        }
        select.append(newopt);
    }
    select.addEventListener("change",(evt)=>{
    updateFlag(evt.target)
    });
}
const updateFlag=(element)=>{
    let currcode=element.value;
    let countryCode=countryList[currcode];
    let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
}




btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval===""||amtval<1){
        amtval=1;
        amount.value="1";
    }
    console.log(fromcurr.value,tocurr.value)
    const URL=`${url}/${fromcurr.value}`
    let rate=async ()=>{
        let response=await fetch(URL);
        console.log(response.status);
        let data=await response.json();
        return(data.conversion_rates[tocurr.value]);
    }
    rate().then((exchangeRate) => {
        if (exchangeRate) {
            let convertedAmount = amtval * exchangeRate;
            msg.innerText=`${amtval} ${fromcurr.value} = ${convertedAmount} ${tocurr.value}`;
        } else {
            console.log("Could not fetch exchange rate.");
        }
    });
});


arrow.addEventListener("click",()=>{
    let tempVal=fromcurr.value;
    fromcurr.value=tocurr.value;
    tocurr.value=tempVal;
    updateFlag(fromcurr);
    updateFlag(tocurr);
});