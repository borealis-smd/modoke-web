"use client";

import { FeedWrapper } from "@/components/feed-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useRef, useEffect } from "react";
import { EyeIcon, EyeOffIcon, LogOut, Edit2 } from "lucide-react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import useAuth from "@/lib/hooks/useAuth";
import api from "@/lib/axios";

const Settings = () => {
  const token = useAuth();
  const email = useSession().data?.user.email;
  const isGoogleUser = useSession().data?.user.googleUser;

  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>(
    "/assets/default.png"
  ); // Imagem padrão
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click(); // Abre o seletor de arquivo ao clicar na imagem ou no ícone de edição
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedImage) {
      const formData = new FormData();
      formData.append("avatar", selectedImage);

      const { data } = await api.post("/upload/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      await api.put(
        "/user/",
        { avatar_url: data.imageUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    const oldPassword = (e.currentTarget as HTMLFormElement).oldPassword?.value;
    const newPassword = (e.currentTarget as HTMLFormElement).newPassword?.value;

    if (oldPassword && newPassword) {
      const response = await api.put(
        "/user/password",
        { email, oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 204) {
        console.log("Senha alterada com sucesso!");
      } else {
        console.error("Erro ao alterar senha.");
      }
    }
  };

  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      const { data: dbUser } = await api.get("/user/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const picture = dbUser.avatar_url;
      setPreviewImage(picture);
    };

    fetchUser();
  }, [token]);

  return (
    <div className="flex flex-col gap-8 px-6">
      <FeedWrapper>
        <h1 className="text-4xl font-bold mb-9 mt-7 text-primary">
          Configurações
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <h1 className="text-xl font-semibold mb-6 text-primary/80 border-b-2 pb-3">
            Conta
          </h1>
          <div className="flex flex-col gap-4 lg:w-3/6 items-start">
            {" "}
            {/* Alinha tudo à esquerda */}
            {/* Imagem de Perfil */}
            <div className="flex flex-col items-start">
              <div className="relative group w-[200px] h-[220px]">
                <Image
                  src={previewImage}
                  alt="Imagem de perfil do usuário"
                  width={200}
                  height={220}
                  className="w-full h-full object-cover rounded-lg cursor-pointer group-hover:ring-2 group-hover:ring-offset-2 group-hover:ring-primary"
                  onClick={handleImageClick}
                  role="button"
                  aria-label="Alterar imagem de perfil"
                />
                <div
                  className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={handleImageClick}
                  aria-label="Alterar imagem de perfil"
                >
                  <Edit2 className="h-6 w-6 text-white mb-2" />
                  <span className="text-white text-sm font-medium">
                    Alterar imagem de perfil
                  </span>
                </div>
              </div>
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
                aria-hidden="true"
              />
            </div>
            {!isGoogleUser && (
              <>
                {/* Senha Atual */}
                <label htmlFor="oldPassword" className="text-lg font-medium">
                  Senha atual:
                </label>
                <div className="relative">
                  <Input
                    id="oldPassword"
                    type={isOldPasswordVisible ? "text" : "password"}
                    placeholder="Digite sua senha atual"
                    aria-label="Senha atual"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    aria-label={
                      isOldPasswordVisible ? "Esconder senha" : "Mostrar senha"
                    }
                    className="absolute inset-y-0 right-0 flex items-center px-3"
                    onClick={() =>
                      setIsOldPasswordVisible(!isOldPasswordVisible)
                    }
                  >
                    {isOldPasswordVisible ? (
                      <EyeOffIcon className="h-5 w-5 text-slate-500" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-slate-500" />
                    )}
                  </button>
                </div>
                {/* Nova Senha */}
                <label htmlFor="newPassword" className="text-lg font-medium">
                  Nova Senha:
                </label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={isNewPasswordVisible ? "text" : "password"}
                    placeholder="Digite sua nova senha"
                    aria-label="Nova senha"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    aria-label={
                      isNewPasswordVisible ? "Esconder senha" : "Mostrar senha"
                    }
                    className="absolute inset-y-0 right-0 flex items-center px-3"
                    onClick={() =>
                      setIsNewPasswordVisible(!isNewPasswordVisible)
                    }
                  >
                    {isNewPasswordVisible ? (
                      <EyeOffIcon className="h-5 w-5 text-slate-500" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-slate-500" />
                    )}
                  </button>
                </div>
              </>
            )}
            <Button
              type="submit"
              variant="secondary"
              className="w-full lg:w-1/3"
            >
              Salvar
            </Button>
          </div>
        </form>

        <h1 className="mt-10 text-xl font-semibold mb-6 text-primary/80 border-b-2 pb-3">
          Outros
        </h1>

        <Button
          variant="dangerOutline"
          className="w-[10rem] justify-start hover:bg-red-50"
          onClick={() => signOut()}
        >
          <LogOut className="mr-2" />
          Sair
        </Button>
      </FeedWrapper>
    </div>
  );
};

export default Settings;
