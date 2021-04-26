interface User {
  _id: string;
  name: string;
  email: string;
}

interface Place {
  location: {
    coordinates: [number, number];
  };
  _id: string;
  name: string;
  icon: string;
  user: string;
  createdAt: Date;
}

interface Task {
  _id: string;
  completed: boolean;
  name: string;
  completionDate: Date;
  place: Place;
  user: User;
  createdAt: Date;
}

type AppState = {
  user: User | undefined;
  places: Array<Place> | undefined;
  tasks: Array<Task> | undefined;
};
