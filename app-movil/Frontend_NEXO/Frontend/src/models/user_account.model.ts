export interface User_Account {
  first_names: string;
  last_names: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  name_rol: 'Emprendedor' | 'Comprador' | 'Admin';
}
