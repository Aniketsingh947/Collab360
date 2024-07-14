import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import {GetEvents,UpdateEvents} from "./utils/APIroutes" 
import { DataManager,  UrlAdaptor } from '@syncfusion/ej2-data';
import {registerLicense} from '@syncfusion/ej2-base';
import CustomUrlAdaptor from './Subcomponents/CustomUrlAdaptor';
import { ChatState } from './Context/Context';
registerLicense(
    "Ngo9BigBOggjHTQxAR8/V1NAaF1cXmhKYVJzWmFZfVpgdVRMYlxbQHBPMyBoS35RckVhWHpfdHBTR2RZVUV2"
);
const Calendar = () => {
    const {user}=ChatState();
    if(user)
    {
    const dataManager = new DataManager({
        url: `${GetEvents}?userId=${user._id}`,
        crudUrl: `${UpdateEvents}?userId=${user._id}`,
        adaptor: new UrlAdaptor(),   
        crossDomain: true
      });
      const fieldsData = {
        id: 'id',
        subject: { name: 'subject' },
        isAllDay: { name: 'isallday' },
        location: { name: 'location' },
        description: { name: 'description' },
        startTime: { name: 'starttime' },
        endTime: { name: 'endtime' },
        startTimezone: { name: 'starttimezone' },
        endTimezone: { name: 'endtimezone' },
        recurrenceID: {name:'recurrenceid'},
        recurrenceRule:{name:'recurrencerule'},
        recurrenceException: {name:'recurrenceexception'},
        followingID:{name:'followingid'}
       }
    const eventSettings = { dataSource: dataManager, fields: fieldsData }

    return (<ScheduleComponent height='550px' eventSettings={eventSettings}>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>);
    }
}
export default Calendar;