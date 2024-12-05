"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import env from "../../.secrets.js";

const pageId = "S5AJpBhBtSx5Ai977ydbG";

const query = `
  query($isPreview: Boolean=false) {
    page(id: "${pageId}", preview: $isPreview) {
      title
      productCardCarouselCollection(limit: 5) {
        items {
          _id
          title
          subtitle
          buttonLabel
          buttonUrl
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

type ProductCard = {
  _id: string;
  title: string;
  subtitle: string;
  buttonLabel: string;
  buttonUrl: string;
};

type Page = {
  title: string;
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
      .then(({ data, errors }: { data: Data; errors: any }) => {
        if (errors) {
          console.error(errors);
        }

        setPage(data.page);
      });
  }, [query, isPreview]);

  if (!page) {
    return "Loading...";
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {!page ? (
          <p>Loading...</p>
        ) : (
          <>
            <div>
              <h1>{page.title}</h1>
              <Image
                src={page.heroBanner.url}
                alt={page.heroBanner.title}
                width={500}
                height={300}
                priority
              />
            </div>

            {page.productCardCarouselCollection?.items.length
              ? page.productCardCarouselCollection.items.map((card) => (
                  <p key={card._id}>{card.title}</p>
                ))
              : null}
          </>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
