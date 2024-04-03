const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create an initial user
  const user = await prisma.user.create({
    data: {
      email: "bulanov1192@gmail.com",
      role: "BASIC",
    },
  });

  // List of recipe and product categories
  const recipeCategories = [
    { title: "Breakfast" },
    { title: "Lunch" },
    { title: "Dinner" },
    { title: "Dessert" },
    { title: "Snacks" },
    { title: "Soups" },
    { title: "Salads" },
    { title: "Appetizers" },
    { title: "Beverages" },
    { title: "Breads" },
    { title: "Cakes" },
    { title: "Candy" },
    { title: "Cookies" },
    { title: "Casseroles" },
    { title: "Pies" },
    { title: "Pizza" },
    { title: "Pasta" },
    { title: "Sauces" },
    { title: "Seafood" },
    { title: "Vegetarian" },
    { title: "Vegan" },
    { title: "Gluten Free" },
    { title: "Keto" },
    { title: "Low Carb" },
    { title: "Paleo" },
    { title: "Quick & Easy" },
    { title: "Healthy" },
    { title: "Holiday" },
    { title: "International Cuisine" },
    { title: "Comfort Food" },
  ];

  const productCategories = [
    { title: "Fruits" },
    { title: "Vegetables" },
    { title: "Meat" },
    { title: "Dairy" },
    { title: "Bakery" },
    { title: "Frozen Foods" },
    { title: "Dry Goods & Pasta" },
    { title: "Canned Goods" },
    { title: "Condiments & Sauces" },
    { title: "Snacks" },
    { title: "Beverages" },
    { title: "Seafood" },
    { title: "Delicatessen" },
    { title: "Cheese" },
    { title: "Spices & Herbs" },
    { title: "Grains & Cereals" },
    { title: "Nuts & Seeds" },
    { title: "Sweets & Chocolate" },
    { title: "Organic Products" },
    { title: "Gluten-Free Products" },
    { title: "Vegan Products" },
    { title: "Health & Wellness" },
    { title: "International Foods" },
    { title: "Beverages - Alcoholic" },
    { title: "Beverages - Non-Alcoholic" },
  ];

  // Creating recipe and product categories
  for (const category of recipeCategories) {
    await prisma.recipeCategory.create({
      data: category,
    });
  }

  for (const category of productCategories) {
    await prisma.productCategory.create({
      data: category,
    });
  }

  // Creating a couple of basic recipes with steps
  const recipes = [
    {
      title: "Simple Pancakes",
      description: "A simple and delicious pancake recipe.",
      user_id: user.id,
      recipe_steps: {
        create: [
          {
            step_number: 1,
            title: "Mix Ingredients",
            description: "Mix all the dry ingredients together.",
          },
          {
            step_number: 2,
            title: "Add Milk and Eggs",
            description: "Gradually add milk and eggs into the mix.",
          },
          {
            step_number: 3,
            title: "Cook",
            description:
              "Pour the batter onto a hot pan and cook until golden brown.",
          },
        ],
      },
    },
    {
      title: "Classic Salad",
      description: "A refreshing and easy to make salad.",
      user_id: user.id,
      recipe_steps: {
        create: [
          {
            step_number: 1,
            title: "Chop Vegetables",
            description: "Chop all the vegetables and mix them in a bowl.",
          },
          {
            step_number: 2,
            title: "Add Dressing",
            description: "Add your favorite dressing and mix well.",
          },
        ],
      },
    },
  ];

  for (const recipe of recipes) {
    await prisma.recipe.create({
      data: recipe,
    });
  }

  // Adding products for the recipes
  const products = [
    { name: "Flour", user_id: user.id },
    { name: "Milk", user_id: user.id },
    { name: "Eggs", user_id: user.id },
    { name: "Lettuce", user_id: user.id },
    { name: "Tomatoes", user_id: user.id },
    { name: "Cucumber", user_id: user.id },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
