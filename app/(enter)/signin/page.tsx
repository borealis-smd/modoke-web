"use client";

import React, { useState } from "react";
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
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const signinFormSchema = z.object({
  email: z
    .string({ message: "E-mail obrigatório." })
    .email("Endereço de e-mail inválido."),
  password: z
    .string({ message: "Senha é obrigatória." })
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

function SignInPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signinFormSchema>>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signinFormSchema>) {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        console.error(result.error);
      } else {
        router.push("/learn");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleIconClick = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <div className="text-center mb-5">
        <h1 className="text-5xl font-bold text-primary">Login</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="text-[#333333]">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-9">
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
              <FormItem className="mb-10">
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
              </FormItem>
            )}
          />
          <div className="flex flex-col justify-center gap-8">
            <Button type="submit" className="w-full" variant={"secondary"}>
              Entrar
            </Button>
            <div className="flex items-center justify-center gap-3">
              <div className="h-[2px] max-w-[176px] w-full bg-[#333333]"></div>
              <p className="text-[#333333]">Ou continue com</p>
              <div className="h-[2px] max-w-[176px] w-full bg-[#333333]"></div>
            </div>
            <div className="w-full text-center">
              <Button
                className="w-20 h-20 rounded-full p-4 border-2 border-[#dbdbdb]"
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/learn" })}
              >
                <Image
                  src="/assets/google-icon.svg"
                  alt="Logo do Google"
                  width={40}
                  height={40}
                />
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}

export default SignInPage;
