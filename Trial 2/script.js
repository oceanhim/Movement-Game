// Nest Version: Version 0.0.3

let canvas;
let ctx;
let imgplayer; 
let trpohyimg;

function setVars() {
    canvas = document.getElementById("gameCanvas")
    ctx = canvas.getContext("2d")
    imgplayer = document.getElementById("imgplayer")
    trpohyimg = document.getElementById("lobbyTrophy");
    pieceCreation()

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

    drawText(ctx, color, fontSize, font, name) {
        ctx.fillStyle = color
        ctx.font = `${fontSize} ${font}`
        ctx.fillText(`${name}` ,20,60)
    }
}

/* Inits
-----------------------------------------------------------------*/

// function explode(obj) {
//     obj.color = "cornflowerblue"
//     subtractHealth("poop", 30)
// }

function subtractHealth(obj, healthAmount) {
    player.health -= healthAmount
    if(HealthBG.width >= healthAmount*3) {
        HealthBG.width -= healthAmount*3
    }
    // 3
    HealthBarText.name = `Health: ${player.health}`
}

let platformXDecrease = 2;

//ctx.fillStyle = "black"
        // ctx.font = `50px Verdana`
        // ctx.fillText(`Health: ${player.health}` ,20,60)

// let platform1 = new Thing("platform1",400,300,400,25,50, false, true, false, "black")
// let platform2 = new Thing("platform2",800,200,400,25,50, false, true, false, "black")
let player = new Thing("player",0,0,25,25,50, false, true, false, "red")
player.speed = 4;
player.gravity = 0.05;
player.gravitySpeed = 0;
player.SpeedY = 0;
player.SpeedX = 0;
player.jumpCount = 0;
player.health = 100;
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
// ctx.fillStyle = "lightgreen"
// ctx.fillRect(20,20,300,50)
let HealthBG = new Thing(`healthBG`, 20,20,300,50,300,false,true,false,"lightgreen")
let HealthBarText = new Thing(`Health: ${player.health}`,20,60,50,50,100,false,false,true,"black")
let needsTobeDrawn = [player,HealthBG,HealthBarText] //platform1, platform2
// let platforms = [platform1,platform2]
let drawn = []

let GAME_HEIGHT = 400;
let GAME_WIDTH = 1000;

let keys = []
window.addEventListener("keydown",function(e) {
    keys[e.keyCode] = true
    //console.log(e.keyCode)
})
window.addEventListener("keyup",function(e) {
    keys[e.keyCode] = false
})


/* Collision Detection
------------------------------------------*/

let AllPieces = [
    [{name:"botttomgreen", x:0, y:350, color:"green", width:GAME_WIDTH, height:GAME_HEIGHT, isMonster:false},{name:"Pillar1", x:50, y:100, color:"black", width:35, height:250, isMonster:false}, {name:"Pillar1a", x:85, y:300, color:"gold", width:35, height:50, isMonster:false}, {name:"torchHolder", x:95, y:265, color:"brown", width:10, height:30, isMonster:false}, {name:"light", x:95, y:250, color:"red", width:10, height:10, isMonster:false}, {name:"purpleBulb", x:50, y:50, color:"purple", width:35, height:40, isMonster:false}, {name:"lobbystaircasepiece1", x:80, y:140, color:"black", width:35, height:15, isMonster:false}], // Ground & left side of lobby
    [{name:"obstacle", x:-200, y:330, color:"black", width:50, height:20, isMonster:false}, {name:"obstacle", x:-250, y:310, color:"black", width:50, height:20, isMonster:false}, {name:"obstacle", x:-300, y:290, color:"black", width:50, height:20, isMonster:false}, {name:"obstacle", x:-350, y:270, color:"black", width:50, height:20, isMonster:false}, {name:"obstacle", x:-350, y:270, color:"black", width:50, height:20, isMonster:false}, {name:"obstacle", x:-400, y:250, color:"black", width:50, height:20, isMonster:false}, {name:"obstacle", x:-500, y:330, color:"black", width:100, height:20, isMonster:false}], // Obstacles
    [{name:"monster1", x:1000, y:320, color:"yellow", width:30, height:30, isMonster:true}], // Monsters
]
// let xvalue = 80;
// let yvalue = 140;
// for(i=0; i<4; i++) {
//     xvalue += 35;
//     yvalue -= 15; 
//     AllPieces.section1.push({name:"lobbystaircasepiece", x:xvalue, y:yvalue, color:"black", width:35, height:15})
// }

function shootLaser(ctx, obj) {
    try {
        ctx.fillStyle = "red"
        ctx.fillRect((obj.x - 10), obj.y, (obj.width/3), (obj.height/3))
    }
    catch(err) {
        console.log(`Errror: `+ err)
    }
}
    
function pieceCreation() {
    AllPieces.forEach(section => {
        section.forEach(piece => {
            drawn.push(piece)
        })
    })
}



console.log(drawn)

/* Game loop
------------------------------------------*/

let previousY = player.y;
let previousX = player.x;

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
    if(keys[73] == true) {
        player.speed += 1
    }
    if(keys[80] == true) {
        subtractHealth("pooop", 5)
    }
    if(keys[71] == true) {

    }


    if(player.x < 0) {
        player.x = 0
        drawn.forEach(e => {
            e.x += player.speed
            let grass = drawn[0];
            grass.x = player.x
        })
    }
    if(player.x > (GAME_WIDTH - 25)) {
        player.x = (GAME_WIDTH - 25)
        drawn.forEach(e => {
            e.x -= player.speed
            let grass = drawn[0];
            grass.width += player.speed
        })
    }
    if(player.y > (GAME_HEIGHT - 25)) {
        player.y = (GAME_HEIGHT - 25)
    }
    if(player.y < 0) {
        player.y = 0
    }

    drawn.forEach(e => {
        if(isColliding(player, e)) {
            console.log(`IS Colliding`)
            if(player.y < e.height - player.height) {
                //console.log(`Players Y: ${player.y} \n Players Height: ${player.height} \n e.height: ${e.height} \n Equation: ${player.y} + ${player.height} < ${e.height} \n Sum Total: ${(player.y - e.height)}`)
                player.gravity = 0
                player.gravitySpeed = 0
                player.y = previousY
            } 
            // if(player.x < e.x + e.width) {
            //     player.x = previousX
            // }
            // if(player.x + player.width > e.x) {
            //     player.x = player.x
            // }
            if(e.name == "obstacle") {
                player.gravity = 0
                player.gravitySpeed = 0
                player.y = previousY
            }
        } else {
            player.gravity = 0.05
        }
        if(e.isMonster) {
            if(player.x > e.x - 200 && player.x < e.x + 200) {
                console.log(`Within Range`)
                // let laser = {
                //     x:e.x-50,
                //     y:e.y-20,
                //     width:e.width/2,
                //     height:e.height/2
                // }
                
                // ctx.fillStyle = "pink"
                // ctx.fillRect(laser.x, laser.y, laser.width, laser.height)
                let colors = ["orange", "red", "pink", "blue", "green"]
                let chosenColor = Math.floor((Math.random() * 5) + 0)
                e.color = colors[chosenColor]

                //laser.x -= 0.05;
                // ctx.fillRect(laser.x, laser.y, laser.width, laser.height)
            }
            if(isColliding(player, e)) {
                subtractHealth("pooooooooooop",5)
            }
        }

    })
}
function render(ctx) {
    try {
        ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT)
        lobbySetup();
        ctx.drawImage(trpohyimg, GAME_WIDTH/2, 50, 100, 100)
        
        ctx.fillStyle = "black"
        ctx.fillRect(20,20,303,55)

        ctx.fillStyle = "red"
        ctx.fillRect(20,20,300,50)

        // ctx.fillStyle = "lightgreen"
        // ctx.fillRect(20,20,300,50)

        // ctx.fillStyle = "black"
        // ctx.font = `50px Verdana`
        // ctx.fillText(`Health: ${player.health}` ,20,60)
        
        previousY = player.y
        previousX = player.x
        player.newPos();
        needsTobeDrawn.forEach(thing => {
            if(thing.circle == true) {
                //console.log(thing.name + ` is a circle`)
                thing.drawCircle(ctx)
            }
            if(thing.square == true) {
                //console.log(thing.name + ` is a square`)
                thing.drawSquare(ctx)
            }
            if(thing.text == true) {
                //console.log(thing.name + ` is text`)
                thing.drawText(ctx, thing.color, "50px", "Verdana", thing.name)
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
    AllPieces.forEach(e => {
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