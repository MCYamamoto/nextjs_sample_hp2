import Cookies from 'universal-cookie';
import { useContext } from 'react';
import { StateContext } from '../context/StateContext';

const cookie = new Cookies();

const TaskForm = ({ taskCreated }) => {
  const { selectedTask, setSelectedTask } = useContext(StateContext);
  const create = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_REST_API_URL}api/tasks/`, {
      method: 'POST',
      body: JSON.stringify({ title: selectedTask.title }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${cookie.get('access_token')}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        alert('Fail JWT');
      }
      setSelectedTask({ id: 0, title: '' });
      taskCreated();
    });
  };
  const update = async (e) => {
    e.preventDefault();
    await fetch(
      `${process.env.NEXT_PUBLIC_REST_API_URL}api/tasks/${selectedTask.id}/`,
      {
        method: 'PUT',
        body: JSON.stringify({ title: selectedTask.title }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${cookie.get('access_token')}`,
        },
      }
    ).then((res) => {
      if (res.status === 401) {
        alert('Fail JWT');
      }
      setSelectedTask({ id: 0, title: '' });
      taskCreated();
    });
  };
  return (
    <div>
      <form onSubmit={selectedTask.id !== 0 ? update : create}>
        <input
          className='text-black mb-8 px-2 py-1'
          type='text'
          value={selectedTask.title}
          onChange={(e) => {
            setSelectedTask({ ...selectedTask, title: e.target.value });
          }}
        ></input>
        <button
          className='bg-gray-500 ml-2 hover:bg-gray-600 text-sm px-2 py-1 rounded uppercase'
          type='submit'
        >
          {selectedTask.id !== 0 ? 'update' : 'create'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
