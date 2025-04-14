import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoApp from './TodoApp';
import axios from 'axios';

jest.mock('axios');

const mockTodos = [
  { _id: '1', task: 'Learn React', done: false },
  { _id: '2', task: 'Learn Jest', done: false },
];

describe('TodoApp', () => {
  it('should render todo list correctly', async () => {
    axios.get.mockResolvedValue({ data: mockTodos });

    render(<TodoApp />);

    await waitFor(() => {
      expect(screen.getByText('Learn React')).toBeInTheDocument();
      expect(screen.getByText('Learn Jest')).toBeInTheDocument();
    });
  });

  it('should add a new todo', async () => {
    axios.post.mockResolvedValue({ data: { _id: '3', task: 'Learn Testing', done: false } });

    render(<TodoApp />);

    const input = screen.getByPlaceholderText('Digite uma nova tarefa');
    fireEvent.change(input, { target: { value: 'Learn Testing' } });

    const button = screen.getByText('Add Todo');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Learn Testing')).toBeInTheDocument();
    });
  });

  it('should delete a todo', async () => {
    axios.delete.mockResolvedValue({});

    render(<TodoApp />);

    const deleteButton = screen.getAllByText('Excluir')[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    });
  });

  it('should mark a todo as completed', async () => {
    axios.patch.mockResolvedValue({ data: { _id: '1', task: 'Learn React', done: true } });

    render(<TodoApp />);

    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(screen.getByText('Learn React').closest('li')).toHaveClass('completed');
    });
  });
});
