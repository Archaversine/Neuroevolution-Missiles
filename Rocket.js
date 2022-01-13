
class Rocket
{
    constructor(dna)
    {
        this.pos = createVector(width / 2, height - 30);
        this.vel = createVector();
        this.acc = createVector();
        this.fitness = 0;

        this.crashed = false;
        this.completed = false;
        this.completedTime = 0;

        if (dna) { this.dna = dna; }
        else { this.dna = new DNA(); }
    }

    applyForce(force)
    {
        this.acc.add(force);
    }

    update()
    {
        if (this.completed) { return; }
      
        let d = dist(this.pos.x, this.pos.y, target.x, target.y);

        if (d < targetSize)
        {
            this.completed = true;
            this.pos = target.copy();
          
            explosions.push(new Explosion(this.pos.x, this.pos.y, 100, [255, 0, 0]));
        }

        if (!this.completed)
        {
            this.completedTime++;
        }

        this.applyForce(this.dna.genes[count]);

        if (!this.completed && !this.crashed)
        {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);

            // if (this.touchingObstacle() || this.touchingEdgeOfView())
            // {
            //     //this.crashed = true;
            //     this.vel.mult(-1);
            //     this.acc.mult(-1);
            //     //explosions.push(new Explosion(this.pos.x, this.pos.y, 100));
            // }
          
            if (this.willTouchX())
            {
                this.vel.x *= -1;
                this.acc.x *= -1;
            }
          
            if (this.willTouchY())
            {
                this.vel.y *= -1;
                this.acc.y *= -1;
            }
          
            if (this.touchingEdgeOfView()/* || this.touchingObstacle()*/)
            {
                this.crashed = true;
                explosions.push(new Explosion(this.pos.x, this.pos.y, 50));
            }
        }
    }

    show()
    {
        if (this.crashed) { return; }
      
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading()); // rotate in direction of vector
        noStroke();
        fill(255, 100);
        rectMode(CENTER);
        rect(0, 0, 25, 5);
        pop();
    }

    calcFitness()
    {
        let d = dist(this.pos.x, this.pos.y, target.x, target.y);
        this.fitness = map(d, 0, width, width, 0);

        if (this.completed)
        {
            this.fitness += map(lifespan - this.completedTime, 0, lifespan, 0, 100);
            this.fitness *= 10;
        }
      
        if (this.crashed)
        {
          this.fitness = 0;
        }
    }

    touchingObstacle()
    {
        for (let i = 0; i < obstacles.length; i++)
        {
            if (this.pos.x < obstacles[i].x - obstacles[i].w / 2 || this.pos.x > obstacles[i].x + obstacles[i].w / 2) { continue; }
            if (this.pos.y < obstacles[i].y - obstacles[i].h / 2 || this.pos.y > obstacles[i].y + obstacles[i].h / 2) { continue; }

            return true;
        }

        return false;
    }
  
    willTouchX()
    {
        for (let i = 0; i < obstacles.length; i++)
        {
            if (this.pos.x + this.vel.x < obstacles[i].x - obstacles[i].w / 2 || this.pos.x + this.vel.x > obstacles[i].x + obstacles[i].w /2) { continue; }
            if (this.pos.y < obstacles[i].y - obstacles[i].h / 2 || this.pos.y > obstacles[i].y + obstacles[i].h / 2) { continue; }
          
            return true;
        }
      
        return false;
    }
  
    willTouchY()
    {
        for (let i = 0; i < obstacles.length; i++)
        {
            if (this.pos.x < obstacles[i].x - obstacles[i].w / 2 || this.pos.x > obstacles[i].x + obstacles[i].w / 2) { continue; }
            if (this.pos.y + this.vel.y < obstacles[i].y - obstacles[i].h / 2 || this.pos.y + this.vel.y > obstacles[i].y + obstacles[i].h / 2) { continue; }
          
            return true;
        }
      
        return false;
    }
  
    touchingEdgeOfView()
    {
      return (this.pos.x < 0 || this.pos.x > width) || (this.pos.y < 0 || this.pos.y > height);
    }
}