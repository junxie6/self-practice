$(document).ready(function(){
  //Canvas stuff
  var canvas = $("#canvas")[0];
  var ctx = canvas.getContext("2d");
  var w = $("#canvas").width();
  var h = $("#canvas").height();

  //Lets save the cell width in a variable for easy control
  var cw = 10; // square size.
  var d; // direction.
  var food;
  var score;
  var blocks = [];

  //Lets create the snake now
  var snake_array; //an array of cells to make up the snake

  var length = 5; //Length of the snake
  snake_array = []; //Empty array to start with
  for(var i = length-1; i>=0; i--)
  {
    //This will create a horizontal snake starting from the top left
    snake_array.push({x: i, y:0});
  }

  d = 'right';

  // paint
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "black";
  ctx.strokeRect(0, 0, w, h);

  // paint food
  create_food();
  paint_cell(food.x, food.y, "red");

  // create blocks;
  blocks.push({x: 10, y: 10});
  blocks.push({x: 11, y: 10});
  blocks.push({x: 10, y: 11});
  blocks.push({x: 11, y: 11});
  blocks.push({x: 20, y: 20});
  blocks.push({x: 30, y: 30});

  for (var i = 0; i < blocks.length; i++) {
    paint_cell(blocks[i].x, blocks[i].y, "green");
  }

  // paint snake now
  for (var i = 0; i < snake_array.length; i++) {
    var c = snake_array[i];
    paint_cell(c.x, c.y);
  }

  //Lets first create a generic function to paint cells
  function paint_cell(x, y, color)
  {
    if (typeof color === 'undefined') {
      color = 'blue';
    }

    ctx.fillStyle = color;
    ctx.fillRect(x * cw, y * cw, cw, cw);
    ctx.strokeStyle = "white";
    ctx.strokeRect(x * cw, y * cw, cw, cw);
  }

  //Lets add the keyboard controls now
  $(document).keydown(function(e){
    var key = e.which;
    //console.log(key);

    var curr_x = snake_array[0].x;
    var curr_y = snake_array[0].y;
    var curr_d = d;

    if ((key == "37" || key == "72") && d != "right") {
      curr_x--;
      d = "left";
    }
    else if ((key == "38" || key == "75") && d != "down") {
      curr_y--;
      d = "up";
    }
    else if ((key == "39" || key == "76") && d != "left") {
      curr_x++;
      d = "right";
    }
    else if ((key == "40" || key == "74") && d != "up") {
      curr_y++;
      d = "down";
    }
    else {
      return true;
    }

    // check blocks
    for (var i = 0; i < blocks.length; i++) {
      if (curr_x == blocks[i].x && curr_y == blocks[i].y) {
        d = curr_d;
        return true;
      }
    }

    // check snake body
    for (var i = 0; i < snake_array.length; i++) {
      if (curr_x == snake_array[i].x && curr_y == snake_array[i].y) {
        d = curr_d;
        return true;
      }
    }

    //console.log(curr_x + ' ' + curr_y);

    if (curr_x == food.x && curr_y == food.y) {
      // paint food
      create_food();
      paint_cell(food.x, food.y, "red");
    }

    var tail = snake_array.pop(); // pops out the last cell
    paint_cell(tail.x, tail.y, "white");

    snake_array.unshift({x: curr_x, y: curr_y});
    paint_cell(curr_x, curr_y, "purple");

    paint_cell(snake_array[1].x, snake_array[1].y, "blue");
  });
  
  //Lets create the food now
  function create_food() {
    food = {
      x: Math.round(Math.random()*(w-cw)/cw), 
      y: Math.round(Math.random()*(h-cw)/cw), 
    };
    //This will create a cell with x/y between 0-44
    //Because there are 45(450/10) positions accross the rows and columns
  }
});

