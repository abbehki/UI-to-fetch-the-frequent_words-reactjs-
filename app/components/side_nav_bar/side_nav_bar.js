import React from 'react';
import './side_nav_bar.less';
import {Link} from 'react-router';
import Search from '../search/search';
import '../popup/popup.less';

class SideNavBar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            search_tags:'search_tags',
            platformArr :[{name:"IOS",count:"1234"},{name:"ANDRIOD",count:"1234"},{name:"WEB", count:"342"}],
            dateArr :[{name:"DATE CREATED",count:"1234"},{name:"DATE MODIFIED",count:"1234"}],
            sizeArr :[{name:"WIDTH",count:"1234"},{name:"HEIGHT",count:"1234"}],
            icons:[{name:"PNG",count:"1234"},{name:"JPEG",count:"1234"},{name:"PDF", count:"342"},{name:"PDF", count:"342"}],
            selectedPlatform:'',
            selectedIcon:'',
            selectedSize:'',
            selectedPlatformBool:true,
            selectedIconBool:true,
            selectedSizeBool:true,
            selectDateBool:true,
            selectedProjectBool:true,           
        }
    }

    selectPlatform=(e)=>{
        this.setState({selectedPlatform:e.target.value})
    }
    selectIcon=(e)=>{
        this.setState({selectedIcon:e.target.value})
    }
    selectDate=(e)=>{
        this.setState({selectedDate:e.target.value})
    }
    selectSize=(e)=>{
        this.setState({selectedSize:e.target.value})
    }
    filtersearch=()=>{
        console.log(this.state.selectedIcon);
        console.log(this.state.selectedPlatform);
        console.log(this.state.selectedDate);
        console.log(this.state.selectedSize);
    }
    toggle=(tags,e)=>{
        if(tags=="Plateform"){
            this.setState({
                selectedPlatformBool:!this.state.selectedPlatformBool,
                arrow:!this.state.arrow
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
    render(){
        return(
            <div className="side-nav-cont">
                 <Search type={this.state.search_tags}/>           
                 <div className="filter-cont">
                 <div className="hide-factes">Hide Factes</div> 
                 {/* platform section */}
                 <div className="category-cont">
                    <div className="title">PROJECT
                    {this.state.selectedProjectBool && <span onClick={this.toggle.bind(this,"Project")} className="icon-icn_up_arrow drop-icon"></span>}
                    {!this.state.selectedProjectBool && <span onClick={this.toggle.bind(this,"Project")} className="icon-icn_drop_down drop-icon"></span>}
                    {
                        this.state.selectedProjectBool && <Search type={this.state.search_tags}/>                                        
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
                    {this.state.selectedSizeBool && <div className="">
                        {this.state.sizeArr.map((item,index) =>  {                                    
                                    return(
                                        <div className="">
                                            <label className="container sub-cat-cont-input"><span>{item.name}</span>
                                            </label>
                                            <input type="text" className="data-input"></input>
                                        </div> 
                                )                   
                            })
                        }
                    </div>   }             
                </div>

            <button className="side-bar-search" onClick={()=>this.filtersearch(this)}>Search</button>               
        </div>  
        </div>
        );
    }
}

export default SideNavBar;