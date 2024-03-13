export interface User {
  id: number;
}

export interface Home {
  id: number;
}

export interface Booking {
  id?: number;
  user: User;
  home: Home;
}
