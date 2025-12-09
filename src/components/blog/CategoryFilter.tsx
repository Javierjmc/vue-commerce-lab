import { BlogCategory } from "./BlogCard";

interface CategoryFilterProps {
  activeCategory: BlogCategory | "all";
  onCategoryChange: (category: BlogCategory | "all") => void;
}

const categories: { value: BlogCategory | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "recetas", label: "Recetas" },
  { value: "salud", label: "Salud" },
  { value: "bienestar", label: "Bienestar" },
];

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onCategoryChange(category.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeCategory === category.value
              ? "gradient-primary text-primary-foreground shadow-card"
              : "bg-muted text-muted-foreground hover:bg-secondary/10 hover:text-secondary"
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
