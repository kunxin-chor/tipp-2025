function submitRecipe(validators) {

    const form = document.getElementById('recipeForm');
    if (!form) return { status: false, message: 'Form not found' };

    // Clear all error messages and remove any existing success message
    document.querySelectorAll('.error').forEach(error => {
        error.textContent = '';
    });
    
    // Remove any existing success message
    const existingSuccess = form.querySelector('.alert-success');
    if (existingSuccess) {
        existingSuccess.remove();
    }

    // Get form data
    const formData = new FormData(form);
    const recipeName = formData.get('recipeName');
    const ingredients = formData.get('ingredients');
    const cookingTime = formData.get('cookingTime');
    const difficulty = formData.get('difficulty');
    const dietary = formData.get('dietary');
    const servings = formData.get('servings');

    // Validate each field
    const validations = [
        { field: 'recipeName', result: validators.recipeName(recipeName) },
        { field: 'ingredients', result: validators.ingredients(ingredients) },
        { field: 'cookingTime', result: validators.cookingTime(cookingTime) },
        { field: 'difficulty', result: validators.difficulty(difficulty) },
        { field: 'dietary', result: validators.dietary(dietary) },
        { field: 'servings', result: validators.servings(servings) }
    ];

    // Show error messages
    validations.forEach(validation => {
        const errorDiv = document.getElementById(`${validation.field}Error`);
        errorDiv.textContent = validation.result.message;
    });

    // Check if all validations passed
    const allValid = validations.every(v => v.result.status);

    // Show success message if all validations pass
    if (allValid) {
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success mt-3';
        successDiv.textContent = 'Recipe submitted successfully!';
        form.appendChild(successDiv);
        
        // Clear form after successful submission
        form.reset();
    }

    return { status: allValid, message: allValid ? 'Form submitted successfully' : 'Form has errors' };
}