
function Graff(x,y,opacity,image) {
  this.x = x;
  this.y = y;
  this.opacity = opacity;
  this.image = image;
}

Graff.prototype.display=function(){

image(this.image, this.x, this.y);

};
