import Link from "next/link";
import Image from "next/image";
import HighlightedText from "./HighlightedText";
import { getStrapiMedia } from "../utils/api-helpers";
import { renderButtonStyle } from "../utils/render-button-style";

interface Button {
  id: string;
  url: string;
  text: string;
  type: string;
  newTab: boolean;
}

interface Picture {
  data: {
    id: string;
    attributes: {
      url: string;
      name: string;
      alternativeText: string;
    };
  };
}

interface HeroProps {
  data: {
    id: string;
    title: string;
    description: string;
    picture: Picture;
    buttons: Button[];
  };
}

export default function Hero({ data }: HeroProps) {
  const imgUrl = getStrapiMedia(data.picture.data.attributes.url);

  return (
    <section className="bg-white dark:text-gray-900">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 lg:w-3/5 mb-8 md:mb-0">
            <div className="relative h-64 md:h-96">
              <Image
                src={imgUrl || ""}
                alt={data.picture.data.attributes.alternativeText || "none provided"}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="md:w-1/2 lg:w-2/5 md:pl-8">
            <HighlightedText
              text={data.title}
              tag="h1"
              className="text-4xl md:text-5xl font-bold leading-tight mb-6"
              color="dark:text-violet-400"
            />
            <HighlightedText
              text={data.description}
              tag="p"
              className="text-lg mb-8"
              color="dark:text-violet-400"
            />
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {data.buttons.map((button: Button, index: number) =>
                button.url ? (
                  <Link
                    key={index}
                    href={button.url}
                    target={button.newTab ? "_blank" : "_self"}
                    //className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-center"
                    className={renderButtonStyle(button.type)}
                  >
                    {button.text}
                  </Link>
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}