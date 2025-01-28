export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@doe.com",
    password: "password",
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane@doe.com",
    password: "password",
  },
  {
    id: "3",
    name: "Spencer",
    email: "spencer@fanzoo.com",
    password: "password",
  },
  {
    id: "4",
    name: "Matthew",
    email: "Matthew@fanzoo.com",
    password: "password",
  },
];

export const addUser = (user: User) => {
  const existingUser = findUserByEmailPassword(user.email, user.password);
  if (existingUser) return existingUser;
  return null;
};

export const findUser = (id: string) => {
  return users.find((user) => user.id === id);
};

export const findUserByEmailPassword = (email: string, password: string) => {
  return users.find(
    (user) => user.email === email && user.password === password
  );
};

export const deleteUser = (id: string) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users.splice(index, 1);
  }
};
