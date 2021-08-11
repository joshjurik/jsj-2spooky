// these are the ids in the template
const spoopyObj = {
    lvlOne: 'lvl-one',
    lvlTwo: 'lvl-two',
    lvlThree: 'lvl-three',
    lvlFour: 'lvl-four',
    lvlFive: 'lvl-five'
}

// color1 is the brighter color
// color2 is the darker color
// need full 6 char code because
// of the rgb conversion below
const backgroundColorsObj = {
    lvlOne: {
        color1: '#fc5d41',
        color2: '#662419',
        font1: '#333333',
        font2: '#ffffff'
    },
    lvlTwo: {
        color1: '#fc8e40',
        color2: '#874b21',
        font1: '#333333',
        font2: '#ffffff'
    },
    lvlThree: {
        color1: '#fce240',
        color2: '#7a6d1c',
        font1: '#333333',
        font2: '#ffffff'
    },
    lvlFour: {
        color1: '#40c6fc',
        color2: '#1a5268',
        font1: '#333333',
        font2: '#ffffff'
    },
    lvlFive: {
        color1: '#40fc65',
        color2: '#155e23',
        font1: '#333333',
        font2: '#ffffff'
    }
};

// freeze the objs so it's readonly
const spoopyLvls = Object.freeze(spoopyObj);
const backgroundColors = Object.freeze(backgroundColorsObj);

let interval = 0;

function init() {
    // grab a random prop from the obj
    let randomSpoopyLvlProp = getRandomSpoopyLevel(spoopyLvls)

    flashColor(randomSpoopyLvlProp);
}

function flashColor(prop) {
    // clear previous interval if there is one
    if(interval && interval > 0) {
        clearInterval(interval);
        resetBgColors();
    }

    // run changeColor every half second
    interval = setInterval(() => changeColor(prop), 500);
  }
  
  // changes the background-color of the elem when called
  // to the opposite color it was.
  function changeColor(prop) {
    let elem = document.getElementById(prop);
    let color1 = '';
    let color2 = '';

    // all the lvls have the same font color for now
    // if we wanted to change them per lvl we will
    // need to update the if statement below. For
    // now just use the first lvls font color
    let font1 = backgroundColors.lvlOne.font1;
    let font2 = backgroundColors.lvlOne.font2;
  
    if (prop === spoopyLvls.lvlOne) {
      color1 = backgroundColors.lvlOne.color1;
      color2 = backgroundColors.lvlOne.color2;
    } else if (prop === spoopyLvls.lvlTwo) {
      color1 = backgroundColors.lvlTwo.color1;
      color2 = backgroundColors.lvlTwo.color2;
    } else if (prop === spoopyLvls.lvlThree) {
      color1 = backgroundColors.lvlThree.color1;
      color2 = backgroundColors.lvlThree.color2;
    } else if (prop === spoopyLvls.lvlFour) {
      color1 = backgroundColors.lvlFour.color1;
      color2 = backgroundColors.lvlFour.color2;
    } else if (prop === spoopyLvls.lvlFive) {
      color1 = backgroundColors.lvlFive.color1;
      color2 = backgroundColors.lvlFive.color2;
    }
    
    // element.style.background-color returns an rgb value
    // and we have hex values so we need to convert
    elem.style.backgroundColor =
    rgb2hex(elem.style.backgroundColor) == color1 ? color2 : color1;

    elem.style.color =
        rgb2hex(elem.style.color) == font1 ? font2 : font1;
  }

function getRandomSpoopyLevel(spoopyObj) {
    let keys = Object.keys(spoopyObj);
    // multiple key length with math.random (0-1)
    // left shift so we don't have to deal with the decimal
    return spoopyObj[keys[keys.length * Math.random() << 0]];
}

function resetBgColors() {
    // get all spoopy elems
    let elemOne = document.getElementById(spoopyObj.lvlOne);
    let elemTwo = document.getElementById(spoopyObj.lvlTwo);
    let elemThree = document.getElementById(spoopyObj.lvlThree);
    let elemFour = document.getElementById(spoopyObj.lvlFour);
    let elemFive = document.getElementById(spoopyObj.lvlFive);

    // set the bg colors back to the original color
    elemOne.style.backgroundColor = backgroundColors.lvlOne.color2;
    elemTwo.style.backgroundColor = backgroundColors.lvlTwo.color2;
    elemThree.style.backgroundColor = backgroundColors.lvlThree.color2;
    elemFour.style.backgroundColor = backgroundColors.lvlFour.color2;
    elemFive.style.backgroundColor = backgroundColors.lvlFive.color2;
}

// shamelessly copied from:
// http://wowmotty.blogspot.com/2009/06/convert-jquery-rgb-output-to-hex-color.html
function rgb2hex(orig){
    let rgb = orig.replace(/\s/g,'').match(/^rgba?\((\d+),(\d+),(\d+)/i);
    return (rgb && rgb.length === 4) ? "#" +
     ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
     ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
     ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : orig;
   }