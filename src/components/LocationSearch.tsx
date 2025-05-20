export default function LocationSearch() {
  return (
    <div className="flex items-center bg-white shadow rounded-full px-4 py-2">
      <input
        type="text"
        placeholder="Search location..."
        className="flex-1 outline-none text-sm px-2"
      />
      <img src="/assets/location-icon.png" alt="Search" className="w-5 h-5" />
    </div>
  );
}
