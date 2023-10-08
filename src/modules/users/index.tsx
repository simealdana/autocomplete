import { FC } from "react";

import AutoComplete from "../../ui/AutoComplete/autocomplete";
import { User } from "./users.types";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

const getUsers = async (): Promise<User[]> => {
  const response = await fetch(USERS_URL);
  const users = await response.json();
  return users;
};

const filterUsers = async (search: string) => {
  const users: User[] = await getUsers();
  return users.filter((user: User) => {
    return user.name.toLocaleLowerCase().includes(search);
  });
};

const Users: FC = () => {
  const onSelected = (userName: string) => {
    console.log(userName);
  };
  return (
    <AutoComplete
      onFetchOptions={filterUsers}
      keyField="name"
      onSelected={onSelected}
    />
  );
};

export default Users;
