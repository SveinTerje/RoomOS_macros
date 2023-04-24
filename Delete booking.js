import xapi from 'xapi';

let bookingId = null;

function listenToGui() {
  xapi.Event.UserInterface.Extensions.Panel.Clicked.on((event) => {
    if(event.PanelId === 'decline_booking'){
	  xapi.Command.Bookings.Get({Id: bookingId}).then(book => {
        xapi.Command.Bookings.Respond({
		  Type: "Decline",
          MeetingId: book.Booking.MeetingId
        });
      });
	};
  });
};

listenToGui();

// Creating the UI extensions needed

function createPanel(id, name) {
  const panel = `
  <Extensions>
   <Panel>
      <Origin>local</Origin>
      <Location>HomeScreen</Location>
      <Icon>Handset</Icon>
      <Color>#232323 </Color>
      <Name>${name}</Name>
      <ActivityType>Custom</ActivityType>
      <Type>Statusbar</Type>
    </Panel>
  </Extensions>`;

  xapi.Command.UserInterface.Extensions.Panel.Save(
    {PanelId: id},
    panel
  );
} 

createPanel('decline_booking', 'Delete current booking'); 