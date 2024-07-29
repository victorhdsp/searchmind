"use client";

import { useToast } from "@/components/ui/use-toast";
import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { QuestionInterface } from "@/types/application";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import InputWithLabel from "@/components/InputWithLabel";
import { Plus, X } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const params = useSearchParams();
  const { toast } = useToast();
  const [words, setWords] = useState<string[]>([]);
  const [word, setWord] = useState<string>("");
  const uid = params.get("uid");

  function saveWord() {
    setWords([...words, word]);
    setWord("");
  }

  function deleteWord(index:number) {
    setWords(words.filter((_,id) => id !== index))
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (uid) {
      try {
        const {status, error} = await api.sendResponse(uid, words)
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
            <h1 className="">Resposta</h1>
          </div>
        </CardHeader>
        <CardContent className="px-11 pb-0 pt-8 h-full">
          <form 
            className="flex flex-col gap-3 h-full"
            onSubmit={onSubmit}
          >
            <div className="flex flex-col gap-3 mt-5">
              <div className="flex flex-wrap gap-3">
                {words.map((word, index) => (
                  <span
                    key={word}
                    className="
                      py-1 px-2 rounded-md 
                      bg-background-alt
                      flex gap-1 items-center
                    "
                  >
                    <p>{ word }</p>
                    <Button 
                      className="w-min h-min p-[2px]"
                      size="icon"
                      variant="ghost"
                      type="button"
                      onClick={() => deleteWord(index)}
                    >
                      <X size={14} />
                    </Button>
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-end gap-3 mt-auto">
              <InputWithLabel
                name="word"
                label="Quais foram as palavras memorizadas ?"
                placeholder="Palavra memorizada"
                className="w-full"
                onChange={(props) => setWord(props.target.value)}
                value={word}
              />
              <Button
                className="min-w-10"
                size="icon"
                type="button"
                onClick={() => saveWord()}
              >
                <Plus />
              </Button>
            </div>
            <Button>
              Enviar resposta
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
