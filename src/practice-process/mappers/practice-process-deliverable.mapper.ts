import { Injectable } from "@nestjs/common";
import { FileService } from "file/file.service";
import { PracticeProcessDeliverableResponseDto } from "practice-process/dtos/practice-process-deliverable-response.dto";
import { PracticeProcessDeliverable } from "practice-process/schemas/practice-process-deliverable.schema";

@Injectable()
export class PracticeProcessDeliverableMapper {
    constructor(
        private readonly fileService: FileService
    ) { }

    async toResponseDto(deliverable: PracticeProcessDeliverable): Promise<PracticeProcessDeliverableResponseDto> {
        let fileUrl: string | undefined = undefined;
        if (deliverable.submissionUrl) {
            fileUrl = await this.fileService.getPrivateFileSignedUrl(deliverable.submissionUrl);
        }
        return {
            _id: deliverable._id.toString(),
            title: deliverable.title,
            description: deliverable.description,
            dueDate: deliverable.dueDate,
            submissionUrl: fileUrl,
            status: deliverable.status,
            submittedAt: deliverable.submittedAt,
            grade: deliverable.grade,
            gradeObservations: deliverable.gradeObservations,
            gradedAt: deliverable.gradedAt,
        };
    }
}