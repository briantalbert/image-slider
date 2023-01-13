function showNextImage(dir) {
    //Hide currently showing image, make next one visible.
    //The parameter "dir" is 1 or -1, depending on which
    //arrow button was pressed.
    const imgList = document.querySelectorAll('.photo');
    imgList.forEach(image => {
        if (image.classList.contains('visible')) {
            image.classList.toggle('visible')
            currImgId = parseInt(image.getAttribute('id'));
            currImgId = (currImgId + dir) % 5;
            if (currImgId == -1) { currImgId = 4}
        }
    });

    document.getElementById(currImgId.toString()).classList.toggle('visible');
    changeDots();
}

function getCurrentPicNumber() {
    const imgList = document.querySelectorAll('.photo');
    imgList.forEach(image => {
        if (image.classList.contains('visible')) {
            currImgId = parseInt(image.getAttribute('id'));
        }
    })
    return currImgId;
}


function displayPic(newNum) {
    //validate input: it must be between 1 and 4
    if (newNum < 1 || newNum > 4) return;
    //calculate distance
    const distance = newNum - getCurrentPicNumber();
    //shift all pics by the distance
    for (let i = 0; i <= 4; i++) {
      let pic = document.getElementById(i.toString());
      let leftCssString = getComputedStyle(pic).getPropertyValue("left");
      let leftCssNum = Number(leftCssString.slice(0, leftCssString.length - 2));
      pic.style.left = leftCssNum - distance * 1000 + "px";
    }
    document.getElementById("dot" + newNum).checked = true;
  }
  





function addArrowEvents() {
    const left = document.querySelector('#left');
    const right = document.querySelector('#right');

    left.addEventListener('click', () => {displayPic((getCurrentPicNumber() - 1) == -1 ? 4 : (getCurrentPicNumber() - 1))});
    right.addEventListener('click', () => {displayPic((getCurrentPicNumber() + 1) == 5 ? 0 : (getCurrentPicNumber() + 1))});
}

function addDotEvents() {
    const dotsList = document.querySelectorAll('.dot');
    dotsList.forEach(dot => {
        dot.textContent = 'o';
        dot.addEventListener('click', () => {
            const imgNum = parseInt(dot.getAttribute('id').slice(-1));
            displayPic(imgNum);
        })
    });
    
    document.querySelector('.activedot').textContent = 'O';
}

function selectImage(imgNum) {
    const imgList = document.querySelectorAll('.photo');
    let currImgId;
    imgList.forEach(image => {
        if (image.classList.contains('visible')) {
            image.classList.toggle('visible')
            currImgId = parseInt(image.getAttribute('id'));
        }
    });

    document.getElementById(imgNum.toString()).classList.toggle('visible');
    changeDots();
}

function changeDots() {
    const currDot = document.querySelector('.activedot');
    currDot.classList.toggle('activedot');
    currDot.textContent = 'o';

    const imgList = document.querySelectorAll('.photo');
    imgList.forEach(image => {
        if (image.classList.contains('visible')) {
            currImgId = parseInt(image.getAttribute('id'));
        }
    });
    const dotIdStr = 'dot' + currImgId.toString().slice(-1);
    const newDot = document.getElementById(dotIdStr);
    newDot.classList.toggle('activedot');
    newDot.textContent = 'O';
}

addArrowEvents();
addDotEvents();