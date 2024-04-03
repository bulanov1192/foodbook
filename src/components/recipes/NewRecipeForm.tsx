"use client";

import { RecipeCategory } from "@prisma/client";
import React, { useState } from "react";
import { Select } from "@/components/ui";

interface Props {
  categories: RecipeCategory[];
}

export default function NewRecipeForm({ categories }: Props) {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleTitleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value || value.length === 0) {
      setTitleError("Please enter a title.");
    } else if (value.length > 255) {
      setTitleError("Title must be less than 255 characters.");
    } else {
      setTitleError("");
    }
    setTitle(value);
  };

  const handleDescriptionFieldChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    if (!value || value.length === 0) {
      setDescriptionError("Please add some description.");
    } else if (value.length > 50000) {
      setDescriptionError(
        "No, really, make it shorter, you need to add steps too, don't be so cruel to your readers..."
      );
    } else {
      setDescriptionError("");
    }
    setDescription(value);
  };

  const StandartFieldClasses = [
    "block min-w-none w-full bg-gray-50 outline-none focus:bg-white py-2 px-3 border rounded-md shadow-sm focus:ring-transparent sm:text-sm",
    titleError
      ? "border-red-400 focus:border-red-500"
      : "border-gray-300 focus:border-indigo-500",
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      <label className="flex flex-col gap-2">
        Title
        <input
          type="text"
          name="title"
          className={[...StandartFieldClasses].join(" ")}
          placeholder="e.g. Scrambled eggs"
          value={title}
          maxLength={255}
          onChange={handleTitleFieldChange}
        />
        {titleError && <p className="text-red-400 text-sm">{titleError}</p>}
      </label>
      <label className="flex flex-col gap-2">
        Description
        <textarea
          name="Description"
          className={[...StandartFieldClasses, "resize-y max-h-80"].join(" ")}
          placeholder="Describe your recipe, as you like. Try to be short though, nobody likes to get through giant long-reads to make a dinner :)"
          value={description}
          onChange={handleDescriptionFieldChange}
        ></textarea>
        {descriptionError && (
          <p className="text-red-400 text-sm">{descriptionError}</p>
        )}
      </label>
      <label className="flex flex-col gap-2">
        Categories
        <Select
          options={categories.map((category) => {
            return {
              label: category.title,
              value: category.id,
            };
          })}
          onChange={(options) => {
            setSelectedCategories(options.map((option) => option.value));
          }}
          placeholder="Select one or several categories..."
          multiSelect
          enableFilter
        ></Select>
      </label>
    </div>
  );
}
