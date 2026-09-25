import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"


export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    product_name : string

    @IsString()
    description : string

    @IsNotEmpty()
    @IsNumber()
    publisher : number
    
    @IsString()
    image : string

    @IsNumber()
    price : number

    @IsBoolean()
    hidden : boolean
}