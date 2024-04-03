import prisma from "@/app/utils/db";
export default async function Home() {
  const db = prisma;

  const recipes = await db.recipe.findMany({
    include: {
      recipe_steps: true,
      RecipeCategories: true,
      user: true,
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center">
      <h1 className="text-2xl font-bold">Home Page</h1>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold">{recipe.title}</h2>
            <p className="text-gray-700">{recipe.description}</p>
            <div className="mt-2">
              <span className="text-sm font-medium text-gray-900">
                Author:{" "}
              </span>
              <span className="text-sm text-gray-600">
                {recipe.user.name || recipe.user.email}
              </span>
            </div>
            <div className="mt-2">
              <span className="text-sm font-medium text-gray-900">
                Categories:
              </span>
              <ul className="list-disc list-inside">
                {recipe.RecipeCategories.map((category) => (
                  <li key={category.id} className="text-sm text-gray-600">
                    {category.title}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium">Steps:</h3>
              <ol className="list-decimal list-inside">
                {recipe.recipe_steps.map((step) => (
                  <li key={step.id} className="text-sm text-gray-600">
                    {step.description}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
