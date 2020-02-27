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
var helth = 3;
var player = {

    x: width/2,
    y: height/2,
    width: 48,
    height: 48,
    vx: 0,
    vy: 0,
    super: false,
    kills: 0

}

var cursor = {
    x : 0,
    y : 0,
    width : 11,
    height : 16,
    click : false
};
var frame = 0;
var enemycnt = 5;
var temp = enemycnt;
var airrest = 0.8;
var enemy = [];
var bullets = [];
var powers = [];
var difficulty = 0;

var triple = new Image();
triple.src = 'src/sprites/tripleshot.gif';
var ship = new Image();
ship.src = "src/sprites/shipl.gif";
var frog = new Image();
frog.src = 'src/sprites/frog.gif';
var pew = new Image();
pew.src = 'src/sprites/pew pew.gif';
var trophy = new Image();
trophy.src = 'src/sprites/ngwin.gif';
var starfiter = new Image();
starfiter.src = 'src/title.png';

var healthbar = document.getElementById("heth");

canvas.width = width;
canvas.height = height;

var op = true;
var gamer = false;
var won = false;
var landfall = false;
var cooldown = 0;
var superdown = 0;

function update(){
    if( helth < 0 ){
        helth = 0;
    }
    document.getElementById( 'helth' ).innerHTML = "Health : " + helth
    healthbar = document.getElementById("heth");
    healthbar.setAttributeNS( null ,"width", 300 * helth / 3 + "" );
    ctx.clearRect( 0, 0, width, height );
    if( helth == 2 ){
        healthbar.setAttributeNS( null, "style", "fill:rgb(255,255,0)");
    }
    if( helth == 1 ){
        healthbar.setAttributeNS( null, "style", "fill:rgb(255, 0, 0);");
    }
    ctx.fillStyle = "#000000";

    ctx.beginPath();
    ctx.rect( 0, 0, width, height);
    ctx.fill();

    function title(){

        var box = {
            x : width/2 - 150,
            y : height /5 * 4,
            width : 300,
            height : 90
        }
        ctx.drawImage( starfiter, 100 , 0, 600, 400 );
        ctx.fillStyle = "#45F9C3";
        ctx.fillRect( box.x, box.y, box.width, box.height );
        ctx.drawImage( ship, 523, 373, ship.width, ship.height );
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '20px Comic Sans MS';
        ctx.fillText( 'START', box.x + box.width/2 - 25, box.y + box.height/2 + 10 );
        if( cursor.click ){
            if( tag( box, cursor ) ){
                gamer = true;
                op = false;//change cols
            }
        }
        if( cursor.click){
            console.log( cursor.x , cursor.y );
        }
    }
    //poewrup falls, gives super for 5s

    function game(){
        frame++;
        if( helth == 0 ){
            landfall = true;
        }

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
                y: -48,
                width: 48,
                height: 48,
                vx: -2,
                vy: 2 + difficulty
            });

            num++;
            enemycnt--;
        }
        if( frame % 200 == 0 ){
            enemycnt += 5;
            difficulty += 0.1;
        }

        if( difficulty % 0.3 == 0 ){
            if( powers.length == 0 ){
                powers.push({
                    x: width/2 + 5,
                    y: 0,
                    width: 10,
                    height: 10
                })
            }
        }

        if( superdown == 0 ){
            player.super = false;
        }

        if( enemy.length == 0 && player.kills > 30 ){
            won = true;
        }

        ctx.beginPath();
        ctx.fillStyle = "#FF0000";
        if( enemy.length > 0 ){
            if( enemy[0].x - 20 <= 0  || enemy[enemy.length - 1].x + 20 >= (width - enemy[0].width/2) ){
                for( var i = 0; i < enemy.length; i++ ){
//                    enemy[i].vx *= -1
                }
            }//this is fucked because it unshifts but class ends in like small amount of time so i probably wont fix it lol nevm fixed it but not completly
        }

        for( var i = 0; i < enemy.length; i++ ){
            if( enemy[i].y >= height ){
                helth--;
                enemy.splice( i , 1 );
                break;
                //fix this please
            }
        }

        if( powers.length > 0 ){
            for( var i = 0; i < powers.length; i++ ){
                ctx.drawImage( triple, powers[i].x, powers[i].y, powers[i].width, powers[i].height );

                powers[i].y += 2;

                if( tag( player, powers[i] ) ){
                    player.super = true;
                    superdown = 200;
                    powers.pop();
                    break;
                }

                if( powers[i].y > height ){
                    powers = [];
                }
            }
        }

        for( var i = 0; i < enemy.length; i++ ){

            ctx.drawImage( frog, enemy[i].x, enemy[i].y, enemy[i].width, enemy[i].height );

//            enemy[i].x += enemy[i].vx;
            enemy[i].y += enemy[i].vy;

            for( var o = 0; o < bullets.length; o++ ){
                if( tag( bullets[o], enemy[i] ) ){

                    enemy.splice( i,1 );
                    bullets.splice( o,1 );
                    player.kills++;

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
        if( keys[32] && cooldown == 0 ){
            bullets.unshift({
                x: player.x + player.width/2,
                y: player.y - player.height / 2,
                width : 32,
                height : 32,
                vx: player.vx,
                vy: 5
            });
            if( player.super ){
                bullets.unshift({
                x: player.x + player.width * 9 / 10,
                y: player.y - player.height / 2 + 15,
                width : 32,
                height : 32,
                vx: player.vx,
                vy: 5
            });

                bullets.unshift({
                x: player.x + player.width * 1 / 10,
                y: player.y - player.height / 2 + 15,
                width : 32,
                height : 32,
                vx: player.vx,
                vy: 5
            });
            }

            cooldown = 20;

        }

        ctx.fillStyle = '#00FFFF';
        ctx.fillRect( player.x , player.y - cooldown, 2, cooldown );
        ctx.fillStyle = '#00FF88';
        ctx.fillRect( player.x - 2, player.y - superdown /10, 2, superdown / 10 );

        if( cooldown > 0 ){
            cooldown--;
        }
        if( superdown > 0 ){
            superdown--;
        }

        ctx.fillStyle = "#FFFFFF";

        ctx.beginPath();

        for( var i = 0; i < bullets.length; i++ ){
            ctx.drawImage( pew, bullets[i].x - bullets[i].width/2, bullets[i].y, bullets[i].width, bullets[i].height );
            bullets[i].y -= bullets[i].vy;

            if( bullets[i].x > width || bullets[i].y > height ){
                bullets.splice(i , 1 );
            }
        }

        ctx.fill();

    }

    function win(){

        //TODO
        gamer = false;
        ctx.clearRect(0,0,width,height);
        ctx.fillRect(0,0,width, height);
        ctx.fillStyle = '#FFFF33';
        ctx.fillText( "why would you save this hellscape" , width/2 - 18, height/2 );
        if( cursor.click ){
            reStart();
        }

    }

    function lose(){
        gamer = false;
        ctx.clearRect(0,0,width, height);
        ctx.fillText("click to try again loser", width/2 - 12, height/2 );
        if( cursor.click ){
            reStart();
        }
    }

    if( op ){
        title();
    }
    if( gamer ){
        game();
    }
    if( won ){
        win();
    }
    if( landfall ){
        lose();
    }

    requestAnimationFrame(update);
}

function reStart(){
    landfall = false;
    won = false;
    gamer = true;

    helth = 3;
    able = true;
    player = {
        x: width/2,
        y: height/2,
        width: 48,
        height: 48,
        vx: 0,
        vy: 0,
        super: false,
        kills: 0
    }

    cursor = {
        x : 0,
        y : 0,
        width : 11,
        height : 16,
        click : false
    };
    frame = 0;
    enemycnt = 5;
    temp = enemycnt;
    airrest = 0.8;
    enemy = [];
    bullets = [];
    powers = [];
    difficulty = 0;
    healthbar = document.getElementById( "heth" );
    healthbar.setAttributeNS( null, "style", "fill:rgb(69,249,195)");
}
window.addEventListener( "click", function(e){
    cursor.click = true;
    window.setTimeout( function(){
        cursor.click = false;
    }, 10 );
})
window.addEventListener( "mousemove", function(e){
    cursor.x = e.x;
    cursor.y = e.y;
})

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
