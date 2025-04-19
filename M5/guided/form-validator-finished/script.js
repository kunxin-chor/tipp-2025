
// Validation functions that return { status: boolean, message: string }
function validateRecipeName(value) {
    // Type checking with ===
    const minLength = 3;   
    const isString = value && typeof value === 'string';
   
    // Logical operators to combine validations
    const isValidType = isString && !isEmpty;
    
    if (!isValidType) {
        return { status: false, message: 'Recipe name is required and must be a string' };
    }

    // Comparison operators for length validation
    const isLongEnough = value.length >= minLength;
    
    return {
        status: isLongEnough,
        message: isLongEnough ? '' : `Recipe name must be at least ${minLength} characters`
    };
}

function validateIngredients(value) {
    const isValidType = value != null && typeof value === 'string' && value.trim() !== '';
    
    if (!isValidType) {
        return { status: false, message: 'Ingredients are required and must be a string' };
    }

    // Type coercion and array operations
    const ingredients = value.split(',').map(ing => ing.trim());
    const minIngredients = 2;

    // Comparison operators for count validation
    const hasEnoughIngredients = ingredients.length >= minIngredients;
    
    if (!hasEnoughIngredients) {
        return { 
            status: false,
            message: `Please provide at least ${minIngredients} ingredients`
        };
    }
 
    return {
        status: true,
        message: ''
    };
}

function validateCookingTime(value) {
    const time = Number(value);
    if (time) {
        // Comparison operators for range validation
        const minTime = 1;
        const maxTime = 360;
        const isValidRange = time >= minTime && time <= maxTime;

        return {
            status: isValidRange,
            message: isValidRange ? '' : 
                time < minTime ? `Cooking time must be at least ${minTime} minute` :
                `Cooking time cannot exceed ${maxTime} minutes`
        };
    } else {
        return {
            status: false,
            message: 'Cooking time must be a number'
        };
    }
}

function validateDifficulty(value) {
    const isValidType = value != null && typeof value === 'string' && value.trim() !== '';
    
    if (!isValidType) {
        return { status: false, message: 'Please select a difficulty level' };
    }

    // Logical operators with array methods
    const validDifficulties = ['easy', 'medium', 'hard'];
    const isValidDifficulty = validDifficulties.includes(value);

    return {
        status: isValidDifficulty,
        message: isValidDifficulty ? '' : 'Invalid difficulty level'
    };
}

function validateDietary(value) {
    const isValidType = value != null && typeof value === 'string' && value.trim() !== '';
    
    if (!isValidType) {
        return { status: false, message: 'Invalid dietary preference' };
    }

    // Logical operators with array methods
    const validPreferences = ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'];
    const isValidPreference = validPreferences.includes(value);

    return {
        status: isValidPreference,
        message: isValidPreference ? '' : 'Invalid dietary preference'
    };
}

function validateServings(value) {
    const isValidType = value != null && !isNaN(Number(value));
    const servings = isValidType ? Number(value) : NaN;

    // Comparison operators for range validation
    const minServings = 1;
    const maxServings = 100;
    const isValidRange = servings >= minServings && servings <= maxServings;

    // Logical operators to combine validations
    const isValid = isValidType && isValidRange;

    return {
        status: isValid,
        message: isValid ? '' : 
            !isValidType ? 'Number of servings must be a number' :
            servings < minServings ? `Number of servings must be at least ${minServings}` :
            `Number of servings cannot exceed ${maxServings}`
    };
}



// Do not change any of the lines below here
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('recipeForm');
    
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            // Create validators object with all validation functions
            const validators = {
                recipeName: validateRecipeName,
                ingredients: validateIngredients,
                cookingTime: validateCookingTime,
                difficulty: validateDifficulty,
                dietary: validateDietary,
                servings: validateServings
            };

            submitRecipe(validators);
        });
    }
});
