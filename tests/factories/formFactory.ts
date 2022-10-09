import {faker} from "@faker-js/faker";

export default async function formFactory() {

    return {
        applicantFullName: faker.name.fullName(),
        applicantEmail: faker.internet.email(),
        applicantPhoneNumber: faker.phone.number('21 9####-####'),
        applicantAge: Number(faker.finance.amount(18,150,0)),
        aplicantAddress: faker.address.streetAddress()
    };
};

