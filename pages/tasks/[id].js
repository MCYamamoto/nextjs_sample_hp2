import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { getAllTaskIds, getTaskData } from '../../lib/tasks';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_REST_API_URL}api/detail-task`;

export const getStaticPaths = async () => {
  const paths = await getAllTaskIds();
  return {
    paths,
    fallback: true,
  };
};
export const getStaticProps = async ({ params }) => {
  const staticTask = await getTaskData(params.id);
  return { props: { id: staticTask.id, staticTask }, revalidate: 3 };
};
const TaskDetail = ({ id, staticTask }) => {
  const { data: task, mutate } = useSWR(`${apiUrl}/${id}`, fetcher, {
    fallbackData: staticTask,
  });

  useEffect(() => {
    mutate();
  }, []);

  const router = useRouter();
  if (router.isFallback || !task) {
    return <div>Loading...</div>;
  }
  return (
    <Layout title={task.title}>
      <span className='m-4'>
        {'ID : '}
        {task.id}
      </span>
      <p className='mb-4 text-xl font-bold'>{task.title}</p>
      <p className='mb-12'>{task.created_at}</p>
      <Link href='/task-page'>
        <div className='flex cursor-pointer mt-12'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 mr-3'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M11 19l-7-7 7-7m8 14l-7-7 7-7'
            />
          </svg>
          <span>back to blog page</span>
        </div>
      </Link>
    </Layout>
  );
};
export default TaskDetail;
