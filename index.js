// import qr from 'qr-image'
// import fs from 'fs'

// var text = 'ytt';
// var qr_svg = qr.image(text);
// qr_svg.pipe(fs.createWriteStream('QR.png'));

var toggleval = 0;
function white(){

    var targetElem = document.getElementsByClassName("Nav4-Row")[0];
    var titleText = document.getElementsByClassName("text")[0];
    var imageElement = document.getElementsByClassName("icon")[0];
    if (toggleval == 0 ) { //0-> black BG
        targetElem.style.backgroundColor = "white";
        titleText.classList.remove("white");
        titleText.classList.add("dark")
        toggleval=1;
        imageElement.src="Assets/nav4/moon.svg";
        imageElement.classList.remove("icon-inv");
        document.body.style.backgroundColor = 'rgba(255, 255, 255)';
        document.getElementsByClassName("input-text")[0].style.color = 'black';
        document.getElementById("UserInput").style.background = "white";
        document.getElementById("UserInput").style.borderColor = 'black';
        document.getElementById("UserInput").style.color = 'black';

    } else if (toggleval == 1) {
        targetElem.style.backgroundColor = "black";
        toggleval=0;
        titleText.classList.remove("dark");
        titleText.classList.add("white")
        imageElement.src="Assets/nav4/sun.png"
        imageElement.classList.add("icon-inv");
        document.body.style.backgroundColor = 'black';
        document.getElementsByClassName("input-text")[0].style.color = 'white';
        document.getElementById("UserInput").style.background = "black";
        document.getElementById("UserInput").style.borderColor = 'white';
        document.getElementById("UserInput").style.color = 'white';

    }


}