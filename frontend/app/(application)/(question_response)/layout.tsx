"use client"

import { useToast } from "@/components/ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import api from "@/lib/api";

interface Props {
  children: Readonly<React.ReactNode>;
}

export default function Layout({children}:Props) {
  const router = useRouter();
  const params = useSearchParams();
  const { toast } = useToast();

  async function getQuestion() {
    const uid = params.get("uid");

    try {
      if (!uid) throw new Error("Uid não foi enviado");
      const {status, error} = await api.getQuestion(uid)
      if (!status) throw new Error(error);
    } catch (error: any) {
      const err: Error = error;
      toast({
        title: "Ocorreu um erro",
        description: err.message,
        variant: "destructive"
      })
      router.push("/");
    }
  }

  useEffect(() => { getQuestion() }, [])

  return (
    <>
      {children}
    </>
  );
}
