/* 
* Kino Rose
* Resnake
*/
open Reprocessing;


let width = 1000;
let height = 1000;
let gridSize = (100, 100);
let frameLock = 2;
let (gridLength, gridWidth) = gridSize;
let bodySize = width / gridLength;
let foodSize = (width / gridWidth ) / 2
let headColor = Utils.color(~r=255, ~g=255, ~b=255, ~a=255);
let foodColor = Utils.color(~r=255, ~g=255, ~b=0, ~a=255);
let obstacleColor = Utils.color(~r=0, ~g=255, ~b=0, ~a=255);
let textColor = Utils.color(~r=255, ~g=255, ~b=255, ~a=255);

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

let clamp = (min, max, num) => {
  num <= min ? min : num >= max ? max : num;
}

let getListElement = (index, list) => {
  list |> Array.of_list |> Array.get(_, index);
}

let hitBoundary = (x, y, env) => {
  let width = Env.width(env);
  let height = Env.height(env);
  if (x >= width - bodySize || x <= bodySize) {
    HitSides;
  } else if (y >= height - bodySize || y <= bodySize) {
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

let randomGridPosition = (~minX, ~minY, ~maxX, ~maxY) => {
  let x = Utils.random(~min=minX, ~max=maxX);
  let y = Utils.random(~min=minY, ~max=maxY);
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
      ~minX=1,
      ~minY=1,
      ~maxY=gridLength - 1,
      ~maxX=gridWidth - 1
    );

  let foodPosition = randomGridPosition(
    ~minX=1,
    ~minY=1,
    ~maxY=gridLength - 1,
    ~maxX=gridWidth - 1
    );
  Env.size(~width, ~height, env);
  {
    score: 0,
    highScore: 0,
    direction: None,
    level: 1,
    snake: [position],
    snakePrevious: [position],
    foodPosition:  foodPosition,
    running: Alive,
  };
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
  let (finalX, finalY) = switch (direction) {
    | Left => (x - 1, y)
    | Right => (x + 1, y)
    | Up => (x, y - 1)
    | Down => (x, y + 1)
    | None => (x, y)
  };
  let x = clamp(0, gridWidth - 1, finalX);
  let y = clamp(0, gridLength - 1, finalY);
  (x, y);
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

let drawFood = (~pos, ~color, ~env) => {
  Draw.fill(color, env);
  Draw.ellipse(~center=pos, ~radx=foodSize, ~rady=foodSize, env);
};

let drawBoundary = (~env) => {
  let width = Env.width(env);
  let height = Env.height(env);
  let blockSize = bodySize;
  Draw.fill(Constants.red, env);
  Draw.rect(~pos=(0, 0), ~width=width, ~height=blockSize, env);
  Draw.rect(~pos=(0,0), ~width=blockSize, ~height=height, env);
  Draw.rect(~pos=(0, height - blockSize), ~width=width, ~height=blockSize,env);
  Draw.rect(~pos=(width - blockSize,0), ~width=blockSize, ~height=height,env);
}

let drawSnake = (~pos,~grid, ~color, ~env) => {
  let offset = bodySize / 2;
  let (x, y) = pos;
  printPosition(pos);
  let (realX, realY) = getGridPositionOffset(
    ~grid=grid,
    ~x=x, 
    ~y=y,
    ~offX=0,
    ~offY=0
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
    
    if(Env.frameCount(env) mod frameLock == 1) {
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
      drawBoundary(~env);
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
      let (realHeadX, realHeadY) = getGridPosition(~x=headX, ~y=headY, ~grid=grid);
      let boundaryHit =
        switch (hitBoundary(realHeadX, realHeadY, env)) {
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
                ~x=Utils.random(~min=1, ~max=gridWidth - 1),
                ~y=Utils.random(~min=1, ~max=gridLength - 1),
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
          foodPosition: randomGridPosition(
            ~minX=1,
            ~minY=1,
            ~maxY=gridLength - 1,
            ~maxX=gridWidth - 1,
          ),
          snake: [
            randomGridPosition(
              ~minX=1,
              ~minY=1,
              ~maxY=gridLength - 1,
              ~maxX=gridWidth - 1
            )
          ],
          direction: None,
          running: boundaryHit ? Alive : Restart,
        }
      };
    } else {
      Draw.background(Utils.color(~r=125, ~g=125, ~b=125, ~a=255), env);
      drawBoundary(~env);
      drawFood(~pos=foodPosition, ~color=foodColor, ~env);
      List.iter(drawSnake(~pos=_, ~grid, ~color=headColor, ~env), snake);

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
