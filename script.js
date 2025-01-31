// Game Variables
let score = 0;
let timeLeft = 60;
let currentRecipe = null;
let stepsCompleted = 0;
let inventory = [];
let recipeSteps = [];
let easterEggUnlocked = false;
let friesUnlocked = false;

// Recipe Definitions
const recipes = {
    pizza: {
        name: "Pizza",
        ingredients: ['dough', 'sauce', 'cheese', 'pepperoni'],
        steps: ['Place dough on pizza base', 'Add sauce to dough', 'Add cheese', 'Add toppings (e.g. pepperoni)', 'Bake pizza in oven'],
        timeLimit: 60,
        inventory: ['dough', 'sauce', 'cheese', 'pepperoni'],
        cookingActions: ['bake']
    },
    burger: {
        name: "Burger",
        ingredients: ['bun', 'patty', 'lettuce', 'cheese', 'tomato'],
        steps: ['Place bun on plate', 'Add patty on bun', 'Add cheese on patty', 'Add lettuce and tomato', 'Assemble the burger'],
        timeLimit: 90,
        inventory: ['bun', 'patty', 'lettuce', 'cheese', 'tomato'],
        cookingActions: ['grill', 'assemble']
    },
    fries: {
        name: "Potato Fries",
        ingredients: ['potato', 'oil', 'salt', 'pepper'],
        steps: ['Peel and cut potatoes into fries', 'Heat oil in the pan', 'Fry the potatoes until golden and crispy', 'Season with salt and pepper'],
        timeLimit: 60,
        inventory: ['potato', 'oil', 'salt', 'pepper'],
        cookingActions: ['peel', 'cut', 'fry', 'season']
    }
};

// Start Recipe
const startRecipe = (recipeName) => {
    currentRecipe = recipes[recipeName];
    stepsCompleted = 0;
    inventory = [...currentRecipe.inventory];
    recipeSteps = [...currentRecipe.steps];
    score = 0;
    timeLeft = currentRecipe.timeLimit;
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('timer').textContent = `Time Left: ${timeLeft}s`;
    document.getElementById('recipe-selection').style.display = 'none';

    gameLoop();
};

// Game Loop
const gameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    checkEasterEggs();
    checkForFriesCompletion();

    if (stepsCompleted < recipeSteps.length) {
        stepsCompleted++;
        score += 10;
        document.getElementById('score').textContent = `Score: ${score}`;
    }

    if (score >= 50 && !friesUnlocked) {
        friesUnlocked = true;
        unlockFries();
    }

    if (timeLeft > 0) {
        timeLeft--;
        document.getElementById('timer').textContent = `Time Left: ${timeLeft}s`;
        setTimeout(gameLoop, 1000);
    } else {
        alert("Time's up!");
    }
};

// Check for Easter Egg and Fries Completion
const checkForFriesCompletion = () => {
    if (currentRecipe.name === "Potato Fries" && stepsCompleted === recipeSteps.length) {
        showFriesMessage();
    }
};

// Unlock Fries
const unlockFries = () => {
    inventory.push('potato', 'oil', 'salt', 'pepper');
};

// Show Fries Message
const showFriesMessage = () => {
    const friesMessage = document.createElement("div");
    friesMessage.id = "fries-message";
    friesMessage.textContent = "You made fries, the perfect dish! Kaiden loves you!";
    document.body.appendChild(friesMessage);

    setTimeout(() => {
        friesMessage.style.display = "none";
    }, 5000);
};

// Easter Egg Message
const showEasterEggMessage = () => {
    const easterEggMessage = document.createElement("div");
    easterEggMessage.id = "easter-egg-message";
    easterEggMessage.textContent = "You’re the best chef ever, Kaiden loves you!";
    easterEggMessage.style.position = "absolute";
    easterEggMessage.style.top = "50%";
    easterEggMessage.style.left = "50%";
    easterEggMessage.style.transform = "translate(-50%, -50%)";
    easterEggMessage.style.fontSize = "30px";
    easterEggMessage.style.color = "#ff69b4";
    easterEggMessage.style.fontWeight = "bold";
    easterEggMessage.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    easterEggMessage.style.padding = "20px";
    easterEggMessage.style.borderRadius = "10px";
    document.body.appendChild(easterEggMessage);

    setTimeout(() => {
        easterEggMessage.style.display = "none";
    }, 5000);
};

// Canvas Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Call the startRecipe function when selecting a recipe
const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', () => startRecipe(button.textContent.toLowerCase())));
