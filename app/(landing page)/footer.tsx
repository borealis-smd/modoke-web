import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="hidden lg:flex h-20 w-full bg-secondary300 justify-between items-center py-[1rem] px-2 lg:px-[5.9375rem] font-medium">
      <span>Trabalho final Projeto Integrado I</span>
      <span>Modoke © 2024</span>
      <Link href="/team" className="hover:font-semibold" aria-label="Conheça a equipe e idealizadores">
        Conheça a equipe e idealizadores
      </Link>
    </footer>
  );
};
