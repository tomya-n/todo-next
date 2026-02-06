"use client";

export type FilterType = "all" | "active" | "completed";

type Props = {
  current: FilterType;
  onChange: (filter: FilterType) => void;
};

const filters: { value: FilterType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

export function TodoFilter({ current, onChange }: Props) {
  return (
    <div className="flex gap-1">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            current === f.value
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
