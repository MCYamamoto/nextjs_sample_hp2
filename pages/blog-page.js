import { getAllPostsData } from '../lib/posts';
import Link from 'next/link';
import Layout from '../components/Layout';
import Post from '../components/Post';

export const getStaticProps = async () => {
  const filterdPosts = await getAllPostsData();
  return { props: { filterdPosts }, revalidate: 3 };
};

const BlogPage = ({ filterdPosts }) => {
  return (
    <Layout title='blog page'>
      <ul>
        {filterdPosts &&
          filterdPosts.map((post) => {
            return <Post key={post.id} post={post} />;
          })}
      </ul>
      <Link href='/main-page'>
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
          <span>back to main page</span>
        </div>
      </Link>
    </Layout>
  );
};

export default BlogPage;
