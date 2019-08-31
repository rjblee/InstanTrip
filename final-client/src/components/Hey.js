import React from "react";
import {GoogleMap, withScriptjs, withGoogleMap} from "react-google-maps";

function Map(){
	return ( 
					<GoogleMap 
							defaltZoom={10}
							defaulCenter={{ lat:49.282730, lng:-123.120735}}
						/>
		);
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function Hey(){
	return(
		<div style={{width:"100vw",height:"100vh"}}>
			<WrappedMap 
			googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDtGZmEeW3QEK20irH8SpIpdKQjPoKuW5U`}
			loadingElement={<div style={{height:"100%"}} />}
			containerElement={<div style={{height:"100%"}} />}
			mapElement={<div style={{height:"100%"}} />}
		/>
		</div>
	)
}
