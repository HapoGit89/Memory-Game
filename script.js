// var which counts the cardclicks so only 2 at a time can be chosen
let cardclicks = 0;

//implement car to keep track of scrore
let score = 0;

// implement highscore var and get value from localstorage
if (localStorage.getItem("highscore") === null){
  highscore = ''
}else{
  highscore = JSON.parse(localStorage.getItem("highscore"))
  document.getElementById('highscore').innerText= `Best game: ${highscore}`
}



//array for matching two  cards
let matching = []


const gameContainer = document.getElementById("game");

//selector for individual cards
const cards = gameContainer.children

// implement startswitch
const startbtn = document.querySelector('#startbtn')

// startswitch va
let onswitch = false;


const COLORS = [
  {color:"red", link: 'https://images.unsplash.com/photo-1596854273338-cbf078ec7071?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2F0fGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60'},
  {color: "blue", link:'https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'},
  {color: "green", link:'https://images.unsplash.com/photo-1597626133663-53df9633b799?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'},
  {color: "orange",link:'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'},
  {color:"purple",link:'https://images.unsplash.com/photo-1516139008210-96e45dccd83b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'},
  {color: "red", link: 'https://images.unsplash.com/photo-1596854273338-cbf078ec7071?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2F0fGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60'},
  {color: "blue", link:'https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'},
  {color: "green",link: 'https://images.unsplash.com/photo-1597626133663-53df9633b799?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'},
  {color: "orange", link:'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'},
  {color: "purple", link:'https://images.unsplash.com/photo-1516139008210-96e45dccd83b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'}
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    const newPic = document.createElement("img");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color.color);
    newDiv.classList.add("closed")
    newPic.src=color.link;
    newPic.classList.add("catpic");
   

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    newDiv.prepend(newPic);
    gameContainer.append(newDiv);
  
    
  }
}

// function for testing match and returning boolean

let match = function(array){
  if(array[0]===array[1]){
    return true
  }else{
    return false}
}

// Function which closes all cards which are not found out
let closefalsies = function(){
  for(let i =0; i<cards.length; i++){
    if (!cards[i].className.includes('complete')){
      cards[i].classList.add("closed")
    } 
  }
  cardclicks = 0
}

// function to check game process
let gameprogress = function(){
  let matches = 0;
  let possiblematches = cards.length/2
  for(let i =0; i<cards.length; i++){
    if (cards[i].className.includes('complete')){
      matches += 0.5
    } 
  }
  return matches/possiblematches;

}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  //console.log("you just clicked", event.target);
  if (onswitch){
    let choice
    if(event.target.tagName === 'DIV')
    {choice = event.target}
    else{choice = event.target.parentElement}
    console.log(choice)
  if(choice.className.includes('closed')){
  if(cardclicks<1){
    choice.classList.toggle("closed")
    matching[0] = choice.className
    cardclicks += 1
  }
  else if(cardclicks === 1){
    choice.classList.toggle("closed")
    cardclicks += 1;
    matching[1] = choice.className
    score += 1
      document.getElementById('score').innerText = `No. of tries: ${score}`
    
    // check if match and following code
    if(!match(matching)){
      
      setTimeout(closefalsies,1000)
    
    }else {
      cardclicks = 0
      let completed = document.querySelectorAll(`.${choice.className}`)
      for (let i = 0; i < completed.length; i ++){
        completed[i].classList.add("complete")
      }
      document.querySelector('progress').value = gameprogress()
      if (gameprogress()>=1){
        document.querySelector('label').innerText = "🎉YOU'VE WON!"
        document.querySelector('label').classList.add("won")
        console.log(score)
        console.log(highscore)
        if(highscore === ''){
          highscore = score;
          document.getElementById('highscore').innerText= `Best game: ${highscore}`
          localStorage.setItem("highscore", highscore)
        } else if (score < highscore){
          highscore = score;
          document.getElementById('highscore').innerText= `Best game: ${highscore}`
          localStorage.setItem("highscore", highscore)
        } else{
          document.getElementById('highscore').innerText= `Best game: ${highscore}`
        }
      }
      
    }
  } 

  }
}
}

// implement start/restart button which reshuffles deck and enables player to play

startbtn.addEventListener('click', function(){
  gameContainer.innerHTML=''
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
  onswitch = true;
  document.querySelector('progress').value = gameprogress()
  cardclicks=0;
  score=0
  document.getElementById('score').innerText = `No. of tries: ${score}`
  document.querySelector('label').innerText = "your progress:"
  document.querySelector('label').classList.remove("won")

})

// wire up highscore delete button

document.getElementById('clearhs').addEventListener('click', function(){
  highscore = 0;
  localStorage.clear()
  document.getElementById('highscore').innerText= `Best game: ${highscore}`
})

// when the DOM loads




/* */ 