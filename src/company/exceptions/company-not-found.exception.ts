import { BaseHttpException } from "@common/exceptions/base-http.exception";
import { HttpStatus } from "@nestjs/common";
import { COMPANY_EXCEPTIONS } from "company/constants/company.constants";

export class CompanyNotFoundException extends BaseHttpException {
  constructor() {
    super(
      COMPANY_EXCEPTIONS.NOT_FOUND.code,
      COMPANY_EXCEPTIONS.NOT_FOUND.message,
      HttpStatus.NOT_FOUND,
    );
  }
}