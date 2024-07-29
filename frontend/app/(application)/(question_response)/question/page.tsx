"use client";

import { useToast } from "@/components/ui/use-toast";
import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { QuestionInterface } from "@/types/application";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";

export default function Home() {
  const router = useRouter();
  const params = useSearchParams();
  const { toast } = useToast();
  const [question, setQuestion] = useState<QuestionInterface>();
  const uid = params.get("uid");

  useEffect(() => {
    if (!uid) throw new Error("Uid não foi enviado");
    api.getQuestion(uid).then(({question}) => {
      setQuestion(question);
    })
  }, [])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (uid) {
      try {
        const {status, error} = await api.readedQuestion(uid)
        if (!status) throw new Error(error);
        router.push("/");
      } catch (error: any) {
        const err: Error = error;
        toast({
          title: "Ocorreu um erro",
          description: err.message,
          variant: "destructive"
        })
      }
    }
  }

  return (
    <main className="flex min-h-screen">
      <Card className="w-[30rem] h-[70vh] m-auto py-14 rounded-x flex flex-col">
        <CardHeader className="px-11 py-0">
          <div className="grid grid-cols-2">
            <h1 className="">Pergunta</h1>
          </div>
        </CardHeader>
        <CardContent className="px-11 pb-0 pt-8 h-full">
          <form 
            className="flex flex-col gap-8 h-full"
            onSubmit={onSubmit}
          >
            <div className="flex flex-col gap-3">
              <p className="text-sm">
                Seu objetivo é memorizar as seguintes palavras:
              </p>
              <div className="flex flex-wrap gap-3">
                {question?.words.map((word) => (
                  <p key={word} className="py-1 px-2 rounded-md bg-background-alt">
                    {word}
                  </p>
                ))}
              </div>
            </div>
            <Button className="mt-auto">
              Memorizado
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
