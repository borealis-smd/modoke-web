type Props = {
   title: string;
   subtitle?: string;
   variant: "session" | "revision";
   //image: string;
}

export const Banner = ({ title, variant }: Props) => {
   return (
      <div
         className="bg-primary w-full h-[8rem] lg:h-[10.5rem] flex items-center text-white px-6 py-5 rounded-lg"
         role="banner"
         aria-labelledby="section-header"
      >
         {variant === "session" ? (
            <h1 id="section-header" className="text-2xl lg:text-4xl font-semibold">
               {title}
            </h1>
         ) : (
            <div className="flex flex-col space-y-2">
               <span className="font-medium text-md">Hey, @Modoke!</span>
               <h2 id="section-header" className="text-2xl lg:text-4xl font-semibold">
                  {title}
               </h2>
            </div>
         )
         }
      </div>
   );
};