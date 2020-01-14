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
    width: 48,
    height: 48,
    vx: 0,
    vy: 0

}
var enemycnt = 5;
var temp = enemycnt;
var airrest = 0.8;
var enemy = [];
var bullets = [];

var ship = new Image();
ship.src = "sprites/shipl.gif";

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



        ctx.fillStyle ="#808080";
        ctx.drawImage( ship, player.x, player.y, player.width, player.height );
        if( keys[65] || keys[37] ){
            if( player.x >= 0 ){
                player.vx--;
            }
            else player.vx = 0;
        }

        if( keys[68] || keys[39]){
            if( player.x + player.width <= width ){
                player.vx++;
            }
            else player.vx = 0;
        }

        if( keys[87] || keys[38] ){
            if( player.y >= 0 ){
                player.vy--;
            }
            else player.vy = 0;
        }

        if( keys[83] || keys[40] ){
            if( player.y + player.height <= height ){
                player.vy++;
            }
            else player.vy = 0;
        }

        player.x += player.vx;
        player.y += player.vy;

        player.vy *= airrest;
        player.vx *= airrest;

        var num = 0;
        for( var i = 0; i < enemycnt; ){
            enemy.push({
                x: ( num + 1 ) * width/(temp + 1),
                y: height/5,
                width: 20,
                height: 20,
                vx: -2
            });

            num++;
            enemycnt--;
        }

        ctx.beginPath();
        ctx.fillStyle = "#FF0000";
        if( enemy.length > 0 ){
            if( enemy[0].x - 20 <= 0  || enemy[enemy.length - 1].x + 20 >= (width - enemy[0].width/2) ){
                for( var i = 0; i < enemy.length; i++ ){
                    enemy[i].vx *= -1
                }
            }//this is fucked because it unshifts but class ends in like small amount of time so i probably wont fix it lol nevm fixed it but not completly
        }

        for( var i = 0; i < enemy.length; i++ ){

            ctx.rect( enemy[i].x, enemy[i].y, enemy[i].width, enemy[i].height );

            enemy[i].x += enemy[i].vx;

            for( var o = 0; o < bullets.length; o++ ){
                if( tag( bullets[o], enemy[i] ) ){

                    enemy.splice( i,1 );
                    bullets.splice( o,1 );

                    for( var i = 0; i < enemy.length; i++ ){
                        if( enemy[0].vx > 0 ){
                            enemy[i].vx++;
                        }
                        else enemy[i].vx--;
                    }

                    break;
                }
            }
        }

        ctx.fill();

//        if( keys[32] ){ //makes bullets look cool but lag ruby blue
        if( keys[32] && able ){
            bullets.unshift({
                x: player.x + player.width/2,
                y: player.y - player.height / 2,
                width : 2,
                height : 10,
                vx: player.vx,
                vy: 5
            });

            able = false;
            window.setTimeout( function(){

                able = true;

            } , 50 );

        }

        ctx.fillStyle = "#FFFFFF";

        ctx.beginPath();

        for( var i = 0; i < bullets.length; i++ ){
            ctx.rect( bullets[i].x, bullets[i].y, bullets[i].width, bullets[i].height );
            bullets[i].y -= bullets[i].vy;

            if( bullets[i].x > width || bullets[i].y > height ){
                bullets.splice(i , 1 );
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

function tag( one, two){

    var vx = (one.x + (one.width/2) ) - (two.x + (two.width/2) );
    var vy = one.y + (one.height/2) - two.y - two.width/2;

    var hwidths = one.width/2 + two.width/2;
    var hheights = one.height/2 + two.height/2;

    if( Math.abs(vx) < hwidths && Math.abs(vy) < hheights ){
        return true;
    }

    return false;

}
