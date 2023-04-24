import xapi from 'xapi';

function createPanel() {
  const panel = `
  <Extensions>
  <Panel>
    <Location>HomeScreen</Location>
    <Icon>Custom</Icon>
    <Color>#000000</Color>
    <Name>Room Mode</Name>
    <ActivityType>Custom</ActivityType>
    <CustomIcon>
      <Content>iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAACToAAAk6AGCYwUcAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAm1JREFUaIHtmrFu01AUhr+LUNsBCQmaDSF4ighBW4ZWDEgINpRXqGDtKzBQYOojwAYSEgPtAmKBSi2PAIi1HdiSCuVnsJ1egp06OY6N7fstvYrtc87nOtcn0oFAIBNJXUmbkpZKyLUU5+rOO9ekIo4V8aiEXI/jXEeWOOeMdVyK/142xiktl1W4drRO+HzWAUkdYAO4Argz4tyUtFVkYWk5ksWEXAJ+AnvOuXzf9Xg3fCFpoPoykPRcKW8PNy4L7AG38t72/5xPwIZzbpB6VNF/NuFA0oqkxXJrnB1Ji5JWJR16HttZJ3d0+hgfSFooud7CkLTgSQ8kLaed1PPuykoFdRaKpDXP52Hyuf9auuqt98srbW589tbXkoUvPNrRMr/kNWLMYeTWusYjCDedINx0TMKSXkkaWhvfKRhKelmZMLDO2b+kisTFOWcm8+dhTu4C9wqIk5ffwFtLAFOhzrl9ataVhU2r6QThphOEm07rhE3vYUmbwP2CasnLG+fczqwXWzukJ8AFY4xp6QKVCW8BD4wxpuW15WJra7mD4W5XQes2rSDcdIJw0wnCTcfaWnaB28WUkpsPzrkvs15s7bTeUc7Iks8R0Jn1YusjvQsMjTGmYQi8twSwtpY9oGeJUTat27SCcNMJwk3HF+4nC9VoGC2LMYeRmy/8w1tXN3VeHDe89fd/jkpa1ukk3qHqP4n3NXbpS0rvBhVNoMqTXq3T461o1nLNk5Wkp/45adO0u0DtRw9jPgJ3/CG1v3Zp51yfaCj8GXBSbm2FcgJsMyYLE+YzFE2grgPXgYtzLa84fgHfiCbij6suJlAFfwCB9XXD3MkQgAAAAABJRU5ErkJggg==</Content>
      <Id>595923c26fcbc9f528bf8fdaeecfc775cd58353ea7a587f0430479c01305b284</Id>
    </CustomIcon>
    <Page>
      <Name>Room Mode</Name>
      <Row>
        <Name>Row</Name>
        <Widget>
          <WidgetId>roomMode</WidgetId>
          <Type>GroupButton</Type>
          <Options>size=4;columns=4</Options>
          <ValueSpace>
            <Value>
              <Key>normal</Key>
              <Name>Normal</Name>
            </Value>
            <Value>
              <Key>training</Key>
              <Name>Training</Name>
            </Value>
          </ValueSpace>
        </Widget>
      </Row>
      <Options>hideRowNames=1</Options>
    </Page>
  </Panel>
</Extensions>`;

  xapi.Command.UserInterface.Extensions.Panel.Save(
        { PanelId: 'roomMode_panel' },
        panel
      );
} 

createPanel();


function initialize(){
  xapi.Config.Video.Output.Connector[1].MonitorRole.set('First');
	xapi.Config.Video.Output.Connector[2].MonitorRole.set('Second');
  xapi.Config.Video.Output.Connector[3].MonitorRole.set('First');
	xapi.Command.UserInterface.Extensions.Widget.SetValue({ Value: 'normal', WidgetId: 'roomMode' });
}
	
initialize();


xapi.event.on('UserInterface Extensions Widget Action', (event) => {
  if (event.WidgetId === 'roomMode' && event.Type === 'released') {
    switch (event.Value){
      case 'training':
		    xapi.Config.Video.Monitors.set('DualPresentationOnly');
		    xapi.Config.Video.Output.Connector[1].MonitorRole.set('Second');
		    xapi.Config.Video.Output.Connector[2].MonitorRole.set('Second');
        xapi.Config.Video.Output.Connector[3].MonitorRole.set('First');
        break;
      case 'normal':
		    xapi.Config.Video.Monitors.set('Dual');
        xapi.Config.Video.Output.Connector[1].MonitorRole.set('First');
		    xapi.Config.Video.Output.Connector[2].MonitorRole.set('Second');
        xapi.Config.Video.Output.Connector[3].MonitorRole.set('First');
		
        break;
    }
  }
 });

