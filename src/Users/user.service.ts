import { Injectable } from "@nestjs/common";
import { faker } from "@faker-js/faker/locale/tr";
interface User {
  id: number;
  name: string;
  lastname: string;
  phone: string;
}

@Injectable()
export class UserService {
  getUsers(): Array<User> {
    const users = [];
    for (let i = 0; i < 30; i++) {
      users.push({
        id: i,
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        phone: faker.phone.number(),
      });
    }
    return users;
  }

  getUser(id) {
    console.log(id);
    const users = [];
    for (let i = 0; i < 30; i++) {
      users.push({
        id: i,
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        phone: faker.phone.number(),
      });
    }

    return users.filter((user) => user.id == id);
  }
}
