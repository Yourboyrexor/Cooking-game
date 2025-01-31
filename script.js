// Game Variables
let score = 0;
let timeLeft = 60;
let currentRecipe = null;
let stepsCompleted = 0;
let inventory = [];
let recipeSteps = [];
let friesUnlocked = false;

// Recipe Definitions
const recipes = {
    pizza: {
        name: "Pizza",
        ingredients: ['dough', 'sauce', 'cheese', 'pepperoni'],
        steps: ['Place dough on pizza base', 'Add sauce to dough', 'Add cheese', 'Add toppings (e.g. pepperoni)', 'Bake pizza in oven'],
        timeLimit: 60
    },
    burger: {
        name: "Burger",
        ingredients: ['bun', 'patty', 'lettuce', 'cheese', 'tomato'],
        steps: ['Place bun on plate', 'Add patty on bun', 'Add cheese on patty', 'Add lettuce and tomato', 'Assemble the burger'],
        timeLimit: 90
    },
    fries: {
        name: "Potato Fries",
        ingredients: ['potato', 'oil', 'salt', 'pepper'],
        steps: ['Peel and cut potatoes into fries', 'Heat oil in the pan', 'Fry the potatoes until golden and crispy', 'Season with salt and pepper'],
        timeLimit: 60
    }
};

// Setup Canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Start Recipe Function
const startRecipe = (recipeName) => {
    currentRecipe = recipes[recipeName];
    stepsCompleted = 0;
    inventory = [...currentRecipe.ingredients];
    recipeSteps = [...currentRecipe.steps];
    score = 0;
    timeLeft = currentRecipe.timeLimit;
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('timer').textContent = `Time Left: ${timeLeft}s`;
    document.getElementById('recipe-selection').style.display = 'none';

    gameLoop();
};

// Game Loop with Animation
const gameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas for each new frame
    drawCookingElements(); // Draw the cooking elements (pan, pizza, etc.)
    
    // Update and check for events
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
        setTimeout(gameLoop, 1000); // Update every second
    } else {
        alert("Time's up!");
        resetGame();
    }
};

// Drawing Cooking Elements
const drawCookingElements = () => {
    ctx.fillStyle = "lightgray"; // Frying pan color
    ctx.fillRect(100, 200, 200, 100); // Frying pan

    if (currentRecipe.name === "Pizza") {
        ctx.fillStyle = "#F4A300"; // Pizza color (dough)
        ctx.beginPath();
        ctx.arc(200, 250, 50, 0, Math.PI * 2, true); // Draw pizza
        ctx.fill();
    }

    if (currentRecipe.name === "Potato Fries") {
        ctx.fillStyle = "#F7F7C5"; // Fries color
        ctx.fillRect(120, 250, 60, 20); // Draw fries
    }
};

// Unlock Fries - Fries Message
const unlockFries = () => {
    inventory.push('potato', 'oil', 'salt', 'pepper');
    showFriesMessage();
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

// Reset Game after Time is up
const resetGame = () => {
    document.getElementById('recipe-selection').style.display = 'block';
    currentRecipe = null;
    score = 0;
    timeLeft = 60;
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('timer').textContent = `Time Left: ${timeLeft}s`;
};

// Event listeners for recipe buttons
const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', () => startRecipe(button.textContent.toLowerCase())));
