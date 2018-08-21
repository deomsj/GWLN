import { createStackNavigator } from 'react-navigation';

import SignIn from './views/All/SignIn';
import MemberContactPage from './views/User/MemberContactPage';
import MemberList from './views/User/MemberList';
import MyUpcomingEvents from './views/User/MyUpcomingEvents';
import EventDetails from './views/All/EventDetails';
import NewBlogPost from './views/User/NewBlogPost';
import BlogPostList from './views/All/BlogPostList';
import BlogPost from './views/All/BlogPost';
import Guest from './views/Guest';
import GuestRSVP from './views/Guest/RSVP';
import GuestCalendar from './views/Guest/Calendar';
import GuestBlog from './views/Guest/Blog';
import GuestCalendarDetail from './views/Guest/CalendarDetail';
import Member from './views/Member';
import MemberRSVP from './views/Member/RSVP';
import Admin from './views/Admin';
import FeedbackForm from './views/Admin/FeedbackForm';
import CreateEvent from './views/Admin/CreateEvent';
import CheckIn from './views/Admin/CheckIn';
import AdminEventDetails from './views/Admin/EventDetails';
import AttendeeList from './views/Admin/AttendeeList';
import Profile from './views/User/Profile';
import UserCalendar from './views/User/UserCalendar';

const NavigationFlow = createStackNavigator(
  {
    //Guest
    Guest,
    GuestRSVP,
    GuestCalendar,
    GuestCalendarDetail,
    GuestBlog,

    //Member
    Member,
    MemberRSVP,
    EventDetails,

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
    UserCalendar,

    //All
    SignIn,
    BlogPostList,
    BlogPost
  },
  {
    initialRouteName: 'SignIn'
  }
);

export default NavigationFlow;
