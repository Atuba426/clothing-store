import Link from "next/link";

export default function MegaMenu({ category, onClose }) {
  if (!category) return null;

  return (
    <div
      className="absolute left-0 top-full z-40 w-full border-t border-(--border) bg-(--background)"
      onMouseLeave={onClose}
    >
      <div className="mx-auto max-w-360 px-6 py-8 lg:px-10">
        {/* View All */}
        <div className="mb-7">
          <Link
            href={category.href}
            className="text-sm font-medium underline underline-offset-4"
            onClick={onClose}
          >
            View All {category.label}
          </Link>
        </div>

        {/* Category Columns */}
        <div className="grid grid-cols-2 gap-x-10 gap-y-8 md:grid-cols-4">
          {category.sections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-sm font-semibold">
                {section.title}
              </h3>

              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="text-sm text-(--muted) transition-colors hover:text-(--foreground)"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}