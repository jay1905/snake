canvas= document.getElementById('canvas');
context = canvas.getContext('2d');
context.scale(20,20)
class Snake{
  constructor(){
    this.width=1
    this.height=1
    this.dir={x:1,y:0}
    this.body=[{x:5,y:5},{x:4,y:5},{x:3,y:5}]
    this.food={x:12,y:12}
    this.score=0
  }
  setDirection(x,y){
    if(this.dir.x!=x&&this.dir.y!=y){
      this.dir.x = x
      this.dir.y = y
    }
  }
  drawFood(){
    context.fillStyle='#00f'
    context.fillRect(this.food.x,this.food.y,this.width,this.height)
  }
  grow(){
    this.body.push({x:this.body[this.body.length-1].x,y:this.body[this.body.length-1].y})
  }
  resetFood(){
    this.food.x=Math.floor(Math.random()*19+1)
    this.food.y=Math.floor(Math.random()*19+1)
    for (var i = 0; i < this.body.length; i++) {
      if(this.food.x==this.body[i].x&&this.food.y==this.body[i].y){
        this.resetFood()
      }
    }
  }
  reset(){
    this.body=[{x:5,y:5},{x:4,y:5},{x:3,y:5}]
    this.dir.x = 1
    this.dir.y = 0
    this.resetFood()
    this.score=0
  }
  checkDeath(){
    if(this.body[0].x<0||this.body[0].x>canvas.width/20||this.body[0].y<0||this.body[0].y>canvas.height/20){
      this.reset()
    }
    for (var i = 1; i < this.body.length; i++) {
      if(this.body[0].x==this.body[i].x&&this.body[0].y==this.body[i].y){
        this.reset()
      }
    }
  }
  drawSnake(){
    context.fillStyle='#fff'
    this.body.forEach((s)=>{
      context.fillRect(s.x,s.y,this.width,this.height)
    })
  }
  eat(){
    if(this.body[0].x==this.food.x&&this.body[0].y==this.food.y){
      this.resetFood()
      this.grow()
      this.score++
    }
  }
  update(){
    for (var i = this.body.length-1; i >0 ; i--) {
      this.body[i].x=this.body[i-1].x
      this.body[i].y=this.body[i-1].y
    }
    this.body[0].x+=this.dir.x
    this.body[0].y+=this.dir.y
    this.checkDeath()
    this.eat()
    this.drawFood()
    this.drawSnake()
  }
}
let fps=10
const snake = new Snake()
function update(){
  setTimeout(()=>{
          requestAnimationFrame(update);
          context.fillStyle='#000'
          context.fillRect(0,0,canvas.width,canvas.height);
          snake.update()
          document.getElementById('score').innerText=snake.score
      }, 1000 / fps);
}
document.addEventListener('keydown',event=>{
  if (event.keyCode ==37){
    snake.setDirection(-1,0)
  }else if(event.keyCode ==39){
    snake.setDirection(1,0)
  }else if (event.keyCode ==40){
    snake.setDirection(0,1)
  }else if (event.keyCode ==38){
        snake.setDirection(0,-1)
  }
})
update()
