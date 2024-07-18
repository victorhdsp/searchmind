"use client";

import InputPassword from "@/components/InputPassword";
import InputWithLabel from "@/components/InputWithLabel";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

export default function SignIn() {
  const router = useRouter()
  const { toast } = useToast()
  
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget;
    
    const data = {
      email: form.email.value,
      password: form.password.value
    }

    const response = await api.signin(data.email, data.password);
    if (response.status) {
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
            <h1 className="">Entrar</h1>
            <div className="w-max ml-auto">
              <p className="sm">Não tem uma conta?</p>
              <Link className="w-max" href="/criar-conta">
                <p className="sm">Criar conta</p>
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
            <Link className="w-max ml-auto -mt-5" href="/esqueci-minha-senha">
              <p className="xs">Esqueci minha senha</p>
            </Link>
            <Button>
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
