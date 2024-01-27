
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
        document.getElementsByClassName("GenBut")[0].style.color='black';
        document.getElementById('qr-image').style.filter = 'invert(1)';
        document.getElementsByClassName('err-text')[0].style.color = 'black';
        document.getElementsByClassName('copyright')[0].style.color = 'black';
        document.getElementsByClassName('get-Ext')[0].style.color = 'black';

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
        document.getElementsByClassName("GenBut")[0].style.color='white';
        document.getElementById('qr-image').style.filter = 'invert(0)';
        document.getElementsByClassName('err-text')[0].style.color = 'white';
        document.getElementsByClassName('copyright')[0].style.color = 'white';
        document.getElementsByClassName('get-Ext')[0].style.color = 'white';

    }


}
// function processINP() {
//     var input = document.getElementById("UserInput").value;
//     console.log(input)
//     var input = document.getElementById("qr-image").src='Goblin-nobg.png';
//   }

async function processINP(){
    var input = document.getElementById("UserInput").value
    if (input != '') {
        var response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${input}`);
    
        if (response.ok) {
            const blob = await response.blob();
            const imageURL = URL.createObjectURL(blob);
            document.getElementById('qr-image').src= imageURL;
        }
    } else {
        var errText = document.getElementsByClassName('err-text')[0]
        errText.style.opacity = '100%'
        errText.classList.add('animate-custom');
        setTimeout(() => {
            errText.style.opacity = '0%'
            errText.classList.remove('animate-custom')
        }, 700);
    }

}

document.getElementById('UserInput').addEventListener("keydown", function(event){
    if (event.key === 'Enter'){
        processINP();
    }
})