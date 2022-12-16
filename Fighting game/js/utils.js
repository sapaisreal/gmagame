function rectangleCollision({ rectangle1, rectangle2}) {
    return(
        rectangle1.attackBox.position.x +  rectangle1.attackBox.width >=
         rectangle2.position.x &&
        rectangle1.attackBox.position.x <=
         rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y +  rectangle1.attackBox.height >=
         rectangle2.position.y && 
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height 
    )
}
function deteminewinner({player, enemy, timerID}) {
    clearTimeout(timerID)
    document.querySelector('.tie').style.display = 'Flex'
    if (player.health === enemy.health) {
        document.querySelector('.tie').innerHTML = 'Tie'
    }else if(player.health > enemy.health) {
        document.querySelector('.tie').innerHTML = "Player 1 Win's ! !"
    }else if(enemy.health > player.health) {
        document.querySelector('.tie').innerHTML = "Player 2 Win's !! "
    }
}

let timer = 60
let timerID
function decreaseTimer() {
    if(timer > 0) {
        timerID= setTimeout(decreaseTimer, 1000)
        timer --
        document.querySelector('#timer').innerHTML = timer
    } 
    if (timer === 0){
        document.querySelector('.tie').style.display = 'Flex'
        deteminewinner({player, enemy, timerID})
    }
}