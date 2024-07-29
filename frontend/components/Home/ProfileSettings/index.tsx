import { useEffect, useState } from "react"
import api from "@/lib/api"
import { toast } from "@/components/ui/use-toast"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Settings2 } from "lucide-react"
  

export default function ProfileSettings() {
    const [hours, setHours] = useState<string[]>([])

    useEffect(() => {
        api.getSettings().then((response) => {
            if (response.status) {
                setHours(response.settings.question_hours)
                console.log(hours)
            } else {
                toast({
                    title: "Ocorreu um erro",
                    description: response.error,
                    variant: "destructive"
                });
            }
        })
    }, [])

    return (
        <Drawer direction="right">
            <DrawerTrigger>
                <Button variant="outline" size="icon">
                    <Settings2 />
                </Button>
            </DrawerTrigger>

            <DrawerContent className="h-full">
                <DrawerHeader>
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>This action cannot be undone.</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <button>Submit</button>
                    <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
        // <div>
        //     {hours.map((hour) => (
        //         <p>{ hour }</p>
        //     ))}
        // </div>
    )
}