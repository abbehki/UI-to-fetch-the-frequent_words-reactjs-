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

        }
    }

    selectPlatform(platformName){
        this.setState({selectedPlatform:platformName})
    }
    selectIcon(icon){
        this.setState({selectedIcon:icon})
    }
    selectDate(selectedDate){
        this.setState({selectedDate:selectedDate})
    }
    selectSize(selectedSize){
        this.setState({selectedSize:selectedSize})
    }

    render(){
        return(
            <div className="side-nav-cont">
                 <Search type={this.state.search_tags}/>           
            <div className="filter-cont">
                 <div className="hide-factes">Hide Factes</div> 
                 {/* platform section */}
                 <div className="category-cont">
                    <div className="title">PROJECT<span className="icon-icn_drop_down:before"></span></div> 
                    <Search type={this.state.search_tags}/>                                        
                </div>
                {/* platform section */}
                 <div className="category-cont">
                    <div className="title">PLATFORM<span className="icon-icn_drop_down:before"></span></div>
                    <div className="">
                        {this.state.platformArr.map((item,index) =>  {                                    
                                    return(
                                        <div className="">
                                            <label className="container sub-cat-cont"><span>{item.name}</span>
                                                <input type="checkbox"  onClick={this.selectPlatform.bind(this,item.name)}/>  
                                                <span className="checkmark"></span>
                                            </label>
                                            <div className="data-count">{item.count}</div>
                                        </div> 
                                )                   
                            })
                        }
                    </div>                    
                </div> 
                        {/* Icons section */}
                 <div className="category-cont">
                    <div className="title">ICONS<span className="icon-icn_drop_down:before"></span></div>
                    <div className="">
                        {this.state.icons.map((item,index) =>  {                                    
                                    return(
                                        <div className="">
                                            <label className="container sub-cat-cont"><span>{item.name}</span>
                                                <input type="checkbox"  onClick={this.selectIcon.bind(this,item.name)}/>  
                                                <span className="checkmark"></span>
                                            </label>
                                            <div className="data-count">{item.count}</div>
                                        </div> 
                                )                   
                            })
                        }
                    </div>                    
                </div>
                        {/* Date section */}
                 <div className="category-cont">
                    <div className="title">BY DATE<span className="icon-icn_drop_down:before"></span></div>
                    <div className="">
                        {this.state.dateArr.map((item,index) =>  {                                    
                                    return(
                                        <div className="">
                                            <label className="container sub-cat-cont"><span>{item.name}</span>
                                                <input type="checkbox"  onClick={this.selectDate.bind(this,item.name)}/>  
                                                <span className="checkmark"></span>
                                            </label>
                                            <div className="data-count">{item.count}</div>
                                        </div> 
                                )                   
                            })
                        }
                    </div>                    
                </div>
                {/* SIZE section */}
                 <div className="category-cont">
                    <div className="title">BY SIZE<span className="icon-icn_drop_down:before"></span></div>
                    <div className="">
                        {this.state.sizeArr.map((item,index) =>  {                                    
                                    return(
                                        <div className="">
                                            <label className="container sub-cat-cont"><span>{item.name}</span>
                                                <input type="checkbox"  onClick={this.selectSize.bind(this,item.name)}/>  
                                                <span className="checkmark"></span>
                                            </label>
                                            <div className="data-count">{item.count}</div>
                                        </div> 
                                )                   
                            })
                        }
                    </div>                    
                </div>

            </div>                 
        </div>  
        );
    }
}

export default SideNavBar;