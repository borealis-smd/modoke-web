import Image, { StaticImageData } from "next/image";

type Props = {
  title: string;
  subtitle?: string;
  variant: "section" | "revision";
  name?: string;
  image?: string | StaticImageData;
};

export const Banner = ({ title, variant, image, name = "usuário" }: Props) => {
  return (
    <div
      className="bg-primary w-full h-[8rem] lg:h-[10.5rem] flex items-center text-white px-6 py-5 rounded-lg justify-between relative overflow-hidden"
      role="banner"
      aria-labelledby="section-header"
    >
      {variant === "section" ? (
        <h1 id="section-header" className="text-2xl lg:text-4xl font-semibold">
          {title}
        </h1>
      ) : (
        <div className="flex flex-col space-y-2">
          <span className="font-medium text-md">Olá, {name}!</span>
          <h2
            id="section-header"
            className="text-2xl lg:text-4xl font-semibold"
          >
            {title}
          </h2>
        </div>
      )}

      {image && (
        <div className="absolute right-5 top-1/2 transform -translate-y-1/2 h-[8rem] lg:h-[55rem] w-[10rem] lg:w-[12rem] flex justify-center items-center">
          <Image
            src={image}
            alt="Banner"
            className="object-contain max-h-full max-w-full transition-transform duration-300 group-hover:scale-105 mt-20"
            width={500}
            height={500}
          />
        </div>
      )}
    </div>

  );
};
