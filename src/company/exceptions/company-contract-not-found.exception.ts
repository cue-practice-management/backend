import { BaseHttpException } from '@common/exceptions/base-http.exception';
import { HttpStatus } from '@nestjs/common';
import { COMPANY_CONTRACT_EXCEPTIONS } from 'company/constants/company-contract.constants';

export class CompanyContractNotFoundException extends BaseHttpException {
  constructor() {
    super(
      COMPANY_CONTRACT_EXCEPTIONS.NOT_FOUND.code,
      COMPANY_CONTRACT_EXCEPTIONS.NOT_FOUND.message,
      HttpStatus.NOT_FOUND,
    );
  }
}
