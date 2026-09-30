// import { render, screen } from '@testing-library/react';
// import { describe, it, expect } from 'vitest';
// import { taskFactory } from './factories/task.factory';
// import { TaskList } from './TaskList';

// describe('TaskList - Advanced Factory', () => {

//   it('tek bir görevi doğru listelemelidir', () => {
//     const singleTask = taskFactory.build({ title: 'Ödev Yap' });
//     render(<TaskList tasks={[singleTask]} />);

//     expect(screen.getByText('Ödev Yap')).toBeInTheDocument();
//   });

//   it('birden fazla görevi (liste) tek hamlede üretip test edebilir', () => {
//     // 5 adet tamamen farklı sahte görev nesnesi üretir!
//     const multipleTasks = taskFactory.buildList(5); 

//     render(<TaskList tasks={multipleTasks} />);

//     // Ekranda 5 adet görev kartı olduğunu doğrula
//     expect(screen.getAllByRole('listitem')).toHaveLength(5);
//   });

//   it('tamamlanmış görev durumu testi', () => {
//     const completedTask = taskFactory.build({ completed: true });
//     render(<TaskList tasks={[completedTask]} />);

//     expect(screen.getByTestId('completed-icon')).toBeInTheDocument();
//   });

// });