import {faker} from "@faker-js/faker";
import dayjs from "dayjs";
import { prisma } from "../../src/database";
import { IFormData } from "../../src/types/formType";

async function formBodyFactory() {

    return {
        applicantFullName: faker.name.fullName(),
        applicantEmail: faker.internet.email(),
        applicantPhoneNumber: faker.phone.number('21 9####-####'),
        applicantAge: Number(faker.finance.amount(18,150,0)),
        aplicantAddress: faker.address.streetAddress()
    };
};

async function formFactory(formData: IFormData, catId:number) {
    const today = dayjs().format();
    return prisma.form.create({
        data:{
            ...formData,
            catId,
            submissionDate: today
        }
    });
};

export default{
    formBodyFactory,
    formFactory
}
