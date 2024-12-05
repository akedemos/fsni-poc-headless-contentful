"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import env from "../../.secrets.js";
import ProductCardsList from "../components/ProductCards/ProductCardsList";
import { type ProductCard } from "../components/ProductCards/ProductCardsItem";
import Alert, { type TAlert } from "../components/Alert";

const query = `
query($isPreview: Boolean=false) {
  page(id: "S5AJpBhBtSx5Ai977ydbG", preview: $isPreview) {
    title
    sitewideAlert {
      text
      alertVariant {
        variant
      }
      enabled
    }
    productCardCarouselCollection(limit: 5) {
      items {
        _id
				title
        subtitle
        buttonLabel
        buttonUrl
        image {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
      }
    }
    heroBanner {
      title
      description
      contentType
      fileName
      size
      url
      width
      height
    }
  }
}
`;

type Page = {
  title: string;
  sitewideAlert: TAlert;
  heroBanner: {
    title: string;
    url: string;
  };
  productCardCarouselCollection?: {
    items: ProductCard[];
  };
};

type Data = {
  page: Page;
};

export default function Home() {
  const [page, setPage] = useState<Page>();
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("preview") === env.spaceId) setIsPreview(true);
  }, []);

  useEffect(() => {
    window
      .fetch(`https://graphql.contentful.com/content/v1/spaces/${env.spaceId}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isPreview ? env.previewKey : env.deliveryKey}`,
        },
        body: JSON.stringify({ query, variables: { isPreview } }),
      })
      .then((response) => response.json())
      .then(({ data, errors }: { data: Data; errors: unknown }) => {
        if (errors) {
          console.error(errors);
        }

        setPage(data?.page);
      });
  }, [isPreview]);

  if (!page) {
    return "Loading...";
  }

  return (
    <main>
      <Alert data={page.sitewideAlert} />
      {!page ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="bg-red-600 flex justify-center items-center">
            <h1 className="text-white text-5xl font-bold">{page.title}</h1>
            <Image
              src={page.heroBanner.url}
              alt={page.heroBanner.title}
              width={500}
              height={300}
              priority
            />
          </div>

          {!!page.productCardCarouselCollection?.items.length && (
            <ProductCardsList items={page.productCardCarouselCollection.items} />
          )}
        </>
      )}
    </main>
  );
}
