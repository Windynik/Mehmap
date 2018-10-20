import  React , { Component }  from 'react';
import {observable,action} from 'mobx';
import { observer } from "mobx-react"
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios';
import _ from 'lodash';

const API="AIzaSyATXdLQPruIMYrNhmraxiutk5qLygKnuLc"
var location;
@observer
class SearchBar extends Component{
    @observable theactualinput='';
    @observable lat="9.931233"
    @observable lon="76.267303"
    @observable place;

    Handlingchange = action(event =>{
        const {value} = event.target; 
        this.theactualinput=value;
        this.lochange(value)
    });
    
    lochange=_.debounce(action(event=>{

        location=event;
        axios.get(` https://nominatim.openstreetmap.org/search?format=json&q=${location}&limit=1`).then(res=>{
            
            if (res.data.length===0){
                this.lon="76.267303"
                this.lat="9.931233"
                this.place="Couldn't Find any place like that.."
            }
            else{
                console.log(res)
            console.log(res.data[0].lat)
            console.log(res.data[0].lon)
                this.lat=res.data[0].lat;
                this.lon=res.data[0].lon;
                this.place=res.data[0].display_name;
            }
            
        })
        
        
    }),500);
    render(){
        if(!this.lat){
            this.lat="9.931233";
            this.lon="76.267303"
        }
        return(
        <div>
            <input 
            className="form-control" 
            type="text" 
            placeholder="Search here!"
            value={this.theactualinput}
            onChange={this.Handlingchange}
            ></input>
            <p>What you searched for is : {this.theactualinput}</p>
            <p>Latitude is : {this.lat}</p>
            <p>Longitude is : {this.lon}</p>
            <p>Place : {this.place}</p>
        
        <Map google={this.props.google} zoom={10}
        center={{
            lat: this.lat,
            lng: this.lon
        }}
        initialCenter={{
            lat: this.lat,//Kochi Lat and lon.
            lng: this.lon//initial lat
            }}>

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
                
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
            <h1>{this.theactualinput}</h1>
            </div>
        </InfoWindow>
        </Map>
        </div>
        )
        

    }
}
export default GoogleApiWrapper({
    apiKey: (API)
})( SearchBar);