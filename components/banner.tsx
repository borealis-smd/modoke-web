type Props = {
   title: string;
   //image: string;
}

export const Banner = ({ title }: Props) => {
   return (
      <div
         className="bg-green-700 w-full h-[8rem] lg:h-[10.5rem] flex items-center text-white px-6 py-5 rounded-lg"
         role="banner"
         aria-labelledby="section-header"
      >
         <h1 id="section-header" className="text-2xl lg:text-4xl font-semibold">
            {title}
         </h1>
      </div>
   );
};