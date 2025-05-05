// src/components/SearchBar.jsx
export default function SearchBar({ value, onChange }) {
  return (
    <div className="mb-4">
      <input
        type="text"
        className="form-control"
        placeholder="搜尋茶飲名稱…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
