import { faker } from "@faker-js/faker";

export default function userFactory() {
    const password = faker.internet.password();
    return {
        email: faker.internet.email(),
        password,
        confirmPassword: password
    }
}