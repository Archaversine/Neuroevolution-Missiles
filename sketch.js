let population;

let lifespan = 800;
//let lifeP; // paragraph element
let count = 0;
let target;
let targetSize = 30;

//let rx, ry, rw, rh;
let obstacles = [];
let explosions = [];

function setup()
{
    //createCanvas(1000, 800);
    createCanvas(displayWidth - 20, displayHeight - 210);

    population = new Population();
    target = createVector(width / 2, 50);
    //lifeP = createP();

    // rx = width / 2;
    // ry = height / 2;
    // rw = width / 2;
    // rh = 20;

    // obstacles.push(new Obstacle(rx, ry, rw, rh));

    for (let i = 0; i < 20; i++)
    {
        obstacles.push(new Obstacle(random(width), random(60, height - 60), random(10, 50), random(10, 50)));
    }
  
  e = new Explosion(width / 2, height / 2, 100);
}

function draw()
{
    background(0);

    fill(255, 255);
    rectMode(CENTER);
    //rect(rx, ry, rw, rh);

    for (let i = 0; i < obstacles.length; i++)
    {
        obstacles[i].show();
    }

    population.run();
    //lifeP.html(count);
    count++;

    if (count == lifespan)
    {
        population.evaluate();
        population.selection();
        count = 0;
    }

    fill(255, 0, 0, 150);
    ellipse(target.x, target.y, targetSize, targetSize);
  
    for (let i = explosions.length - 1; i >= 0; i--)
    {
      explosions[i].update();
      explosions[i].show();
      
      if (explosions[i].finished)
      {
        explosions.splice(i, 1);
      }
    }
  
}