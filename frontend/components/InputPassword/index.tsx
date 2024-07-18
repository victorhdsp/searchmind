"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye } from "lucide-react";

interface Props {
    name: string
    placeholder: string
    label: string
    disabled?: boolean
}

export default function InputPassword(props: Props) {
  const [type, setType] = useState<"password"|"text">("password")

  function changeType() {
    if (type == "password") setType("text");
    else if (type == "text") setType("password");
  }

  return (
    <div className="flex flex-col gap-3">
        <Label htmlFor={props.name}>
            {props.label}
        </Label>
        <span className="relative">
          <Input 
              name={props.name} 
              id={props.name} 
              placeholder={props.placeholder}
              type={type}
              onMouseLeave={() => setType("password")}
              required
              minLength={8}
              disabled={props.disabled}
          />
          <Button 
            variant={"ghost"} 
            size={"icon"}
            onClick={changeType}
            type="button"
            className="
              absolute right-2 top-1/2
              transform -translate-y-1/2 
              w-min h-min p-1
            "
          >
            <Eye size={20} />
          </Button>
        </span>
    </div>
  );
}
