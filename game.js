// Define variables
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var player = {
  x: canvas.width/2,
  y: canvas.height-50,
  speed: 10
};
var keys = {
  left: false,
  right: false
};
var stars = [];
var score = 0;

// Create initial stars
for (var i = 0; i < 10; i++) {
  var star = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 20
  };
  stars.push(star);
}

// Update player position based on key presses
document.addEventListener("keydown", function(event) {
  if (event.keyCode === 37) {
    keys.left = true;
  }
  else if (event.keyCode === 39) {
    keys.right = true;
  }
});

document.addEventListener("keyup", function(event) {
  if (event.keyCode === 37) {
    keys.left = false;
  }
  else if (event.keyCode === 39) {
    keys.right = false;
  }
});

// Update game state and draw everything on the canvas
function update() {
  // Move player left or right
  if (keys.left && player.x > 0) {
    player.x -= player.speed;
  }
  else if (keys.right && player.x < canvas.width) {
    player.x += player.speed;
  }

  // Check if player has collected any stars
  for (var i = 0; i < stars.length; i++) {
    var star = stars[i];
    if (star && distance(player.x, player.y, star.x, star.y) < star.size/2) {
      stars[i] = null;
      score++;
    }
  }

  // Create new stars if needed
  for (var i = 0; i < stars.length; i++) {
    var star = stars[i];
    if (!star) {
      var newStar = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 20
      };
      stars[i] = newStar;
    }
  }

  // Clear canvas and redraw everything
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < stars.length; i++) {
    var star = stars[i];
    if (star) {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size/2, 0, Math.PI*2);
      ctx.fillStyle = "#ff0";
      ctx.fill();
