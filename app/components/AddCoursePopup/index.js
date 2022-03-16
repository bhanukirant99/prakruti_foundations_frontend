import './index.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageUploading from 'react-images-uploading';
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';
import { URL } from '../../containers/App/constants';

function AddCoursePopup() {
  const dispatch = useDispatch();
  const [images, setImages] = React.useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const maxNumber = 1;
  const onChange = imageList => {
    setImages(imageList);
  };
  const addCourse = () => {
    if (!images || !coursetitleValue || !courseinfoValue) {
      setError('Enter Required details');
      setSuccess('');
    } else {
      trackPromise(
        axios
          .post(`${URL}/v1/courses/create_newCourse`, {
            courseTitle: coursetitleValue,
            courseInfo: courseinfoValue,
            courseImage: 'http://127.0.0.1:5500/assets/images/10.png',
            courseDescription:
              'In this track, you’ll build robust, scalable and secure backend APIs using the most sought after technologies in web development. You’ll learn to build highly reusable, maintainable and extensible applications. You’ll also architect the...',
          })
          .then(function(response) {
            if (response.statusText === 'Created' && response.status === 201) {
              dispatch({
                type: 'ADD_COURSE',
                newcourseinfo: [
                  response.data,
                  coursetitleValue,
                  courseinfoValue,
                ],
              });
              setSuccess('Course added successfully');
              setError('');
              axios
                .post(
                  `${URL}/v1/contents/create_newContent/${response.data._id}`,
                  {
                    classTitle: 'Introduction to Algorithms',
                    classDuration: '20min',
                    classVideo: 'https://www.youtube.com/embed/rL8X2mlNHPM',
                  },
                )
                .then(function(response2) {
                  if (
                    response2.statusText === 'OK' &&
                    response2.status === 200
                  ) {
                  }
                })
                .catch(function(err) {
                  if (err.response2.status === 401)
                    setError(err.response2.data.message);
                  else if (err.response2.status === 400)
                    setError(err.response2.data.message);
                  else
                    setError('Something went wrong. Please try again later.');
                });
            }
          })
          .catch(function(error) {
            if (error.response.status === 401)
              setError(error.response.data.message);
            else if (error.response.status === 400)
              setError(error.response.data.message);
            else setError('Something went wrong. Please try again later.');
          }),
      );
    }
  };
  // const addCourse = (task = [images, coursetitleValue, courseinfoValue]) => {
  //   if (!images || !coursetitleValue || !courseinfoValue) {
  //     setError('Enter Required details');
  //     setSuccess('');
  //   } else {
  //     // const searchResults = global.initialAllCoursesInfo.filter(
  //     //   el => el.courseTitle.toLowerCase() === coursetitleValue.toLowerCase(),
  //     // );
  //     // if (searchResults.length !== 0) {
  //     //   setError('Course already added');
  //     //   setSuccess('');
  //     // } else {
  //       dispatch({
  //         type: 'ADD_COURSE',
  //         courseinfo: task,
  //       });
  //       setSuccess('Course added successfully');
  //       setError('');
  //    // }
  //   }
  // };
  const [coursetitleValue, setcoursetitleValue] = useState('');
  const [courseinfoValue, setcourseinfoValue] = useState('');
  const updateTitleInput = event => {
    setcoursetitleValue(event.target.value);
  };
  const updateInfoInput = event => {
    setcourseinfoValue(event.target.value);
  };

  return (
    <div className="addcourseContainer">
      <div className="labelInputGroup">
        <h1 className="courseTitle">Title</h1>
        <input
          type="text"
          className="coursetitleInput"
          placeholder="enter title"
          value={coursetitleValue}
          onChange={updateTitleInput}
        />
      </div>

      <div className="labelInputGroup">
        <h1 className="courseTitle">Description</h1>
        <textarea
          rows="5"
          cols="60"
          name="description"
          onChange={updateInfoInput}
          className="courseinfoInput"
          placeholder="enter description"
          value={courseinfoValue}
        />
      </div>
      <div className="Image-Upload">
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              <button
                type="button"
                className="addCourse uploadImage"
                style={isDragging ? { color: 'red' } : null}
                onClick={onImageUpload}
                {...dragProps}
              >
                Upload Image
              </button>
              &nbsp;
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image.data_url} alt="" width="100" />
                  <div className="image-item__btn-wrapper">
                    <button
                      type="button"
                      className="enrolled"
                      onClick={() => onImageUpdate(index)}
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="enrolled"
                      onClick={() => onImageRemove(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
      </div>
      <button
        type="button"
        id="enroll-btn"
        className="addCourse "
        onClick={() => addCourse()}
      >
        Add NGO
      </button>
      {error && (
        <>
          <p style={{ color: 'red' }}>{error}</p>
          <br />
        </>
      )}
      {success && (
        <>
          <p style={{ color: 'green' }}>{success}</p>
          <br />
        </>
      )}
    </div>
  );
}

export default AddCoursePopup;
