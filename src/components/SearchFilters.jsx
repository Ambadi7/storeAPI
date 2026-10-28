export default function SearchFilters({
  filters,
  categories,
  hasActiveFilters,
  onSearchChange,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange,
  onClearFilters,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <input
          id="search-input"
          type="text"
          placeholder="Search products..."
          value={filters.searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-grow border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        {/* Category */}
        <select
          id="category-filter"
          value={filters.selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Min Price */}
        <input
          id="min-price-input"
          type="number"
          placeholder="Min price"
          value={filters.minPrice}
          min="0"
          onChange={(e) => onMinPriceChange(e.target.value)}
          className="w-full sm:w-28 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        {/* Max Price */}
        <input
          id="max-price-input"
          type="number"
          placeholder="Max price"
          value={filters.maxPrice}
          min="0"
          onChange={(e) => onMaxPriceChange(e.target.value)}
          className="w-full sm:w-28 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            id="clear-filters-btn"
            onClick={onClearFilters}
            className="text-sm text-gray-600 border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
