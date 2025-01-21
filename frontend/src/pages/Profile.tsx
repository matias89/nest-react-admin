import UpdateProfile from '../components/dashboard/UpdateProfile';
import Layout from '../components/layout';

const Profile = () => {
  return (
    <Layout>
      <h1 className="font-semibold text-3xl mb-5">Profile</h1>
      <hr />
      <UpdateProfile />
    </Layout>
  );
};

export default Profile;
