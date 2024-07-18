"use client";

import InputPassword from "@/components/InputPassword";
import InputWithLabel from "@/components/InputWithLabel";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import api from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function SignUp() {
  const router = useRouter();
  const { toast } = useToast();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget;

    const data = {
      email: form.email.value,
      password: form.password.value,
      confirmPassword: form.confirmPassword.value
    }
    const response = await api.signup(data.email, data.password)
    if (response.status) {
      toast({ title: "Usuário criado com sucesso!" })
      router.push("/")
    } else {
      toast({
        title: "Ocorreu um erro!",
        description: response.error,
        variant: "destructive"
      })
    }
  }

  return (
    <main className="flex min-h-screen">
      <Card className="w-[30rem] h-min m-auto py-14 rounded-xl">
        <CardHeader className="px-11 py-0">
          <div className="grid grid-cols-2">
            <h1 className="">Criar conta</h1>
            <div className="w-max ml-auto">
              <p className="sm">Já tem uma conta?</p>
              <Link className="w-max" href="/entrar">
                <p className="sm">Entrar</p>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-11 pb-0 pt-8">
          <form 
            className="flex flex-col gap-8"
            onSubmit={onSubmit}
          >
            <InputWithLabel
              name="email"
              label="Coloque seu e-mail"
              placeholder="E-mail"
              type="email"
            />
            <InputPassword 
              name="password"
              label="Escolha sua senha"
              placeholder="Senha"
            />
            <InputPassword
              name="confirmPassword"
              label="Confirme sua senha"
              placeholder="Senha"
              disabled
            />
            <Button>
              Criar conta
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
