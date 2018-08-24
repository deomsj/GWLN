import { createStackNavigator } from 'react-navigation';

import SignIn from './views/All/SignIn';
import EventDetails from './views/All/EventDetails';
import EventCalendar from './views/All/EventCalendar';
import Blog from './views/All/Blog';
import BlogPost from './views/All/BlogPost';
import RSVP from './views/All/RSVP';

import MemberContactPage from './views/User/MemberContactPage';
import MemberList from './views/User/MemberList';
import MyUpcomingEvents from './views/User/MyUpcomingEvents';
import NewBlogPost from './views/User/NewBlogPost';

import Guest from './views/Guest';
import Member from './views/Member';
import Admin from './views/Admin';
import FeedbackForm from './views/Admin/FeedbackForm';
import CreateEvent from './views/Admin/CreateEvent';
import CheckIn from './views/Admin/CheckIn';
import AdminEventDetails from './views/Admin/AdminEventDetails';
import AttendeeList from './views/Admin/AttendeeList';
import Profile from './views/User/Profile';

console.disableYellowBox = true;

const NavigationFlow = createStackNavigator(
  {
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
  },
  {
    initialRouteName: 'SignIn'
  }
);

export default NavigationFlow;
