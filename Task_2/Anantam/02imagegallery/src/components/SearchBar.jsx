export default function SearchBar({ onSearch }) {
  return (
    <input
      type="text"
      placeholder="Search images..."
      className="border p-2 rounded w-full max-w-md"
      onKeyDown={(e) => e.key === "Enter" && onSearch(e.target.value)}
    />
  );
}
