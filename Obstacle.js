
class Obstacle
{
    constructor(x, y, w, h)
    {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    show()
    {
        noStroke();
        fill(150);
        rectMode(CENTER);
        rect(this.x, this.y, this.w, this.h);
    }
}