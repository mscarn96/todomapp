interface User {
  _id: string;
  name: string;
  email: string;
}

interface Place {
  location: {
    coordinates: [number, number];
    address?: string;
  };
  _id?: string;
  name: string;
  icon: string;
  user?: string;
  createdAt?: Date;
  tasks: Array<Task>;
}

interface Task {
  _id?: string;
  completed: boolean;
  name: string;
  completionDate: String;
  place?: string;
  user?: string;
  createdAt?: Date;
}

type AppState = {
  user: User | undefined;
  places: Array<Place> | undefined;
  tasks: Array<Task> | undefined;
};
