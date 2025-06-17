import { InjectModel } from '@nestjs/mongoose';
import { FILE_FOLDERS } from 'file/constants/file.constants';
import { FileService } from 'file/file.service';
import { PaginateModel } from 'mongoose';
import { PracticeProcessDeliverableResponseDto } from 'practice-process/dtos/practice-process-deliverable-response.dto';
import { PracticeProcessDeliverableStatus } from 'practice-process/enums/practice-process-deliverable.enums';
import { PracticeProcessDeliverableInvalidStatusToSubmitException } from 'practice-process/exceptions/practice-process-deliverable-invalid-status-to-submit.exception';
import { PracticeProcessDeliverableNotFoundException } from 'practice-process/exceptions/practice-process-deliverable-not-found.exception';
import { PracticeProcessNotFoundException } from 'practice-process/exceptions/practice-process-not-found.exception';
import { PracticeProcessDeliverableMapper } from 'practice-process/mappers/practice-process-deliverable.mapper';
import { PracticeProcessDeliverable, PracticeProcessDeliverableDocument } from 'practice-process/schemas/practice-process-deliverable.schema';
import { PracticeProcess, PracticeProcessDocument } from 'practice-process/schemas/practice-process.schema';

export class PracticeProcessDeliverableService {

    constructor(
        @InjectModel(PracticeProcessDeliverable.name)
        private readonly practiceProcessDeliverableModel: PaginateModel<PracticeProcessDeliverableDocument>,
        @InjectModel(PracticeProcess.name)
        private readonly practiceProcessModel: PaginateModel<PracticeProcessDocument>,
        private readonly practiceProcessDeliverableMapper: PracticeProcessDeliverableMapper,
        private readonly fileService: FileService,
    ) { }


    async submitDeliverable(
        practiceProcessId: string,
        deliverableId: string,
        userId: string,
        file: Express.Multer.File,
    ): Promise<PracticeProcessDeliverableResponseDto> {
        const practiceProcess = await this.practiceProcessModel.findById(practiceProcessId);

        if (!practiceProcess) throw new PracticeProcessNotFoundException();
        if (practiceProcess.student.toString() !== userId) throw new PracticeProcessNotFoundException();

        const deliverable = await this.practiceProcessDeliverableModel.findOne({
            _id: deliverableId,
            process: practiceProcessId,
        });

        if (!deliverable) throw new PracticeProcessDeliverableNotFoundException();
        if (deliverable.status !== PracticeProcessDeliverableStatus.PENDING) throw new PracticeProcessDeliverableInvalidStatusToSubmitException();

        const fileUrl = await this.fileService.uploadFile({
            file,
            isPublic: false,
            folder: FILE_FOLDERS.PRACTICE_PROCESS_DELIVERABLES,
        });
        const wasSubmittedLate = deliverable.dueDate < new Date();

        deliverable.submissionUrl = fileUrl.fileKey;
        deliverable.status = wasSubmittedLate ? PracticeProcessDeliverableStatus.SUBMITTED_LATE : PracticeProcessDeliverableStatus.SUBMITTED;
        deliverable.submittedAt = new Date();

        await deliverable.save();

        return await this.practiceProcessDeliverableMapper.toResponseDto(deliverable);

    }
}
