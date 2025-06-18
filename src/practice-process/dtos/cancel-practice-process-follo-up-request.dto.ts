import { IsNotEmpty } from "class-validator";

export class CancelPracticeProcessFollowUpRequestDto {
    @IsNotEmpty()
    cancellationReason: string;
}