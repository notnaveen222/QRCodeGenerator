//Under Development
const cords = { x : 0, y : 0 }; 
const circles = document.querySelectorAll('.circle');
//const circles = document.getElementsByClassName('circle');

circles.forEach(function (circle) {
    circle.x = 0;
    circle.y = 0;
})

window.addEventListener("mousemove", function(e){
    cords.x = e.clientX;
    cords.y = e.clientY;

    animateCircles();
});

function animateCircles () {
    let x = cords.x;
    let y = cords.y;


    circles.forEach(function (circle,index) {
        circle.style.left = cords.x - 12 + "px";
        circle.style.top = cords.y - 12 + "px";
        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index +1 ] || circles[0];
        x += (nextCircle.x -x ) * 0.5;
        y += (nextCircle.y - y) * 0.5;
     });
};