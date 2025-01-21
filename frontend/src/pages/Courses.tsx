import { useState } from 'react';
import { Loader, Plus, X } from 'react-feather';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';

import CoursesTable from '../components/courses/CoursesTable';
import Layout from '../components/layout';
import Paginator from '../components/paginator/Paginator';
import Modal from '../components/shared/Modal';
import useAuth from '../hooks/useAuth';
import CreateCourseRequest from '../models/course/CreateCourseRequest';
import courseService from '../services/CourseService';

export default function Courses() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(3);
  const [order, setOrder] = useState<number>(1);

  const [addCourseShow, setAddCourseShow] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [onUpdate, setOnUpdate] = useState<string>('');

  const { authenticatedUser } = useAuth();
  const { data, isLoading } = useQuery(
    ['courses', name, description, page, limit, order, addCourseShow, onUpdate],
    () =>
      courseService.findAll({
        name: name || undefined,
        description: description || undefined,
        page,
        limit,
        order,
      }),
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<CreateCourseRequest>();

  const handleOnPageChange = (page: number) => {
    setPage(page);
  };

  const saveCourse = async (createCourseRequest: CreateCourseRequest) => {
    try {
      await courseService.save(createCourseRequest);
      setAddCourseShow(false);
      reset();
      setError(null);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <Layout>
      <h1 className="font-semibold text-3xl mb-5">Manage Courses</h1>
      <hr />
      {authenticatedUser.role !== 'user' ? (
        <button
          className="btn my-5 flex gap-2 w-full sm:w-auto justify-center"
          onClick={() => setAddCourseShow(true)}
        >
          <Plus /> Add Course
        </button>
      ) : null}

      <div className="table-filter">
        <div className="flex flex-row gap-5">
          <input
            type="text"
            className="input w-1/2"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="input w-1/2"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            className="input"
            onChange={(e) => setOrder(parseInt(e.target.value))}
          >
            <option value={1}>Sort by Name ASC</option>
            <option value={2}>Sort by name DESC</option>
          </select>
          <select
            className="input"
            onChange={(e) => setLimit(parseInt(e.target.value))}
          >
            <option>3</option>
            <option>5</option>
            <option>10</option>
          </select>
        </div>
      </div>

      <CoursesTable
        data={data?.data}
        isLoading={isLoading}
        onUpdate={setOnUpdate}
      />
      <Paginator
        totalItems={data?.total}
        currentPage={page}
        itemsPerPage={limit}
        onPageChange={handleOnPageChange}
      />

      {/* Add User Modal */}
      <Modal show={addCourseShow}>
        <div className="flex">
          <h1 className="font-semibold mb-3">Add Course</h1>
          <button
            className="ml-auto focus:outline-none"
            onClick={() => {
              reset();
              setAddCourseShow(false);
            }}
          >
            <X size={30} />
          </button>
        </div>
        <hr />

        <form
          className="flex flex-col gap-5 mt-5"
          onSubmit={handleSubmit(saveCourse)}
        >
          <input
            type="text"
            className="input"
            placeholder="Name"
            disabled={isSubmitting}
            required
            {...register('name')}
          />
          <input
            type="text"
            className="input"
            placeholder="Description"
            disabled={isSubmitting}
            required
            {...register('description')}
          />
          <button className="btn" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader className="animate-spin mx-auto" />
            ) : (
              'Save'
            )}
          </button>
          {error ? (
            <div className="text-red-500 p-3 font-semibold border rounded-md bg-red-50">
              {error}
            </div>
          ) : null}
        </form>
      </Modal>
    </Layout>
  );
}
