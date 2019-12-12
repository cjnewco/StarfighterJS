(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = 800;
var height = 600;
var keys = [];

var able = true;

var player = {

    x: width/2,
    y: height/2,
    width: 20,
    height: 20,
    vx: 0,
    vy: 0

}

var airrest = 0.8;

var bullets = [];


canvas.width = width;
canvas.height = height;

function update(){

    ctx.clearRect( 0, 0, width, height );

    ctx.fillStyle = "#0080FF";

    ctx.beginPath();
    ctx.rect( 0, 0, width, height);
    ctx.fill();

    function title(){

        //TODO DCBCBB
        //lipid plasmamembrane

    }

    function game(){

        ctx.beginPath();

        ctx.fillStyle = "#808080";
        ctx.rect( player.x, player.y, player.width, player.height );
        ctx.fill();
        if( keys[65] || keys[37] ){
            player.vx--;
        }

        if( keys[68] || keys[39]){
            player.vx++;
        }

        if( keys[87] || keys[38] ){
            player.vy--;
        }

        if( keys[83] || keys[40] ){
            player.vy++;
        }

        player.x += player.vx;
        player.y += player.vy;

        player.vy *= 0.8;
        player.vx *= 0.8;

//        if( keys[32] ){ makes bullets look cool but lag
        if( keys[32] && able ){

            console.log("e");
            bullets.unshift({
                x: player.x + player.width/2,
                y: player.y - player.height,
                width : 2,
                height : 20,
                vx: player.vx,
                vy: 1.5
            });
            able = false;
            window.setTimeout( function(){

                able = true;

            } , 500 )
        }

        ctx.fillStyle = "#FFFFFF";

        ctx.beginPath();

        for( var i = 0; i < bullets.length; i++ ){
            console.log( bullets[i] + " yikes");
            ctx.rect( bullets[i].x, bullets[i].y, bullets[i].width, bullets[i].height );
            bullets[i].y -= bullets[i].vy;

            if( bullets[i].x > width || bullets[i].y > height ){
                bullets.splice(i);
            }
        }

        ctx.fill();

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
