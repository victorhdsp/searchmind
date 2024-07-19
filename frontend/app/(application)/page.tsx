"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";
import { Settings2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const {toast} = useToast();
  const router = useRouter();
  const [history, setHistory] = useState([]);
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    (async () => {
      const historyResponse = await api.getHistory()
      if (historyResponse.status) {
        setHistory(historyResponse.history)
      } else {
        toast({
          title: "Ocorreu um erro",
          description: historyResponse.error,
          variant: "destructive"
        })
        router.push("/entrar");
      }

     const questionResponse = await api.getQuestion()
      if (questionResponse.status) {
        setQuestion(questionResponse.question)
      }
    })()
  }, [])

  return (
    <main className="w-full min-h-screen">
      <div className="grid grid-cols-3 h-screen">
        <h2 className="col-span-2 flex justify-center items-center">
          Em breve
        </h2>
        <div className="
          bg-background
          flex flex-col gap-8
          h-full
          p-8
        ">
          <div className="flex justify-between">
            <h2>Perfil</h2>
            <Button className="bg-zinc-200" variant="link" size="icon">
              <Settings2 className="text-black" size={20} />
            </Button>
          </div>
          {/* <div className="flex gap-4 items-center">
            <h4>01</h4>
            <Progress value={50} />
          </div> */}
          <h4>Em breve</h4>
        </div>
      </div>
    </main>
  );
}
