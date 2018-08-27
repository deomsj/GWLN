import t from 'tcomb-form-native';

export const guestForm = t.struct({
  first_name: t.String,
  last_name: t.String,
  email: t.String
});

export const GuestOptions = {
  fields: {
    name: {
      label: 'First Name',
      error: 'Please enter attendee first name'
    },
    surname: {
      label: 'Last Name',
      error: 'Please enter attendee last name'
    },
    email: {
      label: 'Email',
      error: 'Please enter attendee email'
    }
  }
};

export const memberForm = t.struct({
  email: t.String
});

export const MemberOptions = {
  fields: {
    email: {
      label: 'Email'
    }
  }
};
