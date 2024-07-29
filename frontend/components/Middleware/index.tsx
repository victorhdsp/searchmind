"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";

export default function Middleware() {
    const {toast} = useToast();
    const router = useRouter();

    useEffect(() => {
        api.getHistory().then((response) => {
            if (response.status) {
                console.log("Conectado")
            } else {
                api.resetToken().then((response) => {
                    if (response.status) {
                        console.log("Token atualizado") 
                    } else {
                        toast({
                            title: "Ocorreu um erro",
                            description: response.error,
                            variant: "destructive"
                        });
                        router.push("/entrar");
                    }
                })
            }
        })
    }, [])

    return (
        <></>
    );
}
