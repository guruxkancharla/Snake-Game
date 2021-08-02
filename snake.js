function init() {
  canvas = document.getElementById("myCanvas");
  W = H = canvas.width = canvas.height = 1000;
  pen = canvas.getContext("2d");
  cs = 66;
  food = getRanodmFood();
  game_over = false;
  score = 5;

  food_img = new Image();
  trophy = new Image();
  food_img.src = "Assets/apple.png";
  trophy.src = "Assets/trophy.png";

  snake = {
    init_length: 5,
    color: "blue",
    cells: [],
    direction: "right",
    createSnake: function () {
      for (let i = this.init_length; i > 0; i--) {
        this.cells.push({ x: i, y: 0 });
      }
    },

    drawSnake: function () {
      for (let i = 0; i < this.cells.length; i++) {
        pen.fillStyle = "blue";
        pen.fillRect(
          this.cells[i].x * cs,
          this.cells[i].y * cs,
          cs - 2,
          cs - 2
        );
      }
    },

    updateSnake: function () {
      var headX = this.cells[0].x;
      var headY = this.cells[0].y;
      var nextX, nextY;

      if (headX == food.x && headY == food.y) {
        console.log("Eaten");
        food = getRanodmFood();
        score++;
      } else {
        this.cells.pop();
      }

      if (this.direction == "right") {
        nextX = headX + 1;
        nextY = headY;
      }
      if (this.direction == "left") {
        nextX = headX - 1;
        nextY = headY;
      }
      if (this.direction == "up") {
        nextX = headX;
        nextY = headY - 1;
      }
      if (this.direction == "down") {
        nextX = headX;
        nextY = headY + 1;
      }

      this.cells.unshift({ x: nextX, y: nextY });

      var last_x = Math.round(W / cs);
      var last_y = Math.round(H / cs);

      if (
        this.cells[0].x < 0 ||
        this.cells[0].x > last_x ||
        this.cells[0].y < 0 ||
        this.cells[0].y > last_y
      ) {
        game_over = true;
      }
    },
  };

  snake.createSnake();

  function keyPressed(e) {
    if (e.key == "ArrowRight" && snake.direction != "left") {
      snake.direction = "right";
    } else if (e.key == "ArrowLeft" && snake.direction != "right") {
      snake.direction = "left";
    } else if (e.key == "ArrowUp" && snake.direction != "down") {
      snake.direction = "up";
    } else if (e.key == "ArrowDown" && snake.direction != "up") {
      snake.direction = "down";
    }
    console.log(snake.direction);
  }
  document.addEventListener("keydown", keyPressed);
}

function draw() {
  pen.clearRect(0, 0, W, H);
  snake.drawSnake();

  pen.fillStyle = food.color;
  pen.drawImage(food_img, food.x * cs, food.y * cs, cs, cs);

  pen.drawImage(trophy, 18, 20, cs, cs);

  pen.fillStyle = "blue";
  pen.font = "20px Roboto";
  pen.fillText(score, 50, 50);
}

function update() {
  snake.updateSnake();
}

function getRanodmFood() {
  var foodX = Math.round(Math.random() * ((W - cs) / cs));
  var foodY = Math.round(Math.random() * ((H - cs) / cs));

  var food = {
    x: foodX,
    y: foodY,
    color: "red",
  };

  return food;
}

function gameloop() {
  if (game_over == true) {
    clearInterval(f);
    alert("Game Over");
  }
  draw();
  update();
}

init();
let f = setInterval(gameloop, 100);
