import React from 'react';
import './side_nav_bar.less';
import {Link} from 'react-router';
import Search from '../search/search';
import '../popup/popup.less';
import {connect} from 'react-redux';
import ACTION from '../../action_constants';
import '../../common.less';


class SideNavBar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            search_tags:'search_tags',
            search_filter:'search_filter',
            platformArr :[{name:"IOS",count:"1234"},{name:"ANDRIOD",count:"1234"},{name:"WEB", count:"342"}],
            dateArr :[{name:"DATE CREATED",count:"1234"},{name:"DATE MODIFIED",count:"1234"}],
            icons:[{name:"PNG",count:"1234"},{name:"JPEG",count:"1234"},{name:"PDF", count:"342"},{name:"SVG", count:"342"}],
            selectedPlatform:[],
            sidenavbool:false,
            selectedIcon:[],
            selectedSize:[],
            selectDate:'',   
            selectProject:[],
            projects:[],                 
            selectedPlatformBool:false,
            selectedIconBool:false,
            selectedSizeBool:false,
            selectDateBool:false,
            selectedProjectBool:false,     
            topProjects:5,
            factesBool:true,
            width_size:'',
            heigth_size:'',
            project_id:[],
            showfavourite:true
        }
    }
    selectProject=(id,e)=>{
        if(e.target.checked==true){
            this.state.selectProject.push(e.target.value); 
            this.state.project_id.push(id);             
        }else{
            this.state.selectProject.splice(this.state.selectProject.indexOf(e.target.value),1);
            this.state.project_id.splice(this.state.project_id.indexOf(id),1);
            
        }
    }
    selectPlatform=(e)=>{
        if(e.target.checked==true){
            this.state.selectedPlatform.push(e.target.value);                    
        }
        else{
            this.state.selectedPlatform.splice(this.state.selectedPlatform.indexOf(e.target.value),1);
        }
    }
    selectIcon=(e)=>{
        if(e.target.checked==true){            
        this.state.selectedIcon.push(e.target.value);                
        }else{
            this.state.selectedIcon.splice(this.state.selectedIcon.indexOf(e.target.value),1);
        }
    }
    selectDate=(e)=>{
        // if(e.target.checked==true){                        
        //     this.state.selectDate.push(e.target.value);                
        // }else{
        //     this.state.selectDate.splice(this.state.selectDate.indexOf(e.target.value),1);
        // }
        this.setState({
            selectDate:e.target.value
        })
    }
    selectSize=(type,e)=>{
        let newStateSize=Object.assign({},this.state);
        if(type=="width"){
            newStateSize.width_size=e.target.value;
        }else{
            newStateSize.heigth_size=e.target.value
        }
        this.setState(newStateSize);
    }
    filtersearch=()=>{
        let param={
            project:this.state.selectProject.toString(),
            fileFormat:this.state.selectedIcon.toString(),
            Plateform:this.state.selectedPlatform.toString(),
            Id:this.state.project_id.toString(),            
            Date:this.state.selectDate,
            width:this.state.width_size,
            height:this.state.heigth_size,
        }
        const{dispatch}=this.props;
        dispatch({type:ACTION.SIDENAV.SEARCHFILTER,data:param});
        console.log(param);
    }
    toggle=(tags,e)=>{
        if(tags=="Plateform"){
            this.setState({
                selectedPlatformBool:!this.state.selectedPlatformBool,
            })
        }else if(tags=="Date"){
            this.setState({
                selectDateBool:!this.state.selectDateBool,
                
            })
        }else  if(tags=="Icons"){
            this.setState({
                selectedIconBool:!this.state.selectedIconBool,
                
            })
        }else if(tags=="Size"){
            this.setState({
                selectedSizeBool:!this.state.selectedSizeBool,
                
            })
        }
        else if(tags=="Project"){
            this.setState({
                selectedProjectBool:!this.state.selectedProjectBool,
                
            })
        }

    }
    OnclickMoreLoad=()=>{
        this.setState({
            sidenavbool:!this.state.sidenavbool,
        })
    }
    hideAll=(event)=>{
            this.setState({
                selectedPlatformBool:false,
                selectedProjectBool:false,
                selectedSizeBool:false,
                selectedIconBool:false,  
                selectDateBool:false,
                factesBool:!this.state.factesBool,
            })
    }
    showAll=(event)=>{
        this.setState({
            selectedPlatformBool:true,
            selectedProjectBool:true,
            selectedSizeBool:true,
            selectedIconBool:true,  
            selectDateBool:true,
            factesBool:!this.state.factesBool,
        })
    }
    onClickfavourite=(index,e)=>{
        e.preventDefault();
        const newState = Object.assign(this.state);
        newState.projects.forEach((item, folderIndex)=> {
          if(index === folderIndex) {
            item.showfavourite = !item.showfavourite;   
          }
        });
        this.setState(newState);
        e.stopPropagation(); 
   }
   
    render(){
        console.log("project list",this.state.projects);
        return(
            <div className="side-nav-cont">
                {this.state.sidenavbool &&
                  <div className="aSearch_option-Project-Admin">
                      <div className="icon-icn_close_project close-sidebar" onClick={this.OnclickMoreLoad.bind(this)} ></div>
                    <Search type={this.state.search_filter}/>  
                    <div className="project-display">
                    {this.state.projects.map((item,index) => {
                    return(
                    <label key={index} className="container sub-cat-cont"><span>{item.directoryName}</span>
                        <input type="checkbox" value={item.directoryName} onClick={this.selectProject.bind(this,item._id)}/>  
                        {!item.showfavourite && <span id={index} onClick={this.onClickfavourite.bind(this,index)} className="icon-icn_favorite fav-icon"></span>}
                        {item.showfavourite && <span id={index} onClick={this.onClickfavourite.bind(this,index)} className="icon-icn_favorite_selected fav-icon"></span>}
                        <span className="checkmark"></span>
                    </label>
                   ) 
                    })
                }
                     </div>         
                  </div>
            }
                 <Search type={this.state.search_tags}/>           
                 <div className="filter-cont">
                  {!this.state.factesBool &&  <div onClick={this.hideAll.bind(this)} className="hide-factes">Hide Factes</div> }
                  {this.state.factesBool &&  <div onClick={this.showAll.bind(this)} className="hide-factes">Show Factes</div> }
                 {/* project section */}
                 <div className="category-cont">
                    <div className="title">PROJECT
                    {this.state.selectedProjectBool && <span onClick={this.toggle.bind(this,"Project")} className="icon-icn_up_arrow drop-icon"></span>}
                    {!this.state.selectedProjectBool && <span onClick={this.toggle.bind(this,"Project")} className="icon-icn_drop_down drop-icon"></span>}
                    { this.state.selectedProjectBool && 
                        <div className="">
                        {this.state.projects.map((item,index) =>  {
                            if(index<this.state.topProjects){
                                return(
                                    <div className="">
                                        <label className="container sub-cat-cont"><span>{item.directoryName}</span>
                                            <input type="checkbox" key={index} value={item.directoryName} onClick={this.selectProject.bind(this,item._id)}/>  
                                            <span className="checkmark"></span>
                                        </label>
                                    </div> 
                            )    
                         }                                      
                    })
                            
                }
                    {!this.state.sidenavbool && <div onClick={this.OnclickMoreLoad.bind(this)} className="LOAD-MORE">LOAD MORE  >></div>}
                    {this.state.sidenavbool && <div onClick={this.OnclickMoreLoad.bind(this)} className="LOAD-MORE">LOAD LESS >> </div>}
                    </div> 
                        
         }
                </div> 
            </div>
                {/* platform section */}
             <div className="category-cont">
                <div className="title">PLATFORM
                    {this.state.selectedPlatformBool && <span onClick={this.toggle.bind(this,"Plateform")} className="icon-icn_up_arrow drop-icon"></span>}
                    {!this.state.selectedPlatformBool && <span onClick={this.toggle.bind(this,"Plateform")} className="icon-icn_drop_down drop-icon"></span>}    
                    </div>
                    {this.state.selectedPlatformBool && <div className="">
                        {this.state.platformArr.map((item,index) =>  {                                    
                                    return(
                                        <div className="">
                                            <label className="container sub-cat-cont"><span>{item.name}</span>
                                               <input type="checkbox" value={item.name}  onClick={this.selectPlatform.bind(this)}/>  
                                                <span className="checkmark"></span>
                                            </label>
                                            <div className="data-count">{item.count}</div>
                                        </div> 
                                )                   
                            })
                        }
                    </div>  }                  
                    </div> 
                        {/* Icons section */}
                 <div className="category-cont">
                    <div className="title">ICONS
                    {this.state.selectedIconBool && <span onClick={this.toggle.bind(this,"Icons")} className="icon-icn_up_arrow drop-icon"></span>}
                    {!this.state.selectedIconBool && <span onClick={this.toggle.bind(this,"Icons")} className="icon-icn_drop_down drop-icon"></span>}                     </div>
                    { this.state.selectedIconBool && <div className="">
                        {this.state.icons.map((item,index) =>  {                                    
                                    return(
                                        <div className="">
                                            <label className="container sub-cat-cont"><span>{item.name}</span>
                                                <input type="checkbox" value={item.name}  onClick={this.selectIcon.bind(this)}/>  
                                                <span className="checkmark"></span>
                                            </label>
                                            <div className="data-count">{item.count}</div>
                                        </div> 
                                )                   
                            })
                        }
                    </div>   }   
                    </div>              
                {/* Date section */}        
                 <div className="category-cont">
                    <div className="title">BY DATE
                    {this.state.selectDateBool && <span onClick={this.toggle.bind(this,"Date")} className="icon-icn_up_arrow drop-icon"></span>}
                    {!this.state.selectDateBool && <span onClick={this.toggle.bind(this,"Date")} className="icon-icn_drop_down drop-icon"></span>}                     </div>
                   {this.state.selectDateBool && <div className="">
                        {this.state.dateArr.map((item,index) =>  {                                    
                                    return(
                                        <div className="">
                                            <label className="container sub-cat-cont"><span>{item.name}</span>
                                                <input type="checkbox" value={item.name}  onClick={this.selectDate.bind(this)}/>  
                                                <span className="checkmark"></span>
                                            </label>
                                            <div className="data-count">{item.count}</div>
                                        </div> 
                                )                   
                            })
                        }
                    </div>       }           
                </div>
                {/* SIZE section */}
                 <div className="category-cont">
                    <div className="title">BY SIZE
                    {this.state.selectedSizeBool && <span onClick={this.toggle.bind(this,"Size")} className="icon-icn_up_arrow drop-icon"></span>}
                    {!this.state.selectedSizeBool && <span onClick={this.toggle.bind(this,"Size")} className="icon-icn_drop_down drop-icon"></span>}                     </div>
                    {this.state.selectedSizeBool && 
                     <div className="">
                        <div className="">
                            <label className="container sub-cat-cont-input"><span>WIDTH (px)</span>
                            </label>
                            <input type="text" onChange={this.selectSize.bind(this,"width")} placeholder="Enter" className="data-input"></input>
                        </div> 
                        <div className="">
                            <label className="container sub-cat-cont-input"><span>HEIGHT (px)</span>
                            </label>
                            <input type="text" onChange={this.selectSize.bind(this,"height")} placeholder="Enter" className="data-input"></input>
                        </div> 
                    </div>   
                }             
                </div>

            <button className="side-bar-search" onClick={()=>this.filtersearch(this)}>Search</button>               
        </div>  
        </div>
        );
    }
    componentWillReceiveProps(newprops){
        let newState;
        newState=Object.assign({},this.state);
        if("project_selected" in localStorage){
             console.log('yes');
             const objects = JSON.parse(localStorage.getItem("project_selected"));
             newState.projects=objects;
        } else {
             console.log('no');
            if(newprops.dashboard.folderArray){
            localStorage.setItem("project_selected", JSON.stringify(newprops.dashboard.folderArray.folderList));
            newState.projects=newprops.dashboard.folderArray.folderList;
           }
        }      
        //  if(newprops.dashboard.folderArray){
        //     newState.projects=newprops.dashboard.folderArray.folderList;
        // }
        this.setState(newState);
        
    }
    componentDidMount() {
        let params ={};       
        const { dispatch } = this.props;  
        dispatch({type : ACTION.DASHBOARD.FOLDERLIST, data : params });
    } 
}

const mapStateToProps = state => {
    return {
  dashboard:state.dashboard
    };
  };

  export default connect(mapStateToProps)(SideNavBar);