import { IsFutureDateTime } from '@common/validators/future-date.validator';
import { Type } from 'class-transformer';
import {
    IsEnum,
    IsNotEmpty,
    IsString,
    IsUrl,
    ValidateIf,
} from 'class-validator';
import { FollowUpMode } from 'practice-process/enums/practice-process-follow-up.enum';

export class SchedulePracticeProcessFollowUpRequestDto {
    @IsFutureDateTime()
    @Type(() => Date)
    @IsNotEmpty()
    date: Date;

    @IsEnum(FollowUpMode)
    mode: FollowUpMode;

    @ValidateIf((o) => o.mode === FollowUpMode.ONLINE)
    @IsString()
    @IsNotEmpty()
    @IsUrl()
    meetingUrl?: string;

    @ValidateIf((o) => o.mode === FollowUpMode.IN_PERSON)
    @IsString()
    @IsNotEmpty()
    location?: string;
}
