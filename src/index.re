/* 
* Kino Rose
* Resnake
*/
open Reprocessing;


let bodySize = 40;
let foodSize = 20;  
let headColor = Utils.color(~r=255, ~g=255, ~b=255, ~a=255);
let foodColor = Utils.color(~r=255, ~g=255, ~b=0, ~a=255);
let speed = 4;

type scoreT = int;
type highscoreT = int;

type runningT = 
  | Alive
  | Dead
  | Restart;

type hitBoundaryT = 
  | HitCeiling 
  | HitSides
  | HitNoBoundary;

type stateT = {
  score: scoreT,
  level: int,
  headPosition: (int, int),
  foodPosition: (int, int),
  bodyElements: list((int,int)),
  running: runningT
};

let setup = (env) => {
  Random.self_init();
  Env.size(~width=860, ~height=624, env);
  {
    score: 0,
    level: 1,
    headPosition: (400, 400),
    foodPosition: (200, 200),
    bodyElements: [],
    running: Alive
  }
};

let hitBoundary = (x, y, env) => {
  let width = Env.width(env);
  let height = Env.height(env);
  if (x > width || x < 0) {
    HitSides;
  } else if (y > height || y < 0) {
    HitCeiling;
  } else {
    HitNoBoundary;
  };
};

let moveSnake = (~pos, ~speed, ~env) => {
  let (x, y) = pos;
  let moveAmount = 1 * speed;
  if (Env.key(Right, env)) {
    (x + moveAmount, y);
  } else if (Env.key(Left, env)) {
    (x - moveAmount, y);
  } else if (Env.key(Down, env)) {
    (x, y + moveAmount);
  } else if (Env.key(Up, env)) {
    (x, y - moveAmount);
  } else {
    (x, y);
  };
};

let drawScore = (score: scoreT, env) => {
  let score = score |> string_of_int;
  Draw.fill(Utils.color(~r=255, ~g=255, ~b=255, ~a=255), env);
  let text = "Score: " ++ score;
  let width = Draw.textWidth(~body=text, env);
  let center = Env.width(env) / 2 - width;
  Draw.text(~body=text, ~pos=(center, 80), env);
};

let drawLevel = (level, env) => {
  let level = level|> string_of_int;
  Draw.fill(Utils.color(~r=255, ~g=255, ~b=255, ~a=255), env);
  let text = "Level: " ++ level;
  let width = Draw.textWidth(~body=text, env);
  let center = Env.width(env) / 2 - width;
  Draw.text(~body=text, ~pos=(center, 40), env);
}

let drawFood = (~pos, ~color, ~env) => {
  Draw.fill(color, env);
  Draw.ellipse(~center=pos, ~radx=foodSize, ~rady=foodSize, env);
};

let drawSnake = (~pos, ~color, ~env) => {
  Draw.fill(color, env);
  Draw.rect(~pos, ~width=bodySize, ~height=bodySize, env);
};
let intersectRectCircleI = (~rectPos, ~rectW, ~rectH, ~circlePos, ~circleRad) => {
  let (rectX, rectY) = rectPos;
  let (circleX, circleY) = circlePos;
  Utils.intersectRectCircle(
    ~rectPos=(rectX |> float_of_int, rectY |> float_of_int),
    ~rectW=rectW |> float_of_int,
    ~rectH=rectH |> float_of_int,
    ~circlePos=(circleX |> float_of_int, circleY |> float_of_int),
    ~circleRad=circleRad |> float_of_int
    );
}

let draw = 
  (
    {score, level, headPosition, foodPosition, bodyElements, running} as state, 
    env
  ) => {
  
  let width = Env.width(env);
  let height = Env.height(env);
  /* Utils.random(~min=0, ~max=width), Utils.random(~min=0, ~max=height) */
  let isCollideWithFood = intersectRectCircleI(
    ~rectPos=headPosition, ~rectW=bodySize, ~rectH=bodySize,
    ~circlePos=foodPosition,~circleRad=foodSize
    );
  print_endline(isCollideWithFood |> string_of_bool);
  Draw.background(Utils.color(~r=125, ~g=125, ~b=125, ~a=255), env);
  drawFood(
    ~pos=foodPosition, 
    ~color=foodColor,
    ~env=env
    );
    drawSnake(~pos=headPosition, ~color=headColor, ~env);
    drawScore(score, env);
    drawLevel(level, env);
  /* List.iter( (el) => Draw.rect( ~width=bodySize, ~height=bodySize, ~pos=(el * bodySize, 0), env), 
  bodyElements); */
  let (headX, headY) = headPosition;
  let boundaryHit = switch (hitBoundary(headX, headY, env)) {
    | HitSides => true 
    | HitCeiling => true
    | HitNoBoundary => false
  };
  Draw.fill(Utils.color(~r=255, ~g=255, ~b=255, ~a=255), env);
  switch (running) {
    | Alive => {...state,
      foodPosition: isCollideWithFood ? 
        ( Utils.random(~min=0, ~max=width - foodSize * 2),
          Utils.random(~min=0, ~max=height - foodSize * 2)
        ) 
        : foodPosition, 
      headPosition: moveSnake(~pos=headPosition, ~speed=speed, ~env=env),
      running:Alive
    };
    | Dead => {...state, 
        running: boundaryHit ? Restart : Dead
    };
    | Restart => {...state, 
        running: Restart
    };
  }
};

run(~setup, ~draw, ());
