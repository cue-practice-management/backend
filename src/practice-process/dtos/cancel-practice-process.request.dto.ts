import { IsEnum, IsNotEmpty } from "class-validator";
import { PracticeProcessCancelledBy } from "practice-process/enums/practice-process.enums";

export class CancelPracticeProcessRequestDto {
    @IsNotEmpty()
    cancellationReason: string;

    @IsNotEmpty()
    @IsEnum(PracticeProcessCancelledBy)
    cancelledBy: PracticeProcessCancelledBy;
}