export interface User {
  id: number;
}

export interface Home {
  id: number;
}

export interface Booking {
  user: User;
  home: Home;
}
