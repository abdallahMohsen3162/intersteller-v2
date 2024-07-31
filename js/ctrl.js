let canvas = document.querySelector('canvas');

let ctx = canvas.getContext("2d");

canvas.height = innerHeight;
canvas.width = innerWidth;
const gravity = 0.3;

let h = canvas.height,
    w = canvas.width;

/*start circle*/
let GLOBAL_COUNT = 5
class Circle {
    constructor(x, y, radius, acceleration, speed, fill = 'black', border = 'white') {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.acceleration = acceleration;
        this.fill = fill;
        this.border = border;
        this.cnt = GLOBAL_COUNT;
    }

    drow() {
        ctx.beginPath();
        ctx.fillStyle = this.fill
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = this.border;
        ctx.lineWidth = 1;
        ctx.fill()
        ctx.stroke();
    }

    update_Gravity() {

        this.y += this.speed.y;
        this.x += this.speed.x;
        this.speed.y += gravity;
        this.drow();
    };

    update() {
        this.y += this.speed.y;
        this.x += this.speed.x;

        this.speed.x + this.acceleration.x;
        this.speed.y + this.acceleration.y;

        this.drow();
    }

    _update() {
        this.y += this.speed.y;
        this.x += this.speed.x;
        console.log(enemies.length);
        if(this.cnt){
            if(this.x <= 0 || this.x >= w){
                this.speed.x *= -1;
                this.cnt--
                if(this.cnt == 0){
                    bullets.splice(bullets.indexOf(this), 1)
                }
            }

            if(this.y <= 0 || this.y >= h){
                this.speed.y *= -1;
                this.cnt--
                if(this.cnt == 0){
                    bullets.splice(bullets.indexOf(this), 1)
                }
            }

            
        }

        this.drow();
    }
}
/*end circle*/


let bullets = [],
    enemies = [];
let max_num_of_enemies = 5;


let colors = [
    '#FF6F61',
    '#88B04B',
    '#92A8D1',
    '#34568B',
    '#D65076',
    '#DD4124',
    '#5B5EA6',
    '#E15D44',
    '#C3447A',
    '#fa4529',
    '#98B4D4',
    '#FF6F61',
    '#88B04B',
    '#92A8D1',
    '#34568B',
    '#D65076',
    '#DD4124',
    '#5B5EA6',
    '#E15D44',
    '#C3447A',
    '#fa4529',
    '#98B4D4',
    '#88B04B',
    '#92A8D1',
    '#34568B',
    '#D65076',
    '#DD4124',
    '#5B5EA6',
    '#E15D44',
    '#C3447A',
    '#fa4529',
    '#98B4D4',
    'black'
];



const GLOBAL_SCALING_ENEMIE = 100;
let GenerateEnemy = () => {

    let color = colors[Math.floor(Math.random() * colors.length)];
    let enemie,
        rand = Math.floor(Math.random() * 4);

    if (rand == 0) {
        let x = Math.random() * w;
        new Circle(1,1,1,{ 'x': 0, 'y': 0 }, { 'x': 0, 'y': 0 }, color, color);
        enemie = new Circle(x, 0, 20, { 'x': 0, 'y': 0 }, { 'x': ((w / 2) - x) / GLOBAL_SCALING_ENEMIE, 'y': (h / 2) / GLOBAL_SCALING_ENEMIE }, color, color);
    } else if (rand == 1) {
        let y = Math.random() * h;
        enemie = new Circle(w, y, 20, { 'x': 0, 'y': 0 }, { 'x': -(w / 2) / GLOBAL_SCALING_ENEMIE, 'y': ((h / 2) - y) / GLOBAL_SCALING_ENEMIE }, color, color);
    } else if (rand == 2) {
        let x = Math.random() * w;
        enemie = new Circle(x, h, 20, { 'x': 0, 'y': 0 }, { 'x': ((w / 2) - x) / GLOBAL_SCALING_ENEMIE, 'y': -(h / 2) / GLOBAL_SCALING_ENEMIE }, color, color);
    } else if (rand == 3) {
        let y = Math.random() * h;
        enemie = new Circle(0, y, 20, { 'x': 0, 'y': 0 }, { 'x': (w / 2) / GLOBAL_SCALING_ENEMIE, 'y': ((h / 2) - y) / GLOBAL_SCALING_ENEMIE }, color, color);
    }

    enemies.push(enemie)
}
let EnemyGenerator = setInterval(GenerateEnemy, 800);


let Mouse = {
    x: null,
    y: null
}

let speed_scale = 15;

const GenerateBullet = (event) => {
    let xSpeed = (event.clientX - (w / 2)),
        ySpeed = (event.clientY - (h / 2)),
        tan = ySpeed / xSpeed;

    let Hypotenuse = Math.sqrt((xSpeed * xSpeed) + (ySpeed * ySpeed)),
        sin = ySpeed / Hypotenuse,
        cos = xSpeed / Hypotenuse;

    xSpeed = cos * speed_scale;
    ySpeed = sin * speed_scale;

    let newcircle = new Circle(w / 2, h / 2, 5, { 'x': 0, 'y': 0 }, { 'x': xSpeed, 'y': ySpeed }, 'white', 'white')


    bullets.push(newcircle);
}

document.addEventListener("click", (event) => {
    GenerateBullet(event)
    
})

let mouseIsDown = false;
document.addEventListener("keydown", (event) => {
    mouseIsDown = true;
})

document.addEventListener("keyup", (event) => {
    mouseIsDown = false;
})

document.addEventListener("mousedown", (event) => {
    mouseIsDown = true;
})

document.addEventListener("mouseup", (event) => {
    mouseIsDown = false;
})

document.addEventListener("mousemove", (event) => {
    Mouse.x = event.clientX;
    Mouse.y = event.clientY;
})



document.querySelector('#lose button').onclick = function() {
    let loc = window.location;
    window.location = '';
    window.location = loc;
}

let Score = 0;

function lose() {
    document.getElementById('lose').style.display = 'block';
    requestAnimationFrame();
}

let r;
if (innerWidth < 500) r = 30;
else r = 50;

function ceterilizedcircle() {


    ctx.beginPath();
    ctx.fillStyle = 'black';

    ctx.arc(w / 2, h / 2, r, 0, 2 * Math.PI);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.fill()
    ctx.stroke();
}

let line_move = () => {
    if(mouseIsDown && bullets.length <= 100){
        let event = {
            clientX: Mouse.x,
            clientY: Mouse.y
        }
        GenerateBullet(event);
    }
    ctx.clearRect(0, 0, w, h);

    for (var i = 0; i < bullets.length; i++) {
        bullets[i]._update();
    }

    for (var i = 0; i < enemies.length; i++) {
        enemies[i].update();
    }


    for (var j = 0; j < enemies.length; j++) {
        let distance_rc = Math.pow(enemies[j].x - (w / 2), 2) + Math.pow(enemies[j].y - (h / 2), 2);

        distance_rc = Math.sqrt(distance_rc);

        if (distance_rc <= r) lose();
    }






    for (var i = 0; i < bullets.length; i++) {

        for (var j = 0; j < enemies.length; j++) {
            let distance_rr = Math.pow((bullets[i].x - enemies[j].x), 2) + Math.pow((bullets[i].y - enemies[j].y), 2);
            distance_rr = Math.sqrt(distance_rr);
            if (distance_rr < enemies[j].radius && enemies[j].fill != 'transparent') {
                enemies[j].speed.x = 0;
                enemies[j].speed.y = 0;

                if (enemies[j].fill == '#FF6F61') Score++;
                else if (enemies[j].fill == '#88B04B') Score += 2;
                else if (enemies[j].fill == '#92A8D1') Score += 3;
                else if (enemies[j].fill == '#34568B') Score += 4;
                else if (enemies[j].fill == '#D65076') Score += 5;
                else if (enemies[j].fill == '#DD4124') Score += 6;
                else if (enemies[j].fill == '#5B5EA6') Score += 7;
                else if (enemies[j].fill == '#E15D44') Score += 8;
                else if (enemies[j].fill == '#C3447A') Score += 9;
                else if (enemies[j].fill == '#fa4529') Score += 10;
                else if (enemies[j].fill == '#fa4529') Score += 11;
                else if (enemies[j].fill == '#98B4D4') Score += 12;
                else if (enemies[j].fill == 'black') Score += 100;
                enemies.splice(j, 1);
                
                document.querySelector('.ctrl span').innerHTML = Score;
            }

        }
    }




    ceterilizedcircle();
    requestAnimationFrame(line_move);
};



requestAnimationFrame(line_move);
