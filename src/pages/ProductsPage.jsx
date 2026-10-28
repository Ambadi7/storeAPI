import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchCategories } from "../services/productService";
import { useProductFilters } from "../hooks/useProductFilters";
import SearchFilters from "../components/SearchFilters";
import ProductList from "../components/ProductList";

export default function ProductsPage() {
  const {
    data: products = [],
    isLoading: productsLoading,
    isError: productsError,
    error: productsErrorObj,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const {
    data: categories = [],
    isLoading: categoriesLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  const {
    filteredProducts,
    filters,
    hasActiveFilters,
    setSearchTerm,
    setSelectedCategory,
    setMinPrice,
    setMaxPrice,
    clearFilters,
  } = useProductFilters(products);

  if (productsLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 text-sm">Loading products...</p>
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="text-center py-24">
        <p className="text-red-600 font-medium">Failed to load products.</p>
        <p className="text-gray-500 text-sm mt-1">
          {productsErrorObj?.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={refetch}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-gray-900">Products</h1>
        <span className="text-sm text-gray-500">
          {filteredProducts.length} of {products.length} products
        </span>
      </div>

      <SearchFilters
        filters={filters}
        categories={categoriesLoading ? [] : categories}
        hasActiveFilters={hasActiveFilters}
        onSearchChange={setSearchTerm}
        onCategoryChange={setSelectedCategory}
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={setMaxPrice}
        onClearFilters={clearFilters}
      />

      <ProductList products={filteredProducts} />
    </main>
  );
}
