import { Search, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { roomCategories } from '../../data/roomsData';

export const RoomFilterBar = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  maxPrice,
  onMaxPriceChange,
  sortBy,
  onSortByChange,
  onResetFilters,
  totalResults
}) => {
  return (
    <div className="filter-bar">
      {/* Search Input with Debounce */}
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder="Search suites, villas, features..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="form-input"
          style={{ paddingLeft: '2.4rem' }}
          aria-label="Search accommodations"
        />
        <Search
          size={16}
          color="var(--text-muted)"
          style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }}
        />
      </div>

      {/* Category Dropdown */}
      <div>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="form-select"
          aria-label="Filter by collection"
        >
          {roomCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Max Price Range */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.2rem' }}>
          <span>Max Price:</span>
          <strong>${maxPrice} / night</strong>
        </div>
        <input
          type="range"
          min="400"
          max="1500"
          step="50"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--color-gold-500)', cursor: 'pointer' }}
          aria-label="Filter by max price"
        />
      </div>

      {/* Sort By Dropdown */}
      <div>
        <select
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
          className="form-select"
          aria-label="Sort accommodations"
        >
          <option value="featured">Featured First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {/* Reset & Count */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <button
          onClick={onResetFilters}
          className="btn btn-secondary btn-sm"
          title="Reset all filters"
        >
          <RotateCcw size={14} /> Reset
        </button>
        <span className="badge badge-gold" style={{ whiteSpace: 'nowrap' }}>
          {totalResults} {totalResults === 1 ? 'Suite' : 'Suites'}
        </span>
      </div>
    </div>
  );
};

export default RoomFilterBar;
