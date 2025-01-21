import { Book } from 'react-feather';
import { useQuery } from 'react-query';

import Layout from '../components/layout';
import courseService from '../services/CourseService';
import statsService from '../services/StatsService';

export default function Dashboard() {
  const { data, isLoading } = useQuery('stats', statsService.getStats);
  const { data: courses } = useQuery('courses', () =>
    courseService.findAll({ page: 1, limit: 3 }),
  );
  return (
    <Layout>
      <h1 className="font-semibold text-3xl mb-5">Dashboard</h1>
      <hr />
      <div className="mt-5 flex flex-col gap-5">
        {!isLoading ? (
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="card shadow text-white bg-blue-500 flex-1">
              <h1 className="font-semibold sm:text-4xl text-center mb-3">
                {data.numberOfUsers}
              </h1>
              <p className="text-center sm:text-lg font-semibold">Users</p>
            </div>
            <div className="card shadow text-white bg-indigo-500 flex-1">
              <h1 className="font-semibold sm:text-4xl mb-3 text-center">
                {data.numberOfCourses}
              </h1>
              <p className="text-center sm:text-lg font-semibold">Courses</p>
            </div>
            <div className="card shadow text-white bg-green-500 flex-1">
              <h1 className="font-semibold sm:text-4xl mb-3 text-center">
                {data.numberOfContents}
              </h1>
              <p className="text-center sm:text-lg font-semibold">Contents</p>
            </div>
          </div>
        ) : null}
      </div>
      <div className="mt-5">
        <h2 className="font-semibold text-2xl">Recent Activities</h2>
        <hr />
        <div className="mt-5">
          {courses?.data?.length === 0 && (
            <p className="font-semibold">No recent activities</p>
          )}
          {courses?.data?.length > 0 && (
            <ul className="flex flex-col gap-3 flex">
              {courses.data.map((course) => (
                <li key={course.id} className="flex gap-2 items-center">
                  <Book />{' '}
                  <span className="text-brand-primary">{course.name}</span> was
                  recently added
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
}
