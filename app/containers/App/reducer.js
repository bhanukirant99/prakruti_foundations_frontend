/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import understanding5GImg from '../../images/understanding-5G.png';

const detailedMasterClassInfo = [{
        id: 1,
        masterclassImage: 'http://127.0.0.1:5500/assets/images/2.png',
        masterclassTitle: 'Blood Donanation',
        masterclassSpeaker: 'Rakesh Mishra',
        speakerProfession: 'Co-Founder Uhana',
        speakerCollege: 'IIT Madras',
        classVideo: 'https://www.youtube.com/embed/FF38n2ATEg0',
        classNotes: ['5G is the latest generation of mobile internet connectivity'],
        comments: [{
            initial: 'HS',
            username: 'Hari Chandana Sapare',
            comment: 'this video lecture is very good',
        }, ],
        classLiked: false,
    },
    {
        id: 2,
        masterclassImage: 'http://127.0.0.1:5500/assets/images/8.png',
        masterclassTitle: 'Walkathon',
        masterclassSpeaker: 'Priyatham Bollimpalli',
        speakerProfession: 'Micorsoft',
        speakerCollege: 'IIT Guwahati',
        classVideo: 'https://www.youtube.com/embed/9nvLWCYhPnc',
        classNotes: ['5G is the latest generation of mobile internet connectivity'],
        comments: [{
            initial: 'HS',
            username: 'Hari Chandana Sapare',
            comment: 'this video lecture is very good',
        }, ],
        classLiked: false,
    },
];
// The initial state of the App

const persistConfig = {
    key: 'root',
    storage,
};
export const initialState = {
    allCoursesInfo: [],
    loggedinUserRole: 'user',
    loggedinUserId: '',
    loggedinUsername: '',
    loggedinUserPassword: '',
    loggedinUserInitial: '',
    loggedinUserEmail: '',
    loggedinUserPurchased: [],
    initialAllCoursesInfo: [],
    initialEnrolledCourseInfo: [],
    masterclassInfo: detailedMasterClassInfo,
    searchResultsAllCourses: [],
    searchResultsEnrolledCourses: [],
    searchResultsMasterClasses: detailedMasterClassInfo,
    selectedCourseInfo: [],
    commentsList: [],
    selectedClassInfo: {},
    selectedMasterclassInfo: detailedMasterClassInfo[0],
    discussionList: [],
    selectedDiscussion: {},
    discussionSolutions: [],
    selectedDiscussionSolutions: {},
};

const wholeReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case 'REGISTER_USER':
                draft.loggedinUserPassword = action.password;
                break;
            case 'ENROLL_COURSE':
                draft.initialEnrolledCourseInfo = [
                    ...draft.initialEnrolledCourseInfo,
                    action.enrolledcourse,
                ];
                draft.searchResultsEnrolledCourses = [
                    ...draft.searchResultsEnrolledCourses,
                    action.enrolledcourse,
                ];
                draft.loggedinUserPurchased = [
                    ...draft.loggedinUserPurchased,
                    action.enrolledcourse._id,
                ];
                break;

            case 'SEARCH_COURSE':
                {
                    const searchedAllCourses = state.initialAllCoursesInfo.filter(
                        eachItem =>
                        eachItem.courseTitle
                        .toLowerCase()
                        .includes(action.searchinfo.toLowerCase()),
                    );
                    const searchedEnrolledCourses = state.initialEnrolledCourseInfo.filter(
                        eachItem =>
                        eachItem.courseTitle
                        .toLowerCase()
                        .includes(action.searchinfo.toLowerCase()),
                    );
                    const searchedMasterClassess = state.masterclassInfo.filter(
                        eachItem =>
                        eachItem.masterclassTitle
                        .toLowerCase()
                        .includes(action.searchinfo.toLowerCase()),
                    );
                    draft.searchResultsAllCourses = searchedAllCourses;
                    draft.allCoursesInfo = searchedAllCourses;
                    draft.searchResultsEnrolledCourses = searchedEnrolledCourses;
                    draft.searchResultsMasterClasses = searchedMasterClassess;
                }
                break;
            case 'ADD_COURSE':
                {
                    const [courseinfo, title, info] = action.newcourseinfo;
                    const newCourseAdded = {
                        _id: courseinfo._id,
                        courseImage: courseinfo.courseImage,
                        courseTitle: title,
                        courseInfo: info,
                    };
                    draft.allCoursesInfo = [...draft.allCoursesInfo, newCourseAdded];
                    draft.initialAllCoursesInfo = [
                        ...draft.initialAllCoursesInfo,
                        newCourseAdded,
                    ];
                }
                break;
            case 'ADD_MASTERCLASS':
                {
                    const newMasterclass = {
                        id: state.masterclassInfo.length + 1,
                        masterclassImage: action.courseinfo[0][0].data_url,
                        masterclassTitle: action.courseinfo[1],
                        masterclassSpeaker: action.courseinfo[2],
                        speakerProfession: action.courseinfo[3],
                        speakerCollege: action.courseinfo[4],
                    };

                    const newMasterclassInfo = [...state.masterclassInfo, newMasterclass];
                    draft.masterclassInfo = newMasterclassInfo;
                    draft.searchResultsMasterClasses = newMasterclassInfo;
                }
                break;
            case 'PLAY_SELECTED_CLASS':
                draft.selectedClassInfo = action.selectedClass;
                break;
            case 'PLAY_SELECTED_MASTERCLASS':
                draft.selectedMasterclassInfo = action.selectedMasterclass;

                break;
            case 'UPDATE_SELECTED_COURSE':
                {
                    draft.selectedCourseInfo = action.courseinfo;
                    const [selectedCourse] = action.courseinfo;
                    draft.selectedClassInfo = selectedCourse;
                }
                break;
            case 'ADD_COMMENT':
                {
                    const newComment = {
                        _id: action.commentsinfo._id,
                        initial: state.loggedinUserInitial,
                        username: state.loggedinUsername,
                        comment: action.commentsinfo.comment,
                    };
                    draft.commentsList = [...draft.commentsList, newComment];
                }
                break;
            case 'LIKE_CLASS':
                draft.selectedMasterclassInfo.classLiked = !draft
                    .selectedMasterclassInfo.classLiked;
                draft.selectedClassInfo.classLiked = !draft.selectedClassInfo
                    .classLiked;
                break;
            case 'UPDATE_PROFILE':
                {
                    const [name, email, password] = action.profileinfo;
                    draft.loggedinUsername = name;
                    draft.loggedinUserEmail = email;
                    draft.loggedinUserPassword = password;
                }
                break;
            case 'SELECT_DISCUSSION':
                {
                    draft.selectedDiscussion = action.discussioninfo;

                    const filterSolution = draft.discussionSolutions.filter(
                        el => el.id === action.discussioninfo.id,
                    );
                    const [solution] = filterSolution;
                    draft.selectedDiscussionSolutions = solution;
                }
                break;
            case 'UPDATE_SELECTED_DISCUSSION':
                {
                    const selectedDiscussionDetails = action.discussioninfo[0];
                    const solutions = action.discussioninfo[1];
                    draft.selectedDiscussion = selectedDiscussionDetails;
                    draft.selectedDiscussionSolutions = solutions;
                }
                break;
            case 'ADD_SOLUTION':
                {
                    const newSolution = {
                        _id: action.solutioninfo._id,
                        name: action.solutioninfo.name,
                        initialName: action.solutioninfo.initialName,
                        discussionReply: action.solutioninfo.discussionReply,
                    };
                    draft.selectedDiscussionSolutions = [
                        ...draft.selectedDiscussionSolutions,
                        newSolution,
                    ];
                }
                break;
            case 'ADD_DISCUSSION':
                {
                    const newDiscussion = {
                        _id: action.discussioninfo._id,
                        discussionTitle: action.discussioninfo.discussionTitle,
                        discussionInfo: action.discussioninfo.discussionInfo,
                        name: action.discussioninfo.name,
                        initialName: action.discussioninfo.initialName,
                    };
                    draft.discussionList = [...draft.discussionList, newDiscussion];
                }
                break;
            case 'USER_LOGGEDIN':
                {
                    const [userdetails, password] = action.userinfo;
                    draft.loggedinUsername = userdetails.name;
                    draft.loggedinUserPassword = password;
                    draft.loggedinUserEmail = userdetails.email;
                    draft.loggedinUserRole = userdetails.role;
                    draft.loggedinUserId = userdetails.id;
                    draft.loggedinUserInitial = userdetails.initialName;
                    draft.loggedinUserPurchased = userdetails.purchasedCourse;
                    draft.initialEnrolledCourseInfo = userdetails.purchasedCourse;
                    draft.searchedEnrolledCourses = userdetails.purchasedCourse;
                }
                break;
            case 'FETCH_ALL_COURSES':
                {
                    draft.allCoursesInfo = action.coursesinfo;
                    draft.initialAllCoursesInfo = action.coursesinfo;
                    const enrolledCourses = draft.allCoursesInfo.filter(el => {
                        if (draft.loggedinUserPurchased.includes(el._id)) {
                            return el;
                        }
                        return null;
                    });
                    draft.initialEnrolledCourseInfo = enrolledCourses;
                    draft.searchResultsEnrolledCourses = enrolledCourses;
                }
                break;
            case 'FETCH_ALL_DISCUSSIONS':
                draft.discussionList = action.discussioninfo;
                break;
            case 'GET_COMMENTS':
                {
                    const comments = action.commentsinfo.map(el => ({
                        _id: el._id,
                        initial: el.initialName,
                        username: el.name,
                        comment: el.comment,
                    }));
                    draft.commentsList = comments;
                }
                break;
            default:
                break;
        }
    });

// export default wholeReducer;
export default persistReducer(persistConfig, wholeReducer);