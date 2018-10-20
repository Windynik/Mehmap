import React,{Component} from 'react'
import {observable} from 'mobx';
import {observer} from 'mobx-react';

const appState=observable({
        count:5,
        searchTerm:[]
})
appState.increase=function(){
    this.count++;
}
appState.decrease=function(){
    this.count--;
}
appState.changes=function(word){
        this.searchTerm=word.value;
}

@observer class Count extends React.Component{
    @observable searchterm=[];
render(){
    return(
        <div>
            <p>Number of fucks to give : {appState.count} </p>
            <button className="btn btn-primary" onClick={this.handleInc}> Up! </button>
            <button className="btn btn-danger" onClick={this.handleDec}> Down! </button>
            <input type="text" className="form-control" value={appState.searchTerm} onChange={this.handleChange} ref={input=>this.word=input} placeholder="Input anything here!" />
        </div>
    )
}
handleChange=()=>{

    console.log("Wewlad this worked");
    appState.changes(this.word.value);
}
handleDec=()=>{
    if(appState.count<=0){
        alert("Whoops , ran outta fucks to give.")
}
            appState.decrease();
}
handleInc=()=>{
            appState.increase();
}

}
export default Count;