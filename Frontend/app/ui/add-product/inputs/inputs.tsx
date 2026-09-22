import { FC } from "react";
import styles from './inputs.module.css'
import { FormFieldProps } from "../add-product-type";

export default function Input({
    register,
    type,
    placeholder,
    name,
} : FormFieldProps) {
    return(
        <input 
        
        className={styles.Input} 
        {...register(name)}
        placeholder ={placeholder}
        type={type}
        />
    )
}