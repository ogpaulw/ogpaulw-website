// Logic and crap

function ranRange(min, max) { // (min inclusive, max exclusive)
  return Math.random() * (max - min) + min; // "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_number_between_two_values"
}

function generateCircle(speedMult, sizeMult) {
  var r = Math.floor(Math.random() * sizeMult) //sizeMult was 50
  var cir = {
    r: r,
    x: ranRange(r, window.innerWidth-r), // range using the radius to prevent bubbles starting OOBs and then slowly floating away, never to be seen again...
    y: ranRange(r, window.innerHeight-r),
    x_vel: Math.random()-0.5,
    y_vel: Math.random()-0.5
  }

  cir.x_vel *= speedMult;
  cir.y_vel *= speedMult;

  return cir;
}

let bubbles = [];
let back_bubbles = [];

function genBubbles() {
  for (i=0; i<100; i++) {
    bubbles.push(generateCircle(i/100, (100*0.6)-i*0.6)); // as "i" increases, bubble size increases but bubble speed decreases.
  }
}

function genBackBubbles() {
  for (i=0; i<150; i++) {
    back_bubbles.push(generateCircle(i/500, (150*0.2)-i*0.2)); // as "i" increases, bubble size increases but bubble speed decreases.
  }
}

genBubbles();
genBackBubbles();

// Canvas stuff

const c = document.getElementById("backgroundCanvas")
const ctx = c.getContext("2d");

function init() {
  window.requestAnimationFrame(draw);
}

function draw() {

  c.width  = window.innerWidth;
  c.height = window.innerHeight;

  ctx.clearStyle = "#2D3A9D";
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.save();



  ctx.globalCompositeOperation = "screen";
  ctx.fillStyle = "#2D3A9D";

  for (let bubble of bubbles) {

    ctx.beginPath();

    ctx.arc(bubble.x, bubble.y, bubble.r, 0, 2*Math.PI);

    if (bubble.x < bubble.r || bubble.x > c.width - bubble.r) {
      bubble.x_vel = -bubble.x_vel;
    }
    if (bubble.y < bubble.r || bubble.y > c.height - bubble.r) {
      bubble.y_vel = -bubble.y_vel;
    }

    bubble.x += bubble.x_vel;
    bubble.y += bubble.y_vel;

    ctx.fill();
  }


  ctx.fillStyle = "#252277";

  for (let back_bubble of back_bubbles) {

    ctx.beginPath();

    ctx.arc(back_bubble.x, back_bubble.y, back_bubble.r, 0, 2*Math.PI);

    if (back_bubble.x < back_bubble.r || back_bubble.x > c.width - back_bubble.r) {
      back_bubble.x_vel = -back_bubble.x_vel;
    }
    if (back_bubble.y < back_bubble.r || back_bubble.y > c.height - back_bubble.r) {
      back_bubble.y_vel = -back_bubble.y_vel;
    }

    back_bubble.x += back_bubble.x_vel;
    back_bubble.y += back_bubble.y_vel;

    ctx.fill();
  }

  ctx.restore();

  window.requestAnimationFrame(draw);
}

init()
