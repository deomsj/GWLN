import SignIn from './All/SignIn';
import EventDetails from './All/EventDetails';
import EventCalendar from './All/EventCalendar';
import Blog from './All/Blog';
import BlogPost from './All/BlogPost';
import RSVP from './All/RSVP';

import MemberContactPage from './User/MemberContactPage';
import MemberList from './User/MemberList';
import MyUpcomingEvents from './User/MyUpcomingEvents';
import NewBlogPost from './User/NewBlogPost';

import Guest from './Guest';
import Member from './Member';
import Admin from './Admin';
import FeedbackForm from './Admin/FeedbackForm';
import CreateEvent from './Admin/CreateEvent';
import CheckIn from './Admin/CheckIn';
import AdminEventDetails from './Admin/AdminEventDetails';
import AttendeeList from './Admin/AttendeeList';
import Profile from './User/Profile';

const routes = {
  //Guest
  Guest,

  //Member
  Member,

  //Admin
  Admin,
  AttendeeList,
  CheckIn,
  CreateEvent,
  FeedbackForm,
  MyUpcomingEvents,
  AdminEventDetails,

  //User (Member and Admin)
  MemberList,
  MemberContactPage,
  NewBlogPost,
  Profile,

  //All
  SignIn,
  Blog,
  BlogPost,
  EventCalendar,
  EventDetails,
  RSVP
};

export default routes;
