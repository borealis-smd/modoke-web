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
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import { signIn } from "next-auth/react";

const signupFormSchema = z.object({
  name: z
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
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof signupFormSchema>) {
    console.log(values);
  }

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleIconClick = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <div className="text-center mb-5">
        <h1 className="text-5xl font-bold">Cadastro</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-9 w-full">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    icon={<PersonOutlineOutlinedIcon />}
                    type="text"
                    placeholder="Digite seu nome..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <div className="flex flex-col justify-center gap-10">
            <Button type="submit" className="w-full">
              Criar conta
            </Button>
            <div className="flex items-center justify-center gap-3">
              <div className="h-[2px] max-w-[176px] w-full bg-gray-400"></div>
              <p className="text-slate-500">Ou continue com</p>
              <div className="h-[2px] max-w-[176px] w-full bg-gray-400"></div>
            </div>
            <div className="w-full text-center">
              <Button
                className="w-20 h-20 rounded-full p-5"
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/learn" })}
              >
                <GoogleIcon sx={{ width: 46, height: 46 }} />
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}

export default SignUpPage;
