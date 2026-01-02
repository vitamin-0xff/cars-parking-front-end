import React from "react";

type ChipVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "error";

type ChipProps = {
  label: string;
  variant?: ChipVariant;
  onRemove?: () => void;
  onClick?: () => void;
  className?: string;
};

const variantClasses: Record<ChipVariant, string> = {
  default: "bg-gray-100 text-gray-800",
  primary: "bg-blue-100 text-blue-800",
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  error: "bg-red-100 text-red-800",
};

export const Chip: React.FC<ChipProps> = ({
  label,
  variant = "default",
  onRemove,
  onClick,
  className = "",
}) => {
  const Component = onClick ? "button" : "span";

  return (
    <Component
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 rounded-full px-3 py-1
        text-sm font-medium
        ${variantClasses[variant]}
        ${onClick ? "cursor-pointer hover:opacity-80" : ""}
        ${className}
      `}
      type={onClick ? "button" : undefined}
    >
      {label}

      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 rounded-full px-1 text-xs opacity-70 hover:opacity-100"
        >
          ×
        </button>
      )}
    </Component>
  );
};
