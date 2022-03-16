import './index.css';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Course from 'components/Course';
import Masterclass from 'components/Masterclass/';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import React from 'react';
import { useSelector } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Popup from 'reactjs-popup';
import { NavLink } from 'react-router-dom';
import AddCoursePopup from '../../components/AddCoursePopup';
import 'reactjs-popup/dist/index.css';

function HomepageMentor() {
  const courses = useSelector(state => state);
  const { global } = courses;
  const isHome = false;
  // const searchedallcoursesinfo = global.searchResultsAllCourses;
  const searchedAllCoursesInfo = global.allCoursesInfo;
  // const searchedmastercoursesinfo = global.searchResultsMasterClasses;
  const searchedMasterclassInfo = global.searchResultsMasterClasses;
  let noallresults = null;
  let nomasterclassresults = null;
  if (searchedAllCoursesInfo.length === 0) {
    noallresults = <h1 className="no-search-results">No results found</h1>;
  }
  if (searchedMasterclassInfo.length === 0) {
    nomasterclassresults = (
      <h1 className="no-search-results">No results found</h1>
    );
  }

  return (
    <div className="page">
      <Header isHome={isHome} />
      <div className="body">
        <div className="content">
          <h3 className="displayname">Hi {global.loggedinUsername},</h3>
          <p className="mentor">
            Do you want to be a user again!.
            <NavLink className="nav-link" to="/homepage">
              <span> try clicking here</span>
            </NavLink>
          </p>
          <div className="courses-container">
            <div className="courses-box">
              <h1 className="courses">Courses</h1>
              <Popup
                trigger={
                  <button id="enroll-btn" type="button" className="addCourse">
                    Add NGO
                  </button>
                }
                modal
                nested
              >
                {close => (
                  <div className="modal">
                    <button className="close" type="button" onClick={close}>
                      &times;
                    </button>
                    <AddCoursePopup />
                    <div className="actions">
                      <button
                        type="button"
                        className="closeBtn"
                        onClick={() => {
                          close();
                        }}
                      >
                        close modal
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
          </div>
          {noallresults}

          <div className="courses-display">
            <div className="courses-cards">
              {searchedAllCoursesInfo.map(eachItem => (
                <Course
                  key={eachItem._id}
                  coursedetails={eachItem}
                  isenroll={false}
                />
              ))}
            </div>
            <div className="arrow-container">
              <MdOutlineArrowForwardIos className="arrow" />
            </div>
          </div>
          <div className="courses-container">
            <div className="courses-box">
              <h1 className="courses">NGO's that we helped</h1>

              {/* <Popup
                trigger={
                  <button
                    id="enroll-btn"
                    type="button"
                    className="addMasterclass enroll"
                  >
                    Add Masterclass
                  </button>
                }
                modal
                nested
              >
                {close => (
                  <div className="modal">
                    <button className="close" type="button" onClick={close}>
                      &times;
                    </button>
                    <AddMasterclassPopup />
                    <div className="actions">
                      <button
                        type="button"
                        className="closeBtn"
                        onClick={() => {
                          close();
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </Popup> */}
            </div>
          </div>
          {nomasterclassresults}
          <div className="masterclass-container">
            {searchedMasterclassInfo.map(eachItem => (
              <Masterclass key={eachItem.id} coursedetails={eachItem} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
export default HomepageMentor;
