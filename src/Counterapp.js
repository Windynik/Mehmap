import React,{Component} from 'react'
import {observable,action} from 'mobx';
import {observer} from 'mobx-react';

const appState=observable({
        count:5,
        input:""
})

appState.increase=function(){
    this.count++;
}
appState.decrease=function(){
    this.count--;
}



@observer class Count extends Component{

        
render(){
    
    return(
        
        <div>
            <p>Number of fucks to give : {appState.count} </p>
            <button className="btn btn-primary" onClick={this.handleInc}> Up! </button>
            <button className="btn btn-danger" onClick={this.handleDec}> Down! </button>
            <input type="text" className="form-control" value={appState.input} onChange={this.onchanges}  placeholder="Input anything here!" />
            <p> The word that you typed is : {appState.input}</p>
        </div>
    )
}
@action onchanges=(e)=>{
    appState.input=e.target.value
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