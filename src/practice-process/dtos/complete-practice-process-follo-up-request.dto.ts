import { IsNotEmpty } from "class-validator";

export class CompletePracticeProcessFollowUpRequestDto {
    @IsNotEmpty()
    outcomeNotes: string;
}