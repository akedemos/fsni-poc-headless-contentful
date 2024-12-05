import { FC } from "react";
import Image from "next/image";

export type ProductCard = {
  _id: string;
  title: string;
  subtitle: string;
  buttonLabel: string;
  buttonUrl: string;
  image: {
    title: string;
    url: string;
  };
};

type Props = {
  item: ProductCard;
};

const ProductCardsItem: FC<Props> = ({ item }) => (
  <div className="flex flex-col items-center w-1/3 m-4">
    <Image src={item.image.url} alt={item.image.title} width={500} height={375} />
    <h4 className="text-[24px] font-bold">{item.title}</h4>
    <p className="text-[18px]">{item.subtitle}</p>
    <a className="border-2 border-purple-900 text-purple-900 p-2 rounded-sm" href={item.buttonUrl}>
      {item.buttonLabel}
    </a>
  </div>
);

export default ProductCardsItem;
