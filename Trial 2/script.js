// Nest Version: Version 0.0.4

import helloWorld from './helloworld.js';

console.log(helloWorld());

let canvas;
let ctx;
let imgplayer; 
let trpohyimg;
let miniGameStartBTn;

function setVars() {
    canvas = document.getElementById("gameCanvas")
    ctx = canvas.getContext("2d")
    imgplayer = document.getElementById("imgplayer")
    trpohyimg = document.getElementById("lobbyTrophy");
    miniGameStartBTn = document.getElementById("gameSTARTbutton")
    createBottomLayerCastleBlocks()
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

    drawText(ctx, obj, fontSize, font) {
        ctx.fillStyle = obj.color
        ctx.font = `${fontSize} ${font}`
        ctx.fillText(`${obj.name}` ,obj.x,obj.y)
    }
}

/* Inits
-----------------------------------------------------------------*/

let platformXDecrease = 2;

//ctx.fillStyle = "black"
        // ctx.font = `50px Verdana`
        // ctx.fillText(`Health: ${player.health}` ,20,60)

// let platform1 = new Thing("platform1",400,300,400,25,50, false, true, false, "black")
// let platform2 = new Thing("platform2",800,200,400,25,50, false, true, false, "black")

let poop = {
    name:"poop"
}

let player = new Thing("player",0,0,25,25,50, false, true, false, "red")
player.speed = 4;
player.gravity = 0.05;
player.gravitySpeed = 0;
player.SpeedY = 0;
player.SpeedX = 0;
player.jumpCount = 0;
player.health = 100;
player.inventory = [poop]    
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
let GameTitleText = new Thing(`CASTLE OVERRUN`,1000,60,50,50,100,false,false,true,"black")
let needsTobeDrawn = [player,HealthBG,GameTitleText,HealthBarText] //platform1, platform2

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
    [{name:"botttomgreen", x:0, y:350, color:"green", width:GAME_WIDTH, height:GAME_HEIGHT, isMonster:false},{name:"Pillar1", x:50, y:100, color:"black", width:35, height:250, isMonster:false}, {name:"Pillar1a", x:85, y:300, color:"gold", width:35, height:50, isMonster:false}, {name:"torchHolder", x:95, y:265, color:"brown", width:10, height:30, isMonster:false}, {name:"light", x:95, y:250, color:"red", width:10, height:10, isMonster:false}, {name:"purpleBulb", x:50, y:50, color:"purple", width:35, height:40, isMonster:false}, {name:"lobbystaircasepiece1", x:80, y:140, color:"black", width:35, height:15, isMonster:false},{name:"respawn", x:500, y:350, color:"green", width:35, height:15, isMonster:false}], // Ground & left side of lobby
    [{name:"obstacle", x:-200, y:330, color:"black", width:50, height:20, isMonster:false}, {name:"obstacle", x:-250, y:310, color:"black", width:50, height:20, isMonster:false}, {name:"obstacle", x:-300, y:290, color:"black", width:50, height:20, isMonster:false}, {name:"obstacle", x:-350, y:270, color:"black", width:50, height:20, isMonster:false}, {name:"obstacle", x:-350, y:270, color:"black", width:50, height:20, isMonster:false}, {name:"obstacle", x:-400, y:250, color:"black", width:50, height:20, isMonster:false}, {name:"obstacle", x:-500, y:330, color:"black", width:100, height:20, isMonster:false, id:"trampoline1"}, {name:"obstacle", x:-300, y:290, color:"black", width:50, height:20, isMonster:false}, {name:"obstacle", x:-350, y:270, color:"black", width:50, height:20, isMonster:false}, {name:"obstacle", x:-350, y:270, color:"black", width:50, height:20, isMonster:false}, {name:"obstacle", x:-400, y:250, color:"black", width:50, height:20, isMonster:false}, {name:"obstacle", x:-600, y:100, color:"black", width:70, height:20, isMonster:false}, {name:"obstacle", x:-530, y:100, color:"red", width:30, height:20, isMonster:false, id:"deathBlock"}], // Obstacles
    [{name:"castleBlock", x:1000, y:300, color:"grey", width:50, height:50, isMonster:false}], // Castle Blocks
    [] // Monsters
]

function createBottomLayerCastleBlocks() {
    let section3 = AllPieces[2]
    let xvalue = 1000
    for(let i=0; i<5; i++) {
        xvalue += 50
        section3.push({name:"castleBlock", x:xvalue, y:300, color:"grey", width:50, height:50, isMonster:false})
    }
    for(let i=0; i<5; i++) {
        section3.push({name:"castleBlock", x:xvalue, y:250, color:"grey", width:50, height:50, isMonster:false})   
        xvalue -= 50
    }
    xvalue += 50
    for(let i=0; i<4; i++) {
        xvalue += 50
        section3.push({name:"castleBlock", x:xvalue, y:200, color:"grey", width:50, height:50, isMonster:false})
    }
    xvalue += 50
    for(let i=0; i<3; i++) {
        xvalue -= 50
        section3.push({name:"castleBlock", x:xvalue, y:150, color:"grey", width:50, height:50, isMonster:false})
    }
}


function respawn(x, y) {
    player.x = x
    player.y = y
}

// function explode(obj) {
//     obj.color = "cornflowerblue"
//     subtractHealth("poop", 30)
// }

function subtractHealth(obj, healthAmount) {
    player.health -= healthAmount
    let respawnSection1 = AllPieces[0]
    let respawnBlock1 = respawnSection1[(respawnSection1.length - 1)]
    if(HealthBG.width >= healthAmount*3) {
        HealthBG.width -= healthAmount*3
    }
    if(player.health <= 0) {
        respawn(respawnBlock1.x, (respawnBlock1.y - player.height))
    }
    // 3
    HealthBarText.name = `Health: ${player.health}`
}

function changeColorOOtramp() {
    let colors = ["orange", "red", "pink", "blue", "green"]
    let chosenColor = Math.floor((Math.random() * 5) + 0)
    let piecesarraySection2 = AllPieces[1]
    let lastOfSection2 = piecesarraySection2[6]
    lastOfSection2.color = colors[chosenColor]
}

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

function openInventory(ctx) {
    ctx.fillStyle = "black"
    ctx.fillRect(player.x, GAME_HEIGHT/2, 200, 200)
    player.inventory.forEach(item => {
        ctx.fillStyle = "white"
        ctx.font = `25px Hanalei`
        ctx.fillText(`${item.name}` ,player.x,GAME_HEIGHT/2)
    })
}

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
    if(keys[190] == true) {
        player.speed += 1
    }
    if(keys[80] == true) {
        subtractHealth("pooop", 5)
        console.log(AllPieces)
    }
    if(keys[73] == true) {[
        openInventory(ctx)
    ]}



    if(player.x < 0) {
        player.x = 0
        let minititle = needsTobeDrawn[2]
        minititle.x += player.speed
        drawn.forEach(e => {
            e.x += player.speed
            let grass = drawn[0];
            grass.x = player.x
        })
    }

    if(player.x > (GAME_WIDTH/2)) {
        player.x = (GAME_WIDTH/2)
        let minititle = needsTobeDrawn[2]
        minititle.x -= player.speed
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

    let section3 = AllPieces[2]
    if(player.x >= section3[3].x) {
        startOVERRUNgame();
    }

    drawn.forEach(e => {
        if(isColliding(player, e)) {
            if(player.y < e.height - player.height) {
                //console.log(`Players Y: ${player.y} \n Players Height: ${player.height} \n e.height: ${e.height} \n Equation: ${player.y} + ${player.height} < ${e.height} \n Sum Total: ${(player.y - e.height)}`)
                player.gravity = 0
                player.gravitySpeed = 0
                player.y = previousY
            } 
            let grassSection = AllPieces[0]
            let grass = grassSection[0]

            if(player.x + player.width >= e.x && e != grass) {
                player.x = previousX
            }
            player.gravity = 0
            player.gravitySpeed = 0
            player.y = previousY

            if(e.id == "trampoline1") {
                player.y -= 250;
            }
            if(e.id == "deathBlock") {
                subtractHealth("poooop", player.health)
            }
        } else {
            player.gravity = 0.05
        }
        if(e.isMonster) {
            if(player.x > e.x - 200 && player.x < e.x + 200) {
                console.log(`Within Range`)

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
                thing.drawText(ctx, thing, "50px", "Hanalei")
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

/* OVERRUN GAME
-----------------------------------------*/

let monsterCount = 1;

function startOVERRUNgame() {
    let section4 = AllPieces[3];
    let monster = {name:"monster", x:1300, y:200, color:"yellow", width:20, height:20, isMonster:true}
    if(monsterCount == 1) {
        section4.push(monster)
        monsterCount = 0;
    }

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
let changeColorIn = window.setInterval(changeColorOOtramp, 100)
// let speedIncreaseInt = window.setInterval(increaseSpeed, 3000)
init();