import * as React from "react";
import Button, { ButtonProps } from "material-ui/Button";

export interface CustomButtonProps extends ButtonProps {
    className?: string;
}

const CustomButton = (props: CustomButtonProps) => {
    return <div className={props.className || ""}> <Button {...props} /> </div>;
};

export default CustomButton;