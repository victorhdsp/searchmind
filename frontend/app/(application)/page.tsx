"use client";

import ProfileAside from "@/components/Home/ProfileAside";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const {toast} = useToast();
  const router = useRouter();
  const [history, setHistory] = useState([]);

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
    })()
  }, [])

  return (
    <main className="w-full min-h-screen">
      <div className="grid grid-cols-3 h-screen">
        <h2 className="col-span-2 flex justify-center items-center">
          Em breve
        </h2>
        <ProfileAside />
      </div>
    </main>
  );
}
