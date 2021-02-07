// import * as classes from './classes'

// console.log(classes.randoNumber)

let canvas;
let ctx;
let imgplayer; 
let trpohyimg;

function setVars() {
    canvas = document.getElementById("gameCanvas")
    ctx = canvas.getContext("2d")
    imgplayer = document.getElementById("imgplayer")
    trpohyimg = document.getElementById("lobbyTrophy");
}

window.onload = setVars

/* Classes
-----------------------------------------*/

class Thing {
    constructor(name, x, y, width, height, size, circle, square, text, color) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.size = size;
        this.circle = circle;
        this.square = square;
        this.text = text;
        this.color = color;
    }

    drawSquare(ctx) {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    drawCircle(ctx, color, third, fourth) {
        ctx.fillStyle = color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, third, fourth * Math.PI);
        ctx.fill();
    }

    drawText(ctx, color, fontSize, font, extraVar) {
        ctx.fillStyle = color
        ctx.font = `${fontSize} ${font}`
        ctx.fillText("Score: " + extraVar,0,40)
    }
}

/* Inits
-----------------------------------------------------------------*/

let platformXDecrease = 2;

// let platform1 = new Thing("platform1",400,300,400,25,50, false, true, false, "black")
// let platform2 = new Thing("platform2",800,200,400,25,50, false, true, false, "black")
let player = new Thing("player",0,0,25,25,50, false, true, false, "red")
player.speed = 4;
player.gravity = 0.05;
player.gravitySpeed = 0;
player.SpeedY = 0;
player.SpeedX = 0;
player.jumpCount = 0;
player.hitBottom = function() {
    let rockBottom = GAME_HEIGHT - player.height;
    if(player.y > rockBottom) {
        player.y = rockBottom
        player.jumpCount = 0;
        player.gravitySpeed = 0;
    }
}
player.newPos = function() {
    player.gravitySpeed += player.gravity;
    player.x += player.SpeedX;
    player.y += player.SpeedY + player.gravitySpeed;
    player.SpeedY + player.gravitySpeed;
    player.hitBottom()
}

let needsTobeDrawn = [player] //platform1, platform2
// let platforms = [platform1,platform2]
let drawn = []

let GAME_HEIGHT = 400;
let GAME_WIDTH = 1000;

let keys = []
window.addEventListener("keydown",function(e) {
    keys[e.keyCode] = true
    // console.log(e.keyCode)
})
window.addEventListener("keyup",function(e) {
    keys[e.keyCode] = false
})


/* Collision Detection
------------------------------------------*/

let lobbyPieces = [
    [{name:"botttomgreen", x:0, y:350, color:"green", width:GAME_WIDTH, height:GAME_HEIGHT},{name:"Pillar1", x:50, y:100, color:"black", width:35, height:250}, {name:"Pillar1a", x:85, y:300, color:"gold", width:35, height:50}, {name:"torchHolder", x:95, y:265, color:"brown", width:10, height:30}, {name:"light", x:95, y:250, color:"red", width:10, height:10}, {name:"purpleBulb", x:50, y:50, color:"purple", width:35, height:40}, {name:"lobbystaircasepiece1", x:80, y:140, color:"black", width:35, height:15}] // Ground & left side of lobby
]
// let xvalue = 80;
// let yvalue = 140;
// for(i=0; i<4; i++) {
//     xvalue += 35;
//     yvalue -= 15; 
//     lobbyPieces.section1.push({name:"lobbystaircasepiece", x:xvalue, y:yvalue, color:"black", width:35, height:15})
// }

lobbyPieces.forEach(section => {
    section.forEach(piece => {
        drawn.push(piece)
    })
})

/* Game loop
------------------------------------------*/

let previousY = player.y;

function init() {
    player.x = 200
    player.y = 200
}

function loop() {
    update();
    render(ctx);
}

function update() {
    if(keys[37] == true || keys[65] == true) {
        player.x = player.x - player.speed
    }
    if(keys[38] == true || keys[87] == true) {
        player.y = player.y - player.speed
        player.jumpCount += 1
    }
    if(keys[39] == true || keys[68] == true) {
        player.x = player.x + player.speed
    }
    if(keys[40] == true || keys[83] == true) {
        player.y = player.y + player.speed
    }
    if(player.x < 0) {
        player.x = 0
    }
    if(player.x > (GAME_WIDTH - 25)) {
        player.x = (GAME_WIDTH - 25)
    }
    if(player.y > (GAME_HEIGHT - 25)) {
        player.y = (GAME_HEIGHT - 25)
    }
    if(player.y < 0) {
        player.y = 0
    }

    drawn.forEach(e => {
        if(isColliding(player, e)) {
            if(player.y < e.height - player.height) {
                //console.log(`Players Y: ${player.y} \n Players Height: ${player.height} \n e.height: ${e.height} \n Equation: ${player.y} + ${player.height} < ${e.height} \n Sum Total: ${(player.y - e.height)}`)
                player.gravity = 0
                player.gravitySpeed = 0
                player.y = previousY
                console.log(`Colliding Top`)
            } else {
                //console.log(`Players Y: ${player.y} \n Players Height: ${player.height} \n e.height: ${e.height} \n Equation: ${player.y}  < ${e.height} \n Sum Total: ${(player.y - e.height)}`)
            }
        } else {
            player.gravity = 0.05
            console.log(`Colliding General`)
        }
    })
}
function render(ctx) {
    try {
        ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT)
        lobbySetup();
        ctx.drawImage(trpohyimg, GAME_WIDTH/2, 50, 100, 100)
        previousY = player.y
        player.newPos();
        needsTobeDrawn.forEach(thing => {
            if(thing.circle == true) {
                // console.log(thing.name + ` is a circle`)
                thing.drawCircle(ctx)
            }
            if(thing.square == true) {
                // console.log(thing.name + ` is a square`)
                thing.drawSquare(ctx)
            }
            if(thing.text == true) {
                // console.log(thing.name + ` is text`)
                thing.drawText(ctx, thing.color)
            }
        })
    }
    catch(err) {
        console.log(`Error: ` + err)
    }
}   

//TIME 25:25/1:16:14 for video

/* Lobby
-----------------------------------------*/

function draw(ctx, obj) {
    ctx.fillStyle = obj.color
    ctx.fillRect(obj.x, obj.y, obj.width, obj.height)
}

function lobbySetup() {
    lobbyPieces.forEach(e => {
        e.forEach(piece => {
            draw(ctx, piece)
        })
    })
}

/* Other
-----------------------------------*/

// player.x + player.size > coin.x && player.y + player.size > coin.y && coin.x + coin.size > player.x && coin.y + coin.size > player.y
function isColliding(obj1, obj2) {
    //let ret = obj1.x + obj1.width >= obj2.x
    return obj1.x + obj1.width >= obj2.x && obj1.y + obj1.height >= obj2.y && obj2.x + obj2.width >= obj1.x && obj2.y + obj2.height >= obj1.y
    // if(ret){
    //     console.log(`checking ${obj1.name} and ${obj2.name} --> ${ret}`)
    //     debugger
    // }
}

let loopint = window.setInterval(loop,1000/60)
// let speedIncreaseInt = window.setInterval(increaseSpeed, 3000)
init();