const main = document.getElementById("main");
const addUserBtn = document.getElementById("adduser");
const doubleBtn = document.getElementById("double");
const showMillioanireBtn = document.getElementById("showmillioanire");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate");

getRandomData();
getRandomData();
getRandomData();

let data = [];

// fetch data from fake API

async function getRandomData(){
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();

    const user= data.results[0];

    const newUser = {
        name : `${user.name.first} ${user.name.last}`,
        money : Math.floor(Math.random()*1000000),
    };

    addData(newUser);
}

// double Money .map Method

function doubleMoney(){
    data = data.map((user)=>{
        return {...user,money: user.money * 2};
    });

    updatedDOM();
}

// showmillionaires filter Method

function showMillioanires(){
    data = data.filter((user)=> user.money > 1000000);

    updatedDOM();
}

// sort by Richest sort Method

function sortByRichest(){
    data.sort((a,b)=> b.money - a.money);

    updatedDOM();
}

// add new object to data 
 
function addData(obj) {
    data.push(obj);

    updatedDOM();
}

// Calculate Wealth Reduce Method

function calculateWealth(){
    const wealth = data.reduce((acc,user)=>(acc += user.money), 0);
    
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}`;
    main.appendChild(wealthEl);
}

// updatedDOM

function updatedDOM(provideData = data){
    main.innerHTML='<h2><strong>Person</strong> Wealth</h2>';


    provideData.forEach((item)=>{
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</Strong> ${formatMoney(item.money)}`;
        main.appendChild(element);

    });
}

// format number as Money

function formatMoney(numbers){
   return "$" + numbers.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// event listener

addUserBtn.addEventListener('click',getRandomData);
doubleBtn.addEventListener('click',doubleMoney);
showMillioanireBtn.addEventListener('click',showMillioanires);
sortBtn.addEventListener('click',sortByRichest);
calculateWealthBtn.addEventListener('click',calculateWealth);