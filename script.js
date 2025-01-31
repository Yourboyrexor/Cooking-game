// Game Variables
let score = 0;
let timeLeft = 60;
let currentRecipe = null;
let stepsCompleted = 0;
let inventory = [];
let recipeSteps = [];
let easterEggUnlocked = false;
let friesUnlocked = false;

// Recipe Definitions with more complexity
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

// Sounds
const fryingSound = new Audio('frying.mp3'); // Sound for frying action
const cookingSound = new Audio('cooking.mp3'); // Sound for general cooking

// Start Recipe Function
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

// Game Loop with more complexity
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

// Check for Fries Completion and Easter Egg
const checkForFriesCompletion = () => {
    if (currentRecipe.name === "Potato Fries" && stepsCompleted === recipeSteps.length) {
        showFriesMessage();
    }
};

const unlockFries = () => {
    inventory.push('potato', 'oil', 'salt', 'pepper');
    fryingSound.play(); // Play frying sound when fries are unlocked
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
    document.body.appendChild(easterEggMessage);

    setTimeout(() => {
        easterEggMessage.style.display = "none";
    }, 5000);
};

// Canvas Setup with Animation
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Draw Cooking Elements
const drawCookingElements = () => {
    ctx.fillStyle = "brown"; // Example, color for the frying pan or dough
    ctx.fillRect(100, 100, 150, 50); // Draw a rectangle to represent the pan
};

// Call the startRecipe function when selecting a recipe
const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', () => startRecipe(button.textContent.toLowerCase())));
