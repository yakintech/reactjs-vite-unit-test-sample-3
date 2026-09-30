import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  tags: string[];
  pastDate: Date;
}


export const taskFactory = Factory.define<Task>(({ sequence }) => ({
  id: `task-${sequence}`, // Her çağrıldığında artan ID (task-1, task-2...)
  title: faker.lorem.sentence(), // Dinamik rastgele cümle
  completed: false,
  createdAt: faker.date.recent(),
  tags: ['frontend', 'react'],
  pastDate: faker.date.past(),
}));