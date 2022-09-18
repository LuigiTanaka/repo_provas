import { faker } from "@faker-js/faker";

export default function userWithWrongPasswordFactory() {
    return {
        email: faker.internet.email(),
        password: faker.internet.password(),
        confirmPassword: faker.internet.password()
    }
}