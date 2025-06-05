import { COMPANY_POPULATION_OPTIONS } from 'company/constants/company.constants';

export const COMPANY_MENTOR_EXCEPTIONS = {
  NOT_FOUND: {
    code: 'COMPANY_MENTOR_NOT_FOUND',
    message: 'Company mentor not found',
  },
};

export const COMPANY_MENTOR_POPULATE_OPTIONS = {
  COMPANY: {
    path: 'company',
    populate: [
      COMPANY_POPULATION_OPTIONS.CITY,
      COMPANY_POPULATION_OPTIONS.COUNTRY,
      COMPANY_POPULATION_OPTIONS.ASSOCIATED_ACADEMIC_PROGRAMS,
      COMPANY_POPULATION_OPTIONS.CONTRACTS,
    ],
  },
};

export const COMPANY_MENTOR_SORT_OPTIONS = [
  'firstName',
  'lastName',
  'gender',
  'company',
];

export const DEFAULT_COMPANY_MENTOR_SORT_OPTION = 'firstName';
