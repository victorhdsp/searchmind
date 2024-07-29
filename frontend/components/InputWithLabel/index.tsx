import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEventHandler } from "react";

interface Props {
    name: string
    placeholder: string
    label: string
    className?: string
    
    type?: InputProps["type"]
    required?: boolean
    onChange?: ChangeEventHandler<HTMLInputElement>
    value?: string
}

export default function InputWithLabel(props: Props) {
  return (
    <div className={`flex flex-col gap-3 ${props.className}`}>
        <Label htmlFor={props.name}>
            {props.label}
        </Label>
        <span>
            <Input 
                name={props.name} 
                id={props.name} 
                placeholder={props.placeholder}
                type={props.type || "text"}
                required={props.required || true}
                onChange={props.onChange}
                value={props.value}
            />
        </span>
    </div>
  );
}
