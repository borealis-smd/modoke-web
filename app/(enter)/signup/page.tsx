"use client";

import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useTest } from "../TestContext";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import Link from "next/link";

const signupFormSchema = z.object({
  first_name: z
    .string({ message: "Nome é obrigatório." })
    .min(2, "Nome muito curto."),
  last_name: z
    .string({ message: "Nome é obrigatório." })
    .min(2, "Nome muito curto."),
  email: z.string().email("Endereço de e-mail inválido."),
  password: z
    .string()
    .refine(
      (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        ),
      {
        message:
          "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.",
      }
    ),
});

function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleIconClick = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const { level, setLevel } = useTest();

  useEffect(() => {
    if (!level) {
      router.push("/signup/test");
    }
  }, [level]);

  const levels = [
    { level: "A", description: "Iniciante" },
    { level: "AA", description: "Intermediário" },
    { level: "AAA", description: "Avançado" },
  ];

  const handleSignUp = async (values: z.infer<typeof signupFormSchema>) => {
    const levelId = levels.findIndex((item) => item.level === level) + 1;
    try {
      const response = await api.post("/user/", {
        user: {
          first_name: values.first_name,
          last_name: values.last_name,
          avatar_url:
            "https://projeto-modoke.s3.us-east-2.amazonaws.com/default.png",
          level_id: levelId,
        },
        login: {
          email: values.email,
          password: values.password,
        },
      });

      if (response.status === 201) {
        router.push("/signin");
        return;
      }

      setLevel("");
    } catch (error) {
      setError(
        "Infelizmente não foi possível criar sua conta agora. Tente novamente."
      );
      console.error(error);
    }
  };

  const handleGoogleSignUp = () => {
    const index = levels.findIndex((item) => item.level === level) + 1;

    const expires = new Date(Date.now() + 60 * 1000).toUTCString();
    document.cookie = `level=${index};path=/;expires=${expires}`;

    try {
      signIn("google", { callbackUrl: `/learn` });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[30rem] mt-8">
      <div className="text-center mb-5">
        <h1 className="text-5xl font-bold text-primary">Cadastro</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSignUp)}
          className="text-[#333333]"
        >
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="mb-2 w-full">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      icon={<PersonOutlineOutlinedIcon />}
                      type="text"
                      placeholder="Digite seu nome..."
                      {...field}
                      className="h-[3rem]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem className="mb-2 w-full">
                  <FormLabel>Sobrenome</FormLabel>
                  <FormControl>
                    <Input
                      icon={<PersonOutlineOutlinedIcon />}
                      type="text"
                      placeholder="Digite seu sobrenome..."
                      {...field}
                      className="h-[3rem]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    icon={<EmailOutlinedIcon />}
                    type="email"
                    placeholder="Digite seu e-mail..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    type={isPasswordVisible ? "text" : "password"}
                    icon={
                      isPasswordVisible ? (
                        <VisibilityOutlinedIcon
                          className="cursor-pointer"
                          onClick={handleIconClick}
                        />
                      ) : (
                        <VisibilityOffOutlinedIcon
                          className="cursor-pointer"
                          onClick={handleIconClick}
                        />
                      )
                    }
                    placeholder="Digite sua senha..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                {error && <p className="text-destructive">{error}</p>}
              </FormItem>
            )}
          />
          <div className="flex justify-end align-end mb-6">
            <Link href="/signin">
              <span className="text-[#858484] underline hover:text-secondary-foreground text-sm text-end right-0">Já possui conta? Clique aqui</span>
            </Link>
          </div>
          <div className="flex flex-col justify-center gap-8">
            <Button type="submit" className="w-full" variant={"secondary"}>
              Criar conta
            </Button>
            <div className="flex items-center justify-center gap-3">
              <div className="h-[2px] max-w-[176px] w-full bg-[#33333394]"></div>
              <p className="text-[#33333394]">Ou continue com</p>
              <div className="h-[2px] max-w-[176px] w-full bg-[#33333394]"></div>
            </div>
            <div className="w-full text-center -mt-5">
              <Button
                className="w-16 h-16 rounded-full p-4 border-2 border-[#dbdbdb]"
                type="button"
                onClick={() => handleGoogleSignUp()}
              >
                <Image
                  src="/assets/google-icon.svg"
                  alt="Logo do Google"
                  width={30}
                  height={30}
                />
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default SignUpPage;