import formRepository from "../repositories/formRepository";
import  catRepository from "../repositories/catRepository"
import { IFormData, IFormType } from "../types/formType";
import dayjs from "dayjs";
import { conflictError } from "../utils/errorUtil";
import { getCatById } from "./catService";


export async function createForm(catId: number, formData: IFormData ) {

    const today = dayjs().format();
    console.log(today);

    await getCatById(catId);

    const form = await formRepository.getFormByApplicantEmailAndCatId(formData.applicantEmail, catId);
    if(form) throw conflictError('You already made a form for this cat');

    const newForm : IFormType = {
        ...formData,
        catId,
        submissionDate: today
    };

    await formRepository.createForm(newForm);
};

export async function getFormsByUserId(userId: number) {
    const forms = await catRepository.getFormsByUserId(userId);
    return forms;
}

export default{
    createForm,
    getFormsByUserId
}