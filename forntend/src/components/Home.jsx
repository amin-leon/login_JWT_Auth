// frontend/src/components/Home.js
import PropTypes from 'prop-types';

function Home({ userData }) {
  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      {userData && (
        <div>
          <h3>User Data:</h3>
          <p>Email: {userData.email}</p>
          {/* Display other user data as needed */}
        </div>
      )}
    </div>
  );
}

Home.propTypes = {
  userData: PropTypes.shape({
    email: PropTypes.string.isRequired,
    // Define other propTypes as needed
  }),
};

export default Home;
