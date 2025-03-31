
//fetching data
let dataObject;
let number;
async function fetchData() {
    let data = await fetch('data.json');
    let info = await data.json();
    dataObject = info;
    number = dataObject.length;
    for(let i = 0;i<number;i++){
        let icon = info[i].logo;
        let content = info[i].description;
        let heading = info[i].name;
        let state = info[i].isActive;
        document.querySelector(`#extension-icon-${i + 1}`).setAttribute('src',`${icon}`);
        document.querySelector(`#extension-description-${i + 1}`).innerHTML = `${content}`;
        document.querySelector(`#extension-heading-${i + 1}`).innerHTML = `${heading}`;
        stateChecker(state,i + 1);
    }

}

fetchData();

//Chenking state
function stateChecker(state,pos){
    let slider = document.querySelector(`#extension-slider-${pos}`);
    let toggleButton = document.querySelector(`#extension-toggle-button-${pos}`);
    if(state){
        toggleButton.classList.toggle('toggle-button--active');
        slider.classList.toggle('slider--active');
    }
    else{
        toggleButton.classList.toggle('toggle-button--inactive');
        toggleButton.classList.toggle('toggle-button--inactive--dark')
        slider.classList.toggle('slider--inactive');
    }
}

//toggling  
let toggleButton = document.querySelectorAll('.toggle-button');
let removeButton = document.querySelectorAll('.remove-button');
let extension = document.querySelectorAll('.extension');
let removedExtensions = [];
for(let i = 0;i<toggleButton.length;i++){
    toggleButton[i].addEventListener('click',function(e){
        let slider = toggleButton[i].querySelector('.slider');

        slider.classList.toggle('slider--active');
        slider.classList.toggle('slider--inactive');
        toggleButton[i].classList.toggle('toggle-button--active');
        toggleButton[i].classList.toggle('toggle-button--inactive');
        toggleButton[i].classList.toggle('toggle-button--inactive--dark');
        
        if(dataObject[i].isActive === true){
            dataObject[i].isActive = false;
        }
        else{
            dataObject[i].isActive = true;
        }
        console.log(e.target);
        console.log(dataObject[i].isActive);

    })

    // removing
    removeButton[i].addEventListener('click',function(e){
        e.target.parentNode.parentNode.classList.toggle('extension-remove');
        removedExtensions.push(e.target.parentNode.parentNode);
    })
}

// theme change
let isDark = true;
let themeChange = document.querySelector('.theme-change-button');
let menuButton = document.querySelectorAll('.menu-button');
themeChange.addEventListener('click',function(){
    let navBar = document.querySelector('.nav-bar');
    let themeChangeIcon = document.querySelector('.theme-change-icon');
    let bodyColor = document.querySelector('.background');
    let menuBar = document.querySelector('.menu-bar');

    for(let i = 0;i<toggleButton.length;i++){
        extension[i].classList.toggle('extension--dark');
        extension[i].classList.toggle('extension--light');
    }
    for(let i=0;i<menuButton.length;i++){
        menuButton[i].classList.toggle('menu-button--dark');
        menuButton[i].classList.toggle('menu-button--light');
    }
    navBar.classList.toggle('nav-bar--dark');
    navBar.classList.toggle('nav-bar--light');
    bodyColor.classList.toggle('background--dark');
    bodyColor.classList.toggle('background--light');
    menuBar.classList.toggle('menu-bar--dark');
    menuBar.classList.toggle('menu-bar--light');
    
    if(isDark){
        themeChangeIcon.setAttribute('src','assets/images/icon-moon.svg');
        isDark = false;
    }
    else{
        themeChangeIcon.setAttribute('src','assets/images/icon-sun.svg');
        isDark = true;
    }
})

// active extensions
let activeButton = document.querySelector('.active-button');
activeButton.addEventListener('click',function(e){
    e.preventDefault();
    removeClass();

    activeButton.classList.add('menu-button--active');
    inactiveButton.classList.remove('menu-button--active');
    allButton.classList.remove('menu-button--active');
    
    for(let i=0;i<number;i++){
        if(dataObject[i].isActive === false){
            extension[i].classList.add('extension-remove');
        }
    }
    
})

//inactive extensions
let inactiveButton = document.querySelector('.inactive-button');
inactiveButton.addEventListener('click',function(e){
    e.preventDefault();
    removeClass();

    activeButton.classList.remove('menu-button--active');
    inactiveButton.classList.add('menu-button--active');
    allButton.classList.remove('menu-button--active');

    for(let i=0;i<number;i++){
        if(dataObject[i].isActive === true){
            extension[i].classList.add('extension-remove');
        }
    }
})

let allButton = document.querySelector('.all-button');
allButton.addEventListener('click',function(e){
    e.preventDefault();
    removeClass();

    activeButton.classList.remove('menu-button--active');
    inactiveButton.classList.remove('menu-button--active');
    allButton.classList.add('menu-button--active');})

function removeClass(){
    for(let i=0;i<number;i++){
        if(!removedExtensions.includes(extension[i])){
            extension[i].classList.remove('extension-remove');
        }
    }
}

