# Resnake
## Kino Rose
An implementation of the Snake game in ReasonML using Reprocessing.


## Technologies
* ReasonML
* Reprocessing
  

## How To Run

### Clone
```
git clone https://github.com/KinoAR/resnake.git
```

### Install

```
npm install
```

### Build
```
npm run build
```

### Start
```
npm start
```

To build to JS run `npm run build:web` and then run a static server, like `python -m SimpleHTTPServer` and go to `localhost:8000`. If you're using safari you can simply open the `index.html` and tick `Develop > Disable Cross-Origin Restrictions`.

To build to native run `npm run build:native` and run `npm run start:native`

The build system used is [bsb-native](https://github.com/bsansouci/bucklescript).

## How To Play

* Move the snake with the arrow keys
* As you collect food, the snake gets longer
* Game Over if
  * you eat your own body
  * run into an obstacle
  * hit the boundaries