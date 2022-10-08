import { Form } from "@prisma/client";

export type IFormType = Omit<Form, 'id'>;
export type IFormData = Omit< IFormType, 'catId' | 'submissionDate'>;
