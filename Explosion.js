class Explosion
{
  constructor(x, y, t, c)
  {
      this.pos = createVector(x, y);
      this.time = t;
      this.lifetime = 0;
      this.finished = false;
      this.w = 40;

      if (c)
      {
          this.c = c;
      }
      else
      {
          this.c = [255, 255, 0];
      }
  }
  
  update()
    {
      if (this.finished) { return; }

      this.lifetime++;

      if (this.lifetime >= this.time) { this.finished = true; }
  }
  
  show()
  {
      if (this.finished) { return; }

      fill(this.c[0], this.c[1], this.c[2], this.time - this.lifetime);
      rectMode(CENTER);
      rect(this.pos.x, this.pos.y, this.w + this.lifetime)
  }
}