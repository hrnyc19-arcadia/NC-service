import React from 'react';
import ImageLoader from 'react-image-file';

const fr = new FileReader();

class Review extends React.Component{
    constructor(props){
        super(props);
        this.state={
            reviewId: null,
            username: null,
            photo: null, 
            date:  null,                   
            message: "",
            showAll: true,
        }
    }
    componentDidMount(){
       let {id,username,message,date}= this.props.review;
        this.setState({
                reviewId: id,
                username: username,                                
                message: message,
                photoSrc: null
        });
        if(message.length>290) this.setState({showAll:false});
        let unformattedDate = new Date(date);
        let month = ['January','February','March','April','May','June','July','August','September','October','November','December'][unformattedDate.getMonth()];
        this.setState({date:`${month}, ${unformattedDate.getFullYear()}`})       
        // this.props.getUserPhoto(id,  blob=>{
        //     this.setState({photoSrc: blob})                
            
            
                // fr.readAsDataURL(blob)});
        // })

    }       
    render(){  
        let {id,username,photoSrc,date,message} = this.state;  
        console.log('username is: ',username)   
    return (
        <panel id={id}>
            <ImageLoader alt={`${username} user profile`} file={this.props.getUserPhoto(id)} /> 
            
           <div>
            <strong>{username}</strong> 
             <br/>
             {date}
             </div>          
            <br/>            
               {this.state.showAll?  message : message.substring(0,280)+"..."}
               {!this.state.showAll? (<a href="#"  onClick={()=>this.setState({showAll:true})} >Read more</a>):null}
            
        </panel>
    )
    }
}

export default Review;