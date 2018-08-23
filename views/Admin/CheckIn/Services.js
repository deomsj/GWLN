const url = 'https://cuwomen.org/functions/app.gwln.php';

export const fetchMemberInfo = username =>
  fetch(url, {
    method: 'POST',
    headers: {
      'X-Token': 'hub46bubg75839jfjsbs8532hs09hurdfy47sbub'
    },
    body: JSON.stringify({
      code: 'getMemberInformationByUsername',
      arguments: {
        // timeline_event_id: this.props.navigation.state.params.CheckInEventID,
        username
      }
    })
  });

export const fetchEventCheckIn = (eventId, meminfo, like_to_be = false) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'X-Token': 'hub46bubg75839jfjsbs8532hs09hurdfy47sbub'
    },
    body: JSON.stringify({
      code: 'eventCheckin',
      arguments: {
        timeline_event_id: eventId,
        member_id: meminfo.member_id || null,
        first_name: meminfo.first_name,
        last_name: meminfo.last_name,
        email: meminfo.email1 || meminfo.email,
        guests: 1,
        like_to_be
      }
    })
  });
