import { BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../boards.status.enum";

export class BoardStatusValidationPipe implements PipeTransform {
    readonly StatusOptions = [
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC
    ]

    transform(value: any) {
        value = value.toUpperCase();

        console.log("this.isStatusValid(value) : ", this.isStatusValid(value));
        
        if(!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} isn't in the status options`)
        }
        
        return value;
    }

    private isStatusValid(status: any) {
        const index = this.StatusOptions.indexOf(status);
        console.log('index : ', index);
        
        // boolean 형태로 넘김
        return index !== -1
    }
}