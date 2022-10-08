import {prisma} from "../database";
import { IFormType } from "../types/formType";

export async function createForm(formData : IFormType) {
    await prisma.form.create({data:formData})
};

export async function getForms(userId: number) {
    const forms = await prisma.form.findMany();
    return forms;
};

export async function getFormByApplicantEmailAndCatId(applicantEmail: string, catId: number) {
    const form  = await prisma.form.findFirst({where:{catId, applicantEmail}})  
    return form;
};
