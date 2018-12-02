/* 
* Kino Rose
* Resnake
*/
open Reprocessing;


let bodySize = 40;
let foodSize = 20;  
let headColor = Utils.color(~r=255, ~g=255, ~b=255, ~a=255);
let foodColor = Utils.color(~r=255, ~g=255, ~b=0, ~a=255);
let obstacleColor = Utils.color(~r=0, ~g=255, ~b=0, ~a=255);
let textColor = Utils.color(~r=255, ~g=255, ~b=255, ~a=255);
let width = 500;
let height = 500;
let gridSize = (10, 10);
let speed = 4;

type scoreT = int;

type runningT = 
  | Alive
  | Dead
  | Restart;

type hitBoundaryT = 
  | HitCeiling 
  | HitSides
  | HitNoBoundary;

type directionT = 
 | Left
 | Right
 | Down
 | Up
 | None;

type stateT = {
  score: scoreT,
  highScore: scoreT,
  direction:directionT,
  level: int,
  snake: list((int, int)),
  snakePrevious: list((int, int)),
  foodPosition: (int, int),
  running: runningT
};


let getListElement = (index, list) => {
  list |> Array.of_list |> Array.get(_, index);
}

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

let printPosition = (position) => {
  let (x , y) = position;
  print_endline("(" ++ string_of_int(x) ++ "," ++ string_of_int(y) ++ ")");
};

let printGrid = (grid) => {
  Array.iter((el) => {
    Array.iter(printPosition, el);
  }, grid);
};

let getGridPosition = (~x, ~y, ~grid) => {
  Array.get(grid, x) |> Array.get(_, y);
};

let offsetPosition = (~offX, ~offY, ~position) => {
  let (x, y) = position;
  (x + offX, y + offY);
};

let getGridPositionOffset = (~grid, ~x, ~y, ~offX, ~offY) => {
  getGridPosition(~x=x, ~y=y, ~grid) 
  |> offsetPosition(~offX=offX, ~offY=offY, ~position=_);
};

let randomGridPosition = (~gridSize, ~grid) => {
  let (gridWidth, gridLength) = gridSize;
  let x = Utils.random(~min=0, ~max=gridWidth);
  let y = Utils.random(~min=0, ~max=gridLength);
  (x, y);
}

let randomGridPositionReal = (~gridSize, ~grid, ~offX, ~offY) => {
  let (gridWidth, gridLength) = gridSize;
  let x = Utils.random(~min=0, ~max=gridWidth);
  let y = Utils.random(~min=0, ~max=gridLength);
  getGridPosition(~x=x, ~y=y, ~grid=grid) 
  |> offsetPosition(~offX, ~offY, ~position=_); 
};

let createGrid = (~gridSize, ~width, ~height) => {
  let (gridWidth, gridLength) = gridSize;
  let length = height / gridLength;
  let width = width / gridWidth;
  Array.make(gridWidth, {||}) |> Array.mapi((x, _) => {
    Array.make(gridLength, {||}) |> Array.mapi((y, _) => {
      (x * width , y * length);
    });
  });
};

let grid = createGrid(~gridSize=gridSize,~width=width, ~height=height);
printGrid(grid);


let setup = env => {
  let position = randomGridPosition(
      ~gridSize=gridSize,
      ~grid=grid,
    );
  Env.size(~width, ~height, env);
  {
    score: 0,
    highScore: 0,
    direction: None,
    level: 1,
    snake: [position],
    snakePrevious: [position],
    foodPosition: (200, 200),
    running: Alive,
  };
};


let drawFood = (~pos, ~color, ~env) => {
  Draw.fill(color, env);
  Draw.ellipse(~center=pos, ~radx=foodSize, ~rady=foodSize, env);
};

let snakeDirection = (~direction, ~env) => {
  if (Env.key(Right, env)) {
    Right;
  } else if (Env.key(Left, env)) {
    Left;
  } else if (Env.key(Down, env)) {
    Down;
  } else if (Env.key(Up, env)) {
    Up;
  } else {
    direction;
  };
}

let moveSnakeGrid = (~gridPos, ~direction) => {
  let (x, y) = gridPos;
  switch (direction) {
    | Left => (x - 1, y)
    | Right => (x + 1, y)
    | Up => (x, y - 1)
    | Down => (x, y + 1)
    | None => (x, y)
  };
};

let directionMoved = (~gridPos, ~gridPos2) => {
  let (x, y) = gridPos;
  let (x2, y2) = gridPos2;
  switch ((x2 - x, y2 -y)) {
    | (-1, 0) => Left
    | (1, 0) => Right
    | (0, 1) => Down
    | (0, -1) => Up
    | (0, 0) => None
    | (_, _) => None
  }
}


let drawSnake = (~pos,~grid, ~color, ~env) => {
  let offset = bodySize / 2;
  let (x, y) = pos;
  printPosition(pos);
  let (realX, realY) = getGridPositionOffset(
    ~grid=grid,
    ~x=x, 
    ~y=y,
    ~offX=offset,
    ~offY=offset
    );
  Draw.fill(color, env);
  Draw.rect(~pos=(realX, realY), ~width=bodySize, ~height=bodySize, env);
};

let drawCenteredText = (~color, ~text, ~y, ~env) => {
  Draw.fill(color, env);
  let width = Draw.textWidth(~body=text, env);
  let center = Env.width(env) / 2 - width;
  Draw.text(~body=text, ~pos=(center, y), env);
};

let normalize = ((x, y)) => {
  let normX = x != 0 ? abs(x) / x : x;
  let normY = y != 0 ? abs(y) / y : y;
  (normX, normY);
};
let drawCenteredSysText = drawCenteredText(~color=textColor);

let createSnakeBody = (~oldPos, ~newPos, ~bodySize,) => {
  let (oldX, oldY) = oldPos;
  let (newX, newY) = newPos;
  let (x, y) = normalize((oldX - newX, oldY - newY));
  (x * bodySize + newX, y * bodySize + newY);
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
    {
      score, 
      highScore, 
      direction,
      level, 
      snake,
      snakePrevious,
      foodPosition, 
      running
    } as state, 
    env
  ) => {
    let currentDirection = snakeDirection(~direction=direction, ~env=env);
    if(Env.frameCount(env) mod 10 == 1) {
      let width = Env.width(env);
      let height = Env.height(env);
      let (gridWidth, gridLength) = gridSize;
      /* Utils.random(~min=0, ~max=width), Utils.random(~min=0, ~max=height) */
      let (snakeGridX,snakeGridY) = snake |> Array.of_list |> Array.get(_, 0);
      let isCollideWithFood =
        intersectRectCircleI(
          ~rectPos= getGridPosition(~x=snakeGridX,~y=snakeGridY,~grid=grid),
          ~rectW=bodySize,
          ~rectH=bodySize,
          ~circlePos=foodPosition,
          ~circleRad=foodSize,
        );
      Draw.background(Utils.color(~r=125, ~g=125, ~b=125, ~a=255), env);
      drawFood(~pos=foodPosition, ~color=foodColor, ~env);
      List.iter(drawSnake(~pos=_, ~grid, ~color=headColor, ~env), snake);

      drawCenteredSysText(~text="Score: " ++ string_of_int(score), ~y=120, ~env);
      drawCenteredSysText(
        ~text="High Score: " ++ string_of_int(highScore),
        ~y=80,
        ~env,
      );
      drawCenteredSysText(~text="Level: " ++ string_of_int(level), ~y=40, ~env);

      let (headX, headY) = getListElement(0, snake);
      let boundaryHit =
        switch (hitBoundary(headX, headY, env)) {
        | HitSides => true
        | HitCeiling => true
        | HitNoBoundary => false
        };

      
      /* print_endline(boundaryHit |> string_of_bool) */
      switch (running) {
      | Alive => {
          ...state,
          score: isCollideWithFood ? score + 100 : score,
          direction: currentDirection,
          foodPosition:
            isCollideWithFood ?
              getGridPosition(
                ~x=Utils.random(~min=0, ~max=gridWidth),
                ~y=Utils.random(~min=0, ~max=gridLength),
                ~grid,
              )
              |> offsetPosition(
                   ~offX=foodSize / 2 + 12,
                   ~offY=foodSize / 2 + 12,
                   ~position=_,
                 ) :
              foodPosition,
          snake:
            isCollideWithFood ?
              List.append(
                snake,
                [
                  getListElement(
                    List.length(snakePrevious) - 1, snakePrevious
                  )
                ],
              ) :
              List.mapi((index, position) => {
                let getEl = getListElement(index - 1);
                switch (index) {
                  | 0 => moveSnakeGrid(~gridPos=position, 
                      ~direction=direction
                    )
                  | _ => moveSnakeGrid(
                      ~gridPos=getEl(snakePrevious),
                      ~direction=directionMoved(
                        ~gridPos=getEl(snakePrevious),
                        ~gridPos2=getEl(snake)
                        )
                    )
                }
              }, snake),
          snakePrevious: snake,
          running: boundaryHit ? Dead : Alive,
        }
      | Dead => {
          ...state,
          highScore: score > highScore ? score : highScore,
          running: boundaryHit ? Restart : Dead,
        }
      | Restart => {
          ...state,
          score: 0,
          snake: [
            (
              Utils.random(~min=0, ~max=width - foodSize * 2),
              Utils.random(~min=0, ~max=height - foodSize * 2),
            ),
          ],
          running: boundaryHit ? Alive : Restart,
        }
      };
    } else {
      let width = Env.width(env);
      let height = Env.height(env);
      let (gridWidth, gridLength) = gridSize;
      /* Utils.random(~min=0, ~max=width), Utils.random(~min=0, ~max=height) */
      let isCollideWithFood =
        intersectRectCircleI(
          ~rectPos=snake |> Array.of_list |> Array.get(_, 0),
          ~rectW=bodySize,
          ~rectH=bodySize,
          ~circlePos=foodPosition,
          ~circleRad=foodSize,
        );
      Draw.background(Utils.color(~r=125, ~g=125, ~b=125, ~a=255), env);
      drawFood(~pos=foodPosition, ~color=foodColor, ~env);
      List.iter(drawSnake(~pos=_, ~grid, ~color=headColor, ~env), snake);
      /* drawSnake(~pos=headPosition, ~color=headColor, ~env); */

      drawCenteredSysText(~text="Score: " ++ string_of_int(score), ~y=120, ~env);
      drawCenteredSysText(
        ~text="High Score: " ++ string_of_int(highScore),
        ~y=80,
        ~env,
      );
      drawCenteredSysText(~text="Level: " ++ string_of_int(level), ~y=40, ~env);
      {...state,
        direction: currentDirection
      };
    }
};

run(~setup, ~draw, ());
