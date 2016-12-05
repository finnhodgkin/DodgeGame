document.addEventListener("DOMContentLoaded", function() {
  var rules = {
    numberOfBlocks:25, //width of the platform - 20px increments
    direction: false,   //true = right, false = left
    currentBlock: 1

  }

  genBlocks = (num,size)=>{
    var blocks = []
    for(i = 1; i < num+1; i++){
      s = size ? " style='width:" + size + "px;' " : "";
      blocks.push("<div id='block" + i + "' class='block'" + s + "></div>")
    }
    return blocks.join("")
  }

  var wrap = document.getElementById("wrap");
  wrap.innerHTML = genBlocks(25) + "\n" + wrap.innerHTML;

  //spacebar to change direction
  document.addEventListener("keydown", function(event) {
    if(event.which === 32){
      if(rules.direction){
        document.getElementById('player').style.left = "0px";
        rules.direction = false;
      }
      else{
        document.getElementById('player').style.left = "480px";
        rules.direction = true;
      }
    }
  })

  //listen for player
  var playerControl = setInterval(function () {
    let current = Math.round(Math.ceil(
                  getComputedStyle(document.getElementById('player'))
                  .getPropertyValue("left")
                  .slice(0,-2)) / 20) + 1;

    //recolour previous block
    if(current !== rules.currentBlock)
      document.getElementById('block' + rules.currentBlock)
      .style.backgroundColor = "black";

    //colour and set current block
    rules.currentBlock = current;
    document.getElementById('block' + rules.currentBlock)
      .style.backgroundColor = "red";
  }, 40);

  //click for killer block
  var blocks = document.getElementsByClassName('block');
  for(let i = 0; i < blocks.length; i++){
    blocks[i].addEventListener('click',function(event){
      blink(this);
    })
  }


  function blink (obj) {
    setInterval(function () {
      if(obj.style.backgroundColor === "black")
        obj.style.backgroundColor = "blue";
      else
        obj.style.backgroundColor = "black";
    }, 1000);
  }
})
