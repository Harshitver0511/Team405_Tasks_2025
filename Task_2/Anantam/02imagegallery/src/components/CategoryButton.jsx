const categories = ["Nature","Animals", "Technology","Food","People", "Travel","Architecture", "Fashion"];

function CategoryButton({onSelect}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
    {categories.map((cat) => (
    <button
      key={cat}
      className="px-4 py-2 bg-gray-700 text-gray-rounded hover:bg-gray-600"
      onClick={() => onSelect(cat)}
    >
      {cat}
    </button>
  ))}
</div>

  );
}

export default CategoryButton;