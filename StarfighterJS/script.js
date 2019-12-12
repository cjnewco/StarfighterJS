(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = 800;
var height = 600;
var keys = [];

var player = {

    x: width/2,
    y: height/2,
    width: 20,
    height: 20

}

canvas.width = width;
canvas.height = height;

function update(){

    ctx.clearRect( 0, 0, width, height );

    ctx.fillStyle = "#0080FF";

    ctx.beginPath();
    ctx.rect( 0, 0, width, height);
    ctx.fill();

    function title(){

        //TODO

    }

    function game(){

        ctx.beginPath();

        ctx.fillStyle = "#808080";
        ctx.rect( player.x, player.y, player.width, player.height );
        ctx.fill();
        if( keys[65] ){
            //left
        }

        if( keys[68] ){
            //right
        }

        if( keys[87] ){
            //up
        }

        if( keys[83] ){
            //down
        }
    }

    function win(){

        //TODO

    }

    game();

    requestAnimationFrame(update);
}

window.addEventListener("keydown", function(e){
    keys[e.keyCode] = true;
})

window.addEventListener("keyup", function(e){
    keys[e.keyCode] = false;
})

window.addEventListener("load", function(){
    update();
});
