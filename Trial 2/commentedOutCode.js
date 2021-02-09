// function drawBlock(x, y, color) {
//     ctx.fillStyle = color
//     ctx.fillRect(x, y, 25, 25)
// }

// let Level1 = [
//     [{x:5, y:5}, {x:50, y:50}]
// ]
// let currentLevel = Level1;
// let black = "black"

// let levels = [Level1]

// currentLevel.forEach(block => {
//     drawBlock(block.x, block.y, block.color)
// })

// function increaseSpeed() {
//     platformXDecrease += 40
// }

    

    // player.x + player.size > coin.x && player.y + player.size > coin.y && coin.x + coin.size > player.x && coin.y + coin.size > player.y
    // platforms.forEach(e => {
    //     // e.x -= 1;
    //     if(isColliding(player, e)) {
    //         if(player.y > e.height - player.height) {
    //             player.y -= e.height - player.height
    //             player.gravitySpeed = 0
    //             player.gravity = 0
    //             console.log(`Touching top`)
    //         } 
    //         // if(player.x + player.width > e.x) {
    //         //     player.x = e.x - e.width;
    //         // }
    //         // else {
    //         //     let bottomOfplatform1 = platform1.height + platform1.y 
    //         //     if(player.y < platform1.height + platform1.y) {
    //         //         player.y = bottomOfplatform1
    //         //         console.log(`Touching bottom`)
    //         //     }
    //         // }
    //     } else {
    //         player.gravity = 0.10
    //     }
    // })

    

    // class Archer {
//     constructor() {
//         this.image = document.getElementById("imgplayer")
//     }

//     drawSquare(ctx) {
//         ctx.drawImage(this.image, 10, 10, 16, 16)
//     }
// }


// finally {
//     ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT)
//     lobbySetup();
//     ctx.drawImage(trpohyimg, 10, 200)
//     previousY = player.y
//     player.newPos();
//     needsTobeDrawn.forEach(thing => {
//         if(thing.circle == true) {
//             // console.log(thing.name + ` is a circle`)
//             thing.drawCircle(ctx)
//         }
//         if(thing.square == true) {
//             // console.log(thing.name + ` is a square`)
//             thing.drawSquare(ctx)
//         }
//         if(thing.text == true) {
//             // console.log(thing.name + ` is text`)
//             thing.drawText(ctx, thing.color)
//         }
//     })
// }

        // if(e.name == "landmine") {
        //     if(player.x > e.x) {
        //         e.y -= e.height;
        //         let colors = ["orange", "red", "pink", "blue", "green"]
        //         let chosenColor = Math.floor((Math.random() * 5) + 0)
        //         e.color = colors[chosenColor]
        //         setTimeout(explode(e), 500)
        //     }
        // }



                        // let laser = {
                //     x:e.x-50,
                //     y:e.y-20,
                //     width:e.width/2,
                //     height:e.height/2
                // }
                
                // ctx.fillStyle = "pink"
                // ctx.fillRect(laser.x, laser.y, laser.width, laser.height)
                
                // let colors = ["orange", "red", "pink", "blue", "green"]
                // let chosenColor = Math.floor((Math.random() * 5) + 0)
                // e.color = colors[chosenColor]

                //laser.x -= 0.05;
                // ctx.fillRect(laser.x, laser.y, laser.width, laser.height)


                //for(let i=0; i<10; i++) {
                    //     ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT)
                    //     ctx.fillStyle = "black"
                    //     ctx.font = `50px Hanalei`
                    //     ctx.fillText(`YOU DIED`, 200, 200)
                    // }

            // if(player.x < e.x + e.width) {
            //     player.x = previousX
            // }
            // if(player.x + player.width > e.x) {
            //     player.x = player.x
            // }
            // if(e.name == "obstacle" || e.name == "castleBlock") {
            //     player.gravity = 0
            //     player.gravitySpeed = 0
            //     player.y = previousY
            // }

                
            
            
            // if(player.x > (GAME_WIDTH - 25)) {
    //     player.x = (GAME_WIDTH - 25)
    //     let minititle = needsTobeDrawn[2]
    //     minititle.x -= player.speed
    //     drawn.forEach(e => {
    //         e.x -= player.speed
    //         let grass = drawn[0];
    //         grass.width += player.speed
    //     })
    // }

    let ocean13 = 13
export default ocean13