import React,{useEffect} from 'react';
import {HashRouter as Router, Route,Redirect} from "react-router-dom";
import 'antd-mobile/dist/antd-mobile.less'
import './demo.less'
import './icon.css'

import {Mycomponent} from "./reducer";


import PersonCenter from './views/PersonCenter'
import Demands from "./views/Demands";
import RecruiteDetail from "./views/RecruiteDetail";
import Recruite from "./views/Recruite";
import Test from "./views/Test";
import Test2 from "./views/Test2";
import MyRecruite from "./views/MyRecruite";
import MyRecruiteDetail from "./views/MyRecruiteDetail";
import MyRecruiting from "./views/MyRecruiting";
import MyRecruitingDetail from "./views/MyRecruitingDetail";
import MyDemands from "./views/MyDemands";
import MyDemandDetail from "./views/MyDemandDetail";
import MyDemanding from "./views/MyDemanding";
import MyDemandingDetail from "./views/MyDemandingDetail";
import ChangeInfo from "./views/ChangeInfo";
import ChangeImg from "./views/ChangeImg";
import PersonInfo from "./views/PersonInfo";
import Register from "./views/Register";
import Login from "./views/Login";
import My from "./My";

function getCookie(name) {
	let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}

function App() {


	useEffect(()=>{
		console.log('im app')
		if(getCookie('account')){
			My.route('/index')
		}
		else {
			My.route('/login')
		}
	},[])

	return (
		<Router>
			<Mycomponent>

				<Route path={'/login'} render={()=>(
					getCookie('account')?(<Redirect to={'/index'}/>):(<Login/>)
				)}/>

				<Route path={'/index'} render={()=>(
					getCookie('account')?(<PersonCenter/>):(<Redirect to={'/login'}/>)
				)}/>

				<Route path={'/demands'} render={()=>(
					getCookie('account')?(<Demands/>):(<Redirect to={'/login'}/>)
				)}/>


				<Route path={'/test'} component={Test}/>
				<Route path={'/test2'} component={Test2}/>

				<Route path={'/recruite_detail'} component={RecruiteDetail}/>
				<Route path={'/recruite'} component={Recruite}/>
				<Route path={'/my_recruite'} component={MyRecruite}/>
				<Route path={'/my_recruite_detail'} component={MyRecruiteDetail}/>
				<Route path={'/my_recruiting'} component={MyRecruiting}/>
				<Route path={'/my_recruiting_detail'} component={MyRecruitingDetail}/>
				<Route path={'/my_demands'} component={MyDemands}/>
				<Route path={'/my_demand_detail'} component={MyDemandDetail}/>
				<Route path={'/my_demanding'} component={MyDemanding}/>
				<Route path={'/my_demanding_detail'} component={MyDemandingDetail}/>

				<Route path={'/change_info'} component={ChangeInfo}/>
				<Route path={'/change_img'} component={ChangeImg}/>
				<Route path={'/person_info'} component={PersonInfo}/>
				<Route path={'/register'} component={Register}/>

			</Mycomponent>
		</Router>
	);
}

export default App;
