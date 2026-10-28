import { useState, useMemo } from "react";

const DEFAULT_FILTERS = {
  searchTerm: "",
  selectedCategory: "",
  minPrice: "",
  maxPrice: "",
};

export function useProductFilters(products = []) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  function setSearchTerm(value) {
    setFilters((prev) => ({ ...prev, searchTerm: value }));
  }

  function setSelectedCategory(value) {
    setFilters((prev) => ({ ...prev, selectedCategory: value }));
  }

  function setMinPrice(value) {
    setFilters((prev) => ({ ...prev, minPrice: value }));
  }

  function setMaxPrice(value) {
    setFilters((prev) => ({ ...prev, maxPrice: value }));
  }

  function clearFilters() {
    setFilters(DEFAULT_FILTERS);
  }

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase().trim());

      const matchesCategory =
        filters.selectedCategory === "" ||
        product.category === filters.selectedCategory;

      const min = filters.minPrice !== "" ? parseFloat(filters.minPrice) : null;
      const max = filters.maxPrice !== "" ? parseFloat(filters.maxPrice) : null;
      const matchesMin = min === null || product.price >= min;
      const matchesMax = max === null || product.price <= max;

      return matchesSearch && matchesCategory && matchesMin && matchesMax;
    });
  }, [products, filters]);

  const hasActiveFilters =
    filters.searchTerm !== "" ||
    filters.selectedCategory !== "" ||
    filters.minPrice !== "" ||
    filters.maxPrice !== "";

  return {
    filteredProducts,
    filters,
    hasActiveFilters,
    setSearchTerm,
    setSelectedCategory,
    setMinPrice,
    setMaxPrice,
    clearFilters,
  };
}
