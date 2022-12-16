class spirte{
    constructor({
         position,
         imageSrc,
         scale = 1,
         framesMax = 1,
         offset =  {x: 0, y:0}
        }) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.offset = offset
    }

    draw()  {
        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0, 
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            (this.image.width / this.framesMax) * this.scale, 
            this.image.height * this.scale
        )
    }

    animateFrame() {
        this.framesElapsed++

        if (this.framesElapsed % this.framesHold === 0){   
            if (this.framesCurrent < this.framesMax - 1){
                this.framesCurrent++
            } else {
                this.framesCurrent = 0
            }
        }
    }
    update() {
        this.draw() 
        this.animateFrame()
    }

}

class Fighter extends spirte{
    constructor({
        position, 
        velocity, 
        color = 'red',  
        imageSrc, 
        scale = 1, 
        framesMax = 1,
        offset =  {x: 0, y:0},
        spirtes,
        attackBox = { offset: {}, width: undefined, height: undefined}
    }) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        })

        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastkey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width, 
            height: attackBox.height
        }
        this.color = color
        this.isAttacking
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.spirtes = spirtes
        this.dead = false


       for ( const spirte in this.spirtes) {
        spirtes[spirte].image = new Image()
        spirtes[spirte].image.src = spirtes[spirte].imageSrc
       }

       console.log(this.spirtes);
    }


    update() {
        this.draw()
        if (!this.dead) this.animateFrame()

        // attack box  
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y

        // draw the attack box
        //c.fillRect(
           // this.attackBox.position.x, 
            //this.attackBox.position.y, 
            //this.attackBox.width, 
            //this.attackBox.height
        //)
        
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y >= 
            canvas.height - 96
        ) {
            this.velocity.y = 0
            this.position.y = 330
        } else this.velocity.y += gravity
    }

    attack () {
        this.switchSprite('attack1')
        this.isAttacking = true
    }

    takeHit(){
        this.health -= 10

        if (this.health <= 0) {
            this.switchSprite('death')
        } else this.switchSprite('takeHit')
    }

    switchSprite(spirte) {
        if (this.image === this.spirtes.death.image) {
            if (this.framesCurrent === this.spirtes.death.framesMax -1)
                this.dead = true
            return
        }
        // overriding all other animation eith the attack animation 
        if (
            this.image === this.spirtes.attack1.image && 
            this.framesCurrent < this.spirtes.attack1.framesMax -1
        ) 
        return 

        // overrising when fighter gets hit
        if (
            this.image === this.spirtes.takeHit.image && 
            this.framesCurrent < this.spirtes.takeHit.framesMax -1
        )
        return

        switch (spirte) {
            case 'idle':
                if (this.image !== this.spirtes.idle.image){
                    this.image = this.spirtes.idle.image
                    this.framesMax = this.spirtes.idle.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'run':
                if (this.image !== this.spirtes.run.image){
                    this.image = this.spirtes.run.image
                    this.framesMax = this.spirtes.run.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'jump':
                if (this.image !== this.spirtes.jump.image) {
                    this.image = this.spirtes.jump.image
                    this.framesMax = this.spirtes.jump.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'fall':
                if (this.image !== this.spirtes.fall.image) {
                    this.image = this.spirtes.fall.image
                    this.framesMax = this.spirtes.fall.framesMax
                    this.framesCurrent = 0
                }
                break 
            case 'attack1':
                if (this.image !== this.spirtes.attack1.image) {
                   this.image = this.spirtes.attack1.image
                    this.framesMax = this.spirtes.attack1.framesMax
                    this.framesCurrent = 0
                }
                break 
            case 'takeHit':
                if (this.image !== this.spirtes.takeHit.image) {
                    this.image = this.spirtes.takeHit.image
                    this.framesMax = this.spirtes.takeHit.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'death':
                if (this.image !== this.spirtes.death.image) {
                    this.image = this.spirtes.death.image
                    this.framesMax = this.spirtes.death.framesMax
                    this.framesCurrent = 0
                }
                break
        }
    }
}