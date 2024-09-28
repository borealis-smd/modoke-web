import { Button } from "@/components/ui/button";
import Image from "next/image";


export default function Team() {
   return (
      <>
         {/* Sobre nós */}
         <section className="relative flex w-full justify-center items-center" id="acessibility" aria-labelledby="sobre-nos">
            <div className="space-y-9 mt-60 my-48 w-[57.9375rem] flex flex-col justify-center items-center">
               <h1 id="sobre-nos" className="font-bold text-primary text-3xl lg:text-7xl" tabIndex={0}>
                  <span className="relative inline-block">
                     <span className="relative z-10">Sobre nós</span>
                     <span className="absolute flex bottom-1 z-0 h-5 w-full bg-secondary100"></span>
                  </span>
               </h1>
               <p className="text-xl text-center">
                  Somos alunos do 3º semestre do curso de <strong>Sistemas e Mídias Digitais</strong> da Universidade Federal do Ceará (UFC), participando da disciplina de Projeto Integrado I. Nosso projeto é um guia que ajuda desenvolvedores web a tornar a internet mais acessível e inclusiva.
               </p>
            </div>

            {/* Emblemas flutuantes */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
               <Image
                  src={"https://projeto-modoke.s3.us-east-2.amazonaws.com/badges/badge-a.png"}
                  alt="Badge A"
                  width={200}
                  height={200}
                  className="absolute top-10 -left-20 w-50 h-50 transform -translate-x-20 -translate-y-15 -rotate-12"
               />
               <Image
                  src={
                     "https://projeto-modoke.s3.us-east-2.amazonaws.com/badges/badge-AA.png"
                  }
                  width={240}
                  height={240}
                  alt="Badge AAA"
                  className="absolute top-0 right-0 w-50 h-50 transform translate-x-14 rotate-12"
               />
               <Image
                  src={"https://projeto-modoke.s3.us-east-2.amazonaws.com/badges/badge-midia.png"}
                  alt="Badge Mídia"
                  width={240}
                  height={240}
                  className="absolute -bottom-20 left-0 w-50 h-50 transform -translate-x-10 -rotate-12"
               />
               <Image
                  src={"https://projeto-modoke.s3.us-east-2.amazonaws.com/badges/badge-beInclusive.png"}
                  alt="Badge BeInclusive"
                  width={240}
                  height={240}
                  className="absolute -bottom-10 right-10 w-50 h-50 transform translate-x-10 rotate-12"
               />
            </div>
         </section>

         {/* Idealizadores */}
         <section className="flex flex-col w-full justify-center items-center my-48" id="acessibility" aria-labelledby="idealizadores">
            <div className="space-y-9 w-[57.9375rem] flex flex-col justify-center items-center">
               <h1 id="idealizadores" className="font-bold text-primary text-3xl lg:text-7xl" tabIndex={0}>
                  <span className="relative inline-block">
                     <span className="relative z-10">Orientadores</span>
                     <span className="absolute flex bottom-1 z-0 h-5 w-full bg-secondary100"></span>
                  </span>
               </h1>
               <p className="text-xl text-center">
                  Durante o desenvolvimento do projeto, tivemos o apoio dos professores Henrique Pequeno e Inga Saboia, que nos orientaram ao longo da disciplina, proporcionando suporte para a concretização da nossa ideia. Além disso, contamos com a colaboração da Ticiane Darin, nossa cliente, que acompanhou o desenvolvimento da aplicação.
               </p>
            </div>

            {/* Idealizadores */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
               {/* Cada perfil dos idealizadores */}
               <div className="flex flex-col items-center text-center space-y-3">
                  <Image
                     src={"https://projeto-modoke.s3.us-east-2.amazonaws.com/team/henrique_pequeno.png"}
                     alt="Perfil de Henrique Pequeno"
                     width={200}
                     height={220}
                     className="w-[14rem] h-[14rem] object-cover rounded-lg"
                  />
                  <h3 className="text-lg font-semibold">Henrique Pequeno</h3>
                  <p className="text-sm text-gray-500">Orientador</p>
               </div>
               <div className="flex flex-col items-center text-center space-y-3">
                  <Image
                     src={"https://projeto-modoke.s3.us-east-2.amazonaws.com/team/inga.jpg"}
                     alt="Perfil de Inga Saboia"
                     width={200}
                     height={220}
                     className="w-[14rem] h-[14rem] object-cover rounded-lg"
                  />
                  <h3 className="text-lg font-semibold">Inga Saboia</h3>
                  <p className="text-sm text-gray-500">Orientadora</p>
               </div>
               <div className="flex flex-col items-center text-center space-y-3">
                  <Image
                     src={"https://projeto-modoke.s3.us-east-2.amazonaws.com/team/tici.jpg"}
                     alt="Perfil de Ticianne Darin"
                     width={200}
                     height={220}
                     className="w-[14rem] h-[14rem] object-cover rounded-lg"
                  />
                  <h3 className="text-lg font-semibold">Ticianne Darin</h3>
                  <p className="text-sm text-gray-500">Cliente</p>
               </div>
            </div>
         </section>

         <section className="relative flex w-full justify-center items-center" id="acessibility" aria-labelledby="integrantes">
            <div className="space-y-9 mt-0 my-48 w-[57.9375rem] flex flex-col justify-center items-center">
               <h1 id="integrantes" className="font-bold text-primary text-3xl lg:text-7xl" tabIndex={0}>
                  <span className="relative inline-block">
                     <span className="relative z-10">Integrantes</span>
                     <span className="absolute flex bottom-1 z-0 h-5 w-full bg-secondary100"></span>
                  </span>
               </h1>

               {/* Grid para todos os perfis */}
               <div className="flex flex-col gap-8 mt-4 justify-center">
                  <div className="flex gap-2" role="group" aria-labelledby="perfil-giovana">
                     {/* Perfil de Giovana Fontes */}
                     <div id="perfil-giovana" className="flex flex-col items-center text-center space-y-2">
                        <Image
                           src={"https://projeto-modoke.s3.us-east-2.amazonaws.com/team/gio.jpeg"}
                           alt="Perfil de Giovana Fontes"
                           width={200}
                           height={220}
                           className="w-[14rem] h-[14rem] object-cover rounded-lg"
                        />
                        <h3 className="text-lg font-semibold">Giovana Fontes</h3>
                        <p className="text-sm text-gray-500">Líder | Designer | Conteudista</p>
                     </div>

                     {/* Perfil de Letícia Rodrigues */}
                     <div id="perfil-leticia" className="flex flex-col items-center text-center space-y-2">
                        <Image
                           src={"https://projeto-modoke.s3.us-east-2.amazonaws.com/team/leti.jpg"}
                           alt="Perfil de Letícia Rodrigues"
                           width={200}
                           height={220}
                           className="w-[14rem] h-[14rem] object-cover rounded-lg"
                        />
                        <h3 className="text-lg font-semibold">Letícia Rodrigues</h3>
                        <p className="text-sm text-gray-500">Designer | Dev frontend | Ilustradora</p>
                     </div>

                     {/* Perfil de Ana Letícia Costa */}
                     <div id="perfil-ana" className="flex flex-col items-center text-center space-y-2">
                        <Image
                           src={"https://projeto-modoke.s3.us-east-2.amazonaws.com/team/ticia.jpg"}
                           alt="Perfil de Ana Letícia Costa"
                           width={200}
                           height={220}
                           className="w-[14rem] h-[14rem] object-cover rounded-lg"
                        />
                        <h3 className="text-lg font-semibold">Ana Letícia Costa</h3>
                        <p className="text-sm text-gray-500">Designer | Conteudista</p>
                     </div>
                  </div>

                  <div className="flex gap-4 justify-center items-center w-full" role="group" aria-labelledby="perfil-jomar">
                     {/* Perfil de João Marcos Moura */}
                     <div id="perfil-jomar" className="flex flex-col items-center text-center space-y-2">
                        <Image
                           src={"https://projeto-modoke.s3.us-east-2.amazonaws.com/team/gio.jpeg"}
                           alt="Perfil de João Marcos Moura"
                           width={200}
                           height={220}
                           className="w-[14rem] h-[14rem] object-cover rounded-lg"
                        />
                        <h3 className="text-lg font-semibold">João Marcos Moura</h3>
                        <p className="text-sm text-gray-500">Dev fullstack</p>
                     </div>

                     {/* Perfil de Matheus Pinheiro */}
                     <div id="perfil-mat" className="flex flex-col items-center text-center space-y-2">
                        <Image
                           src={"https://projeto-modoke.s3.us-east-2.amazonaws.com/team/mat.jpg"}
                           alt="Perfil de Matheus Pinheiro"
                           width={200}
                           height={220}
                           className="w-[14rem] h-[14rem] object-cover rounded-lg"
                        />
                        <h3 className="text-lg font-semibold">Matheus Pinheiro</h3>
                        <p className="text-sm text-gray-500">Editor | Conteudista</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Emblemas flutuantes */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
               <Image
                  src={"https://projeto-modoke.s3.us-east-2.amazonaws.com/badges/badge-code.png"}
                  alt="Badge WCAG"
                  width={240}
                  height={240}
                  className="absolute top-10 -left-15 w-50 h-50 transform -translate-x-20 -translate-y-15 -rotate-12"
               />
               <Image
                  src={"https://projeto-modoke.s3.us-east-2.amazonaws.com/badges/badge-web4all.png"}
                  alt="Badge Code"
                  width={240}
                  height={240}
                  className="absolute top-0 right-0 w-50 h-50 transform translate-x-14 rotate-12"
               />
               <Image
                  src={"https://projeto-modoke.s3.us-east-2.amazonaws.com/badges/badge-beInclusive.png"}
                  alt="Badge Web4All"
                  width={240}
                  height={240}
                  className="absolute bottom-10 left-0 w-50 h-50 transform -translate-x-10 -rotate-12"
               />
               <Image
                  src={"https://projeto-modoke.s3.us-east-2.amazonaws.com/badges/badge-ace.png"}
                  alt="Badge ACE"
                  width={200}
                  height={200}
                  className="absolute bottom-10 right-10 w-50 h-50 transform translate-x-10 rotate-12"
               />
            </div>
         </section>
      </>
   );
}
