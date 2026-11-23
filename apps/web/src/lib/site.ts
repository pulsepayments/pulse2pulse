/**
 * Operator details shown in the footer and privacy notice (Companies Act / UK GDPR Art. 13).
 * MUST be filled in before the site is deployed publicly. Pending the founder.
 */
export const SITE = {
  legalName: process.env.NEXT_PUBLIC_LEGAL_NAME ?? "",
  companyNumber: process.env.NEXT_PUBLIC_COMPANY_NUMBER ?? "",
  registeredOffice: process.env.NEXT_PUBLIC_REGISTERED_OFFICE ?? "",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
};

export const operatorLine = (): string =>
  SITE.legalName
    ? `${SITE.legalName}${SITE.companyNumber ? `, company no. ${SITE.companyNumber}` : ""}${SITE.registeredOffice ? `, ${SITE.registeredOffice}` : ""}`
    : "Pulse (operator details to be published before launch)";
