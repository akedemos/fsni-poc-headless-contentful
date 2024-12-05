import { FC } from "react";
import ProductCardsItem, { type ProductCard } from "./ProductCardsItem";

type Props = {
  items: ProductCard[];
};

const ProductCardsList: FC<Props> = ({ items }) => (
  <div className="flex pt-20">
    {items.map((c) => (
      <ProductCardsItem key={c._id} item={c} />
    ))}
  </div>
);

export default ProductCardsList;
