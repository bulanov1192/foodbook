import NewRecipeForm from "@/components/recipes/NewRecipeForm";
import React from "react";
import prisma from "@/app/utils/db";
import { redirect } from "next/navigation";
import { authOptions } from "../utils/auth";
import { getServerSession } from "next-auth/next";

export default async function NewRecipe() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/auth");
  }
  const categories = await prisma.recipeCategory.findMany();

  return (
    <div className="container flex flex-col mx-auto">
      <h1 className="text-2xl font-medium mb-5">New Recipe</h1>
      <p className="mb-2">
        Provide detailed description of the recipe and it's every step.
      </p>
      <p className="mb-5">
        Add photos of these steps and, of cource, photos of final meal.
      </p>
      <NewRecipeForm categories={categories} />
    </div>
  );
}
