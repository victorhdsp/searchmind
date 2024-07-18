import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
    name: string
    placeholder: string
    label: string
    
    type?: InputProps["type"]
    required?: boolean
}

export default function InputWithLabel(props: Props) {
  return (
    <div className="flex flex-col gap-3">
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
            />
        </span>
    </div>
  );
}
