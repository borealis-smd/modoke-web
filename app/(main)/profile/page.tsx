import { FeedWrapper } from "@/components/feed-wrapper";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Bolt from "@mui/icons-material/Bolt";
import Check from "@mui/icons-material/Check";
import { Button } from "@/components/ui/button";

const Profile = () => {
   const isEmblem = true;
   const isCertificate = false;

   return (
      <div className="flex flex-col-reverse lg:flex-row-reverse gap-12 lg:gap-48 ">
         <FeedWrapper>
            <section className="flex-1 p-4 lg:p-8">
               <article className="border-2 border-slate-300/40 p-6 lg:p-[1.125rem] rounded-md">
                  {/* Profile Header */}
                  <header className="flex flex-col lg:flex-row items-start lg:items-center gap-6 mb-4">
                     <div className="w-full lg:w-[13.875rem] h-[13.6875rem] bg-gray-300 rounded-lg">
                        {/* Profile Image */}
                        <Image
                           src="https://goldenjoy.com.br/wp-content/uploads/2022/08/fuca-2491995_1280-1024x768.jpg"
                           alt="Perfil de Modoken"
                           width={200}
                           height={220}
                           className="w-full h-full object-cover rounded-lg"
                        />
                     </div>

                     {/* Profile Info */}
                     <div className="w-full pr-4">
                        <h1 className="text-[1.75rem] lg:text-[2.25rem] font-semibold">Modoken</h1>
                        <p className="text-gray-500 flex text-lg lg:text-xl mt-2">
                           Nível:
                           <span className="bg-secondary50 text-secondary-foreground px-2 w-[2.4375rem] flex items-center justify-center rounded-md ml-2">A</span>
                        </p>

                        {/* Progress Bar */}
                        <div className="w-full lg:w-5/6 mt-4">
                           <div className="flex justify-between items-center mb-1">
                              <span className="text-sm text-gray-500">Progresso</span>
                              <span className="text-sm text-gray-500">20%</span>
                           </div>
                           <Progress value={20} className="w-full" aria-label="Progresso do perfil" />
                        </div>

                        {/* Stats */}
                        <div className="flex lg:flex-row gap-4 mt-8">
                           <div className="flex items-center justify-around bg-secondary200 px-2 h-[2rem] w-full lg:w-[7.375rem] rounded-md" aria-label="Experiência">
                              <Bolt aria-hidden="true" />
                              <span className="text-sm lg:text-base">100 xp</span>
                           </div>
                           <div className="flex items-center justify-around bg-secondary200 px-2 h-[2rem] w-full lg:w-[7.375rem] rounded-md" aria-label="Lições Completas">
                              <Check aria-hidden="true" />
                              <span className="text-sm lg:text-base">12 lições</span>
                           </div>
                        </div>
                     </div>
                  </header>
               </article>

               {/* Emblems and Certificates Section */}
               <section className="flex flex-col lg:flex-row gap-4 mt-6" aria-labelledby="emblems-certificates">
                  {/* Emblems */}
                  <article className="bg-white border-2 border-slate-100 rounded-md flex-1" role="region" aria-labelledby="emblems-title">
                     <h2 id="emblems-title" className="mb-4 text-lg font-medium bg-primary p-4 rounded-t-md text-white">Emblemas</h2>
                     <div className="p-4 lg:p-[1.125rem]">
                        <div className="flex flex-col items-center w-full">
                           {isEmblem ? (
                              <div className="grid grid-cols-4 gap-4">
                                 {[...Array(8)].map((_, i) => (
                                    <div key={i} className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-300 rounded-full" role="img" aria-label={`Emblema ${i + 1}`} aria-hidden="true"></div>
                                 ))}
                              </div>
                           ) : (
                              <p className="text-gray-500 text-center">Nenhum emblema conquistado</p>
                           )}
                        </div>
                     </div>
                  </article>

                  {/* Certificates */}
                  <article className="bg-white border-2 border-slate-100 rounded-md flex-1" role="region" aria-labelledby="certificates-title">
                     <h2 id="certificates-title" className="mb-4 text-lg font-medium bg-primary p-4 rounded-t-md text-white">Certificados</h2>
                     <div className="p-4 lg:p-[1.125rem]">
                        <div className="flex flex-col items-center w-full">
                           {isCertificate ? (
                              <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 overflow-x-auto">
                                 {[...Array(3)].map((_, i) => (
                                    <Button
                                       variant="default"
                                       key={i}
                                       className="w-72 h-32 lg:w-32 lg:h-20 bg-gray-300 rounded-md hover:bg-gray-400"
                                       aria-label={`Certificado ${i + 1}`}
                                    >
                                       Certificado {i + 1}
                                    </Button>
                                 ))}
                              </div>
                           ) : (
                              <p className="text-gray-500 text-center">Nenhum certificado conquistado</p>
                           )}
                        </div>
                     </div>
                  </article>
               </section>
            </section>
         </FeedWrapper>
      </div>
   );
};

export default Profile;
