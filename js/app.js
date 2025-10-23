// Vi hämtar data från TheMealDB API
fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
  .then(response => response.json()) // Gör om svaret till JSON
  .then(data => {
    // Spara alla maträtter i en lista
    const meals = data.meals;
    console.log("Totalt antal maträtter:", meals.length);

    // Uppgift 1: Första 5 måltider i alfabetisk ordning
    const alphabeticMeals = meals
      .sort((a, b) => a.strMeal.localeCompare(b.strMeal)) // sorterar efter namn
      .slice(0, 5) // tar de första fem
      .map(meal => meal.strMeal); // hämtar bara namnen

    console.log("Första 5 måltider i alfabetisk ordning:");
    console.log(alphabeticMeals);

    // Uppgift 2: Filtrera efter kategori (t.ex. "Seafood")
    const categoryToFind = "Seafood";
    const filteredMeals = meals.filter(meal =>
      meal.strCategory.toLowerCase() === categoryToFind.toLowerCase()
    );

    console.log(`Maträtter i kategorin "${categoryToFind}":`);
    filteredMeals.forEach(meal =>
      console.log(`${meal.strMeal} (${meal.strCategory})`)
    );

    // Uppgift 3: Räkna hur många måltider per kategori
    const categoryCount = meals.reduce((acc, meal) => {
      const category = meal.strCategory;
      acc[category] = (acc[category] || 0) + 1; // lägg till eller öka räknaren
      return acc;
    }, {});

    console.log("Antal maträtter per kategori");
    console.log(categoryCount);


    // Funktion som grupperar maträtter efter en viss nyckel (t.ex. kategori)
    function groupBy(items, key) {
      return items.reduce((acc, item) => {
        const value = item[key];
        if (!acc[value]) acc[value] = [];
        acc[value].push(item);
        return acc;
      }, {});
    }

    const groupedByCategory = groupBy(meals, "strCategory");
    console.log("Gruppat efter kategori");
    console.log(groupedByCategory);

    // Skapa en enklare version av varje maträtt med utvalda fält
    const mealSummaries = meals.map(meal => ({
      id: meal.idMeal,
      name: meal.strMeal,
      category: meal.strCategory,
      ingredients: Object.keys(meal)
        .filter(key => key.startsWith("strIngredient") && meal[key])
        .map(key => meal[key])
    }));

    console.log("Förenklad lista av måltider:");
    console.log(mealSummaries);

    // Bygg en frekvenskarta över alla ingredienser
    const ingredientFrequency = meals.reduce((acc, meal) => {
      Object.keys(meal)
        .filter(key => key.startsWith("strIngredient") && meal[key])
        .forEach(key => {
          const ingredient = meal[key];
          acc[ingredient] = (acc[ingredient] || 0) + 1;
        });
      return acc;
    }, {});

    console.log("Frekvens av ingredienser");
    console.log(ingredientFrequency);
  })
  .catch(error => {
    console.error("Fel vid hämtning av data:");
  });

