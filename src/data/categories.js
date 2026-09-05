export const categories = {
  men: {
    label: "Men",
    href: "/men",
    sections: [
      {
        title: "Clothing",
        items: [
          { label: "T-Shirts", href: "/men?category=T-Shirts" },
          { label: "Shirts", href: "/men?category=Shirts" },
          { label: "Jeans", href: "/men?category=Jeans" },
          { label: "Trousers", href: "/men?category=Trousers" },
          { label: "Jackets", href: "/men?category=Jackets" },
        ],
      },

      {
        title: "Featured",
        items: [
          {
            label: "New Arrivals",
            href: "/men?collection=new-arrivals",
          },
          {
            label: "Best Sellers",
            href: "/men?collection=best-sellers",
          },
          {
            label: "Trending",
            href: "/men?collection=trending",
          },
          {
            label: "Sale",
            href: "/men?collection=sale",
          },
          {
            label: "Premium",
            href: "/men?collection=premium",
          },
        ],
      },
    ],
  },

  women: {
    label: "Women",
    href: "/women",
    sections: [
      {
        title: "Clothing",
        items: [
          { label: "Tops", href: "/women?category=Tops" },
          { label: "T-Shirts", href: "/women?category=T-Shirts" },
          { label: "Dresses", href: "/women?category=Dresses" },
          { label: "Shirts", href: "/women?category=Shirts" },
          { label: "Jeans", href: "/women?category=Jeans" },
        ],
      },

      {
        title: "Featured",
        items: [
          {
            label: "New Arrivals",
            href: "/women?collection=new-arrivals",
          },
          {
            label: "Best Sellers",
            href: "/women?collection=best-sellers",
          },
          {
            label: "Trending",
            href: "/women?collection=trending",
          },
          {
            label: "Sale",
            href: "/women?collection=sale",
          },
          {
            label: "Premium",
            href: "/women?collection=premium",
          },
        ],
      },
    ],
  },
};