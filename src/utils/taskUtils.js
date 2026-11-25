export const colorOf = (categories, name) =>
    categories.find((c) => c.name === name)?.color ?? "#9b9d96";