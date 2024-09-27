import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import modokePC from "@/public/assets/modokeDog/Ilustração Modoke saindo do pc (landing page) - Ajustado.png";
import badge1 from "@/public/assets/badge-a.png";
import badge2 from "@/public/assets/badge-aaa.png";
import badge3 from "@/public/assets/badge-ace.png";
import badge4 from "@/public/assets/badge-beInclusive.png";

import badge5 from "@/public/assets/badge-code.png";
import badge6 from "@/public/assets/badge-web4all.png";
import badge7 from "@/public/assets/badge-AA.png";

import badge8 from "@/public/assets/badge-WCAG.png";
import badge9 from "@/public/assets/badge-midia.png";
import badge10 from "@/public/assets/badge-som.png";

import modoke from "@/public/assets/modokeDog/Oi.png";
import modokeEmblema from "@/public/assets/modokeDog/Ilustração Teste de Familiaridade - Início - Ajustado.png";

const sessions = [
  { label: "A", sub: "Iniciante", p: "Básico e essencial, mas ainda exclui alguns usuários." },
  { label: "AA", sub: "Intermediário", p: "Recomendado, equilibrado entre inclusão e facilidade de implementação." },
  { label: "AAA", sub: "Avançado", p: "Mais inclusivo, porém complexo e não obrigatório." },
];

export default function Home() {
  return (
    <main className="flex flex-col space-y-5">
      {/* Hero Action */}
      <section className="flex mt-10 w-full justify-center lg:justify-between items-center" id="home" role="banner">
        <div className="space-y-4 w-full 2xl:w-[57.9375rem] lg:w-6/12">
          <h1 className="font-bold text-primary text-4xl lg:text-6xl" tabIndex={0}>
            Que tal tornar a web mais <span className="relative inline-block">
              <span className="relative z-10">inclusiva?</span>
              <span className="absolute flex bottom-1 z-0 h-5 w-full bg-secondary100"></span>
            </span>
          </h1>
          <p className="text-xl">Dê seus primeiros passos no desenvolvimento web acessível com modoke.</p>
          <Link href="/signup/test">
            <Button
              type="button"
              variant="secondary"
              className="text-secondary-foreground font-medium w-[13.8125rem] h-[3.125rem] mt-4"
            >
              Comece agora
            </Button>
          </Link>
        </div>

        <div className="hidden 2xl:w-full lg:flex justify-end w-6/12" aria-hidden="true">
          <Image src={modokePC} alt="Person working on a computer with accessibility features" width={822} height={822} />
        </div>
      </section>

      {/* O que é acessibilidade? */}
      <section className="relative flex w-full justify-center items-center" id="acessibility">
        <div className="space-y-9 mt-60 my-48 w-[57.9375rem] flex flex-col justify-center items-center">
          <h1 className="font-bold text-primary text-3xl lg:text-7xl" tabIndex={0}>
            O que é{" "}
            <span className="relative inline-block">
              <span className="relative z-10">acessibilidade?</span>
              <span className="absolute flex bottom-1 z-0 h-5 w-full bg-secondary100"></span>
            </span>
          </h1>
          <p className="text-xl text-center">
            No desenvolvimento web, acessibilidade envolve criar aplicações que sejam o mais inclusivas possível, independentemente das capacidades físicas e cognitivas do usuário final e da maneira como ele acessa a web.
          </p>
          <Link href="/signup/test">
            <Button
              type="button"
              variant="secondary"
              className="text-secondary-foreground font-medium h-[3.125rem] mt-2"
            >
              Teste seu conhecimento
            </Button>
          </Link>
        </div>

        {/* Emblemas flutuantes */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src={badge1}
            alt=""
            className="absolute top-10 -left-20 w-50 h-50 transform -translate-x-20 -translate-y-15 -rotate-12"
          />
          <Image
            src={badge2}
            alt=""
            className="absolute top-0 right-0 w-50 h-50 transform translate-x-14 rotate-12"
          />
          <Image
            src={badge9}
            alt=""
            className="absolute bottom-10 left-0 w-50 h-50 transform -translate-x-10 -rotate-12"
          />
          <Image
            src={badge4}
            alt=""
            className="absolute bottom-10 right-10 w-50 h-50 transform translate-x-10 rotate-12"
          />
        </div>
      </section>


      {/* Qual a importância da acessibilidade? */}
      <section className="flex flex-col lg:flex-row w-full justify-between items-center min-h-[40rem]" role="complementary">
        <div className="mr-12 space-y-9 mt-20 mb-60 w-6/12 flex flex-col justify-center items-start">
          <h1 className="font-bold text-primary text-6xl">
            Qual a <span className="relative inline-block">
              <span className="relative z-10">importância</span>
              <span className="absolute flex bottom-1 z-0 h-5 w-full bg-secondary100"></span>
            </span>
            <br /> da acessibilidade?
          </h1>
          <p className="text-lg">
            Desenvolver aplicações web acessíveis não só torna a World Wide Web mais inclusiva para todos, mas também se destaca como um diferencial valorizado por empresas de grande porte para seus desenvolvedores.
          </p>
        </div>

        <div className="flex justify-end items-center w-6/12">
          <iframe
            className="w-[90rem] h-[30rem] object-fill"
            src="https://www.youtube.com/embed/5H1JGdqLrWo?si=jozwBy_KkqMba_3M"
            title="YouTube video player about accessibility"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            aria-label="Video explaining the importance of web accessibility"
          ></iframe>
        </div>
      </section>

      {/* Frase */}
      <section className="relative flex w-full justify-center items-center">
        <div className="space-y-9 mt-60 my-48 w-[65rem] flex flex-col justify-center items-center">
          <span className="text-primary text-5xl text-center font-semibold">
            “O poder da Web está na sua universalidade. O acesso por todas as pessoas, não obstante a sua deficiência, é um aspecto essencial.”
          </span>
          <p className="text-xl text-center text-primary font-medium">
            Tim Berners-Lee - Criador da World Wide Web
          </p>
        </div>

        {/* Emblemas flutuantes */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src={badge5}
            alt=""
            className="absolute top-10 -left-20 w-50 h-50 transform -translate-x-20 -translate-y-15 -rotate-12"
          />
          <Image
            src={badge7}
            alt=""
            className="absolute top-0 right-0 w-50 h-50 transform translate-x-14 rotate-12"
          />
          <Image
            src={badge10}
            alt=""
            className="absolute bottom-10 left-0 w-50 h-50 transform -translate-x-10 -rotate-12"
          />
          <Image
            src={badge6}
            alt=""
            className="absolute bottom-10 right-10 w-50 h-50 transform translate-x-10 rotate-12"
          />
        </div>
      </section>

      {/* O que é Modoke? */}
      <section className="flex w-full justify-between items-center min-h-[40rem]" id="modoke">
        <div className="mr-12 space-y-9 mt-20 mb-60 w-6/12 flex flex-col justify-center items-start">
          <h1 className="font-bold text-primary text-6xl">
            O que é <span className="relative inline-block">
              <span className="relative z-10">Modoke</span>
              <span className="absolute flex bottom-1 z-0 h-5 w-full bg-secondary100"></span>
            </span>
            ?
          </h1>
          <p className="text-lg">
            Modoke é sua companhia, ele visa tornar a web um lugar mais inclusivo. Aqui, Modoke te ensina os princípios e diretrizes da acessibilidade de um jeito que você pode aplicar diretamente nos seus projetos. Vamos descobrir como funciona?
          </p>
          <span className="text-sm">* Modoke vem do japonês “modoken”, que significa cão guia.</span>
        </div>

        <div className="flex justify-end items-center w-6/12" aria-hidden="true">
          <Image src={modoke} alt="Illustration of Modoke guiding users through accessibility" width={822} height={822} />
        </div>
      </section>

      {/* Sessões*/}
      <section className="relative flex w-full justify-center items-center">
        <div className="space-y-9 my-36 w-[57.9375rem] flex flex-col justify-center items-center">
          <h1 className="font-bold text-primary text-5xl">Progresso em seções</h1>

          <div className="flex gap-5">
            {sessions.map((session) => (
              <div
                key={session.label}
                className="h-[22.875rem] bg-secondary100 w-[20.4rem] rounded-xl p-10 text-center flex flex-col justify-center text-secondary-foreground hover:bg-secondary50"
                role="article"
                tabIndex={0}
              >
                <h1 className="font-semibold text-8xl">{session.label}</h1>
                <span className="mt-1 text-lg">{session.sub}</span>
                <p className="mt-2 text-lg leading-9">{session.p}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Emblemas flutuantes */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src={badge5}
            alt=""
            className="absolute -top-56 -left-10 w-50 h-50 transform -translate-x-50 -translate-y-15 -rotate-12"
          />
          <Image
            src={badge8}
            alt=""
            className="absolute top-0 right-0 w-50 h-50 transform translate-x-14 rotate-12"
          />
          <Image
            src={badge3}
            alt=""
            className="absolute -bottom-20 left-0 w-50 h-50 transform -translate-x-10 -rotate-12"
          />
        </div>
      </section>

      {/* Categoria*/}
      <section className="flex w-full justify-center items-center">
        <div className="space-y-9 my-36 w-[57.9375rem] flex flex-col justify-center items-center">
          <h1 className="font-bold text-primary text-5xl text-center">
            Aprenda com categorias que você já conhece
          </h1>

          {/* Grid de Categorias */}
          <div className="grid grid-cols-4 gap-2 w-full">
            {[
              "Conteúdo",
              "Código global",
              "Teclado",
              "Imagens",
              "Títulos",
              "Listas",
              "Controles",
              "Tabelas",
              "Formulários",
              "Mídia",
              "Vídeo",
              "Áudio",
              "Aparência",
              "Animações",
              "Contraste de cor",
              "Mobile e touch",
            ].map((categoria) => (
              <div
                key={categoria}
                className="flex justify-center items-center bg-primary text-primary-foreground font-medium h-20 rounded-md hover:bg-primary/90"
                tabIndex={0}
              >
                {categoria}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificados */}
      <section className="flex w-full justify-center items-center">
        <div className="space-y-9 my-28 w-[57.9375rem] flex flex-col justify-center items-center">
          <h1 className="font-bold text-primary text-5xl text-center">Ganhe emblemas colecionáveis!</h1>

          <div className="flex justify-center items-center w-full" aria-hidden="true">
            <Image src={modokeEmblema} alt="Illustration of Modoke with badges and certificates" width={522} height={522} />
          </div>
        </div>
      </section>
    </main>
  );
}
