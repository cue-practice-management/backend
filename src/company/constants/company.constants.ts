export const COMPANY_CONSTRAINTS = {
  NAME: { MIN_LENGTH: 3, MAX_LENGTH: 100 },
  CORPORATE_NAME: { MIN_LENGTH: 3, MAX_LENGTH: 150 },
  NIT: { MIN_LENGTH: 6, MAX_LENGTH: 20 },
  PHONE: { MIN_LENGTH: 7, MAX_LENGTH: 20 },
  WEBSITE_URL: { MIN_LENGTH: 5 },
  ADDRESS: { MIN_LENGTH: 5, MAX_LENGTH: 200 },
};

export const COMPANY_SORT_OPTIONS = [
  'name',
  'corporateName',
  'nit',
  'createdAt',
];

export const DEFAULT_COMPANY_SORT_OPTION = 'createdAt';

export const COMPANY_EXCEPTIONS = {
  NOT_FOUND: {
    code: 'COMPANY_NOT_FOUND',
    message: 'Company not found',
  },
  NAME_ALREADY_EXISTS: {
    code: 'COMPANY_NAME_ALREADY_EXISTS',
    message: 'Company name already exists',
  },
  CORPORATE_NAME_ALREADY_EXISTS: {
    code: 'COMPANY_CORPORATE_NAME_ALREADY_EXISTS',
    message: 'Company corporate name already exists',
  },
  NIT_ALREADY_EXISTS: {
    code: 'COMPANY_NIT_ALREADY_EXISTS',
    message: 'Company NIT already exists',
  },
  PHONE_ALREADY_EXISTS: {
    code: 'COMPANY_PHONE_ALREADY_EXISTS',
    message: 'Company phone already exists',
  },
};

export const COMPANY_POPULATION_OPTIONS = {
  CITY: {
    path: 'city',
  },
  COUNTRY: {
    path: 'country',
  },
  ASSOCIATED_ACADEMIC_PROGRAMS: {
    path: 'associatedAcademicPrograms',
    populate: {
      path: 'faculty',
    },
  },
  CONTRACTS: {
    path: 'contracts',
  },
};
