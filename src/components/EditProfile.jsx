import { useState } from "react";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const [skills, setSkills] = useState(user.skills || []);
  const [newSkill, setNewSkill] = useState("");

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
          skills,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill(""); // Clear the input after adding
    }
  };

  const handleRemoveSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 justify-center items-start">
          {/* Edit Profile Form */}
          <div className="w-full lg:w-1/2">
            <div className="card bg-base-300 shadow-xl">
              <div className="card-body">
                <h2 className="card-title justify-center text-2xl mb-6">
                  Edit Profile
                </h2>
                <span className="text-gray-400 mb-4">
                  Email: {user.emailId}
                </span>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="form-control">
                      <div className="label">
                        <span className="label-text">First Name</span>
                      </div>
                      <input
                        type="text"
                        value={firstName}
                        className="input input-bordered w-full"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </label>
                    <label className="form-control">
                      <div className="label">
                        <span className="label-text">Last Name</span>
                      </div>
                      <input
                        type="text"
                        value={lastName}
                        className="input input-bordered w-full"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </label>
                  </div>

                  <label className="form-control">
                    <div className="label">
                      <span className="label-text">Photo URL</span>
                    </div>
                    <input
                      type="text"
                      value={photoUrl}
                      className="input input-bordered w-full"
                      onChange={(e) => setPhotoUrl(e.target.value)}
                    />
                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="form-control">
                      <div className="label">
                        <span className="label-text">Age</span>
                      </div>
                      <input
                        type="number"
                        value={age}
                        className="input input-bordered w-full"
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </label>
                    <label className="form-control">
                      <div className="label">
                        <span className="label-text">Gender</span>
                      </div>
                      <input
                        type="text"
                        value={gender}
                        className="input input-bordered w-full"
                        onChange={(e) =>
                          setGender(e.target.value.toLowerCase())
                        }
                      />
                    </label>
                  </div>

                  <label className="form-control">
                    <div className="label">
                      <span className="label-text">About</span>
                    </div>
                    <textarea
                      value={about}
                      className="textarea textarea-bordered w-full h-24"
                      onChange={(e) => setAbout(e.target.value)}
                    />
                  </label>

                  <div className="form-control">
                    <div className="label">
                      <span className="label-text">Skills</span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newSkill}
                        className="input input-bordered flex-1"
                        placeholder="Add a new skill"
                        onChange={(e) => setNewSkill(e.target.value)}
                      />
                      <button
                        className="btn btn-primary"
                        onClick={handleAddSkill}
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {skills.map((skill, index) => (
                        <div
                          key={index}
                          className="badge badge-primary gap-2 p-3"
                        >
                          {skill}
                          <button
                            className="btn btn-xs btn-circle btn-ghost"
                            onClick={() => handleRemoveSkill(skill)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {error && <p className="text-error mt-4">{error}</p>}

                <div className="card-actions justify-center mt-6">
                  <button
                    className="btn btn-primary w-full"
                    onClick={saveProfile}
                  >
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Card */}
          <div className="w-full lg:w-1/2">
            <div className="sticky top-8">
              <h3 className="text-xl font-semibold text-center mb-4">
                Profile Preview
              </h3>
              <UserCard
                feed={{ firstName, lastName, photoUrl, age, gender, about }}
              />
            </div>
          </div>
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};
export default EditProfile;

//in client side
// try{}
// const res=await axios.post(BASE_URL+"/login",{},{});
//data.whatever key pass from backend
// res.data.message
// res.data.success
// res.data.data
//=========================================

//  catch (err) {
//   response.data.whatever key pass from backend
// setError(err.response.data.message);
// setError(err.response.data.error);
