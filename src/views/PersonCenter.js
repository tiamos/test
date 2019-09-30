import React,{useEffect,useContext} from 'react';
import MyFooter from "./MyFooter";
import {Link} from "react-router-dom";
import {Button, Modal} from "antd-mobile";
import My from "../My";
import {MyContext} from "../reducer";

function PersonCenter(){

	const {userinfo} = useContext(MyContext);
	const {dispatch} = useContext(MyContext);

	useEffect(()=>{
		if(JSON.stringify(userinfo) === "{}"){
			My.loading();
			My.get('/users/info',
				(resq)=>{
					My.loadingHide();
					dispatch({type:'changeInfo',info:resq.data.objres[0]});
				})
		}
	},[])


	const btnClick = ()=>{
		Modal.alert('确定退出吗', '', [
			{ text: '取消', onPress: () => {}},
			{ text: '确定', onPress: () => {
					My.get('/users/logout',
						()=>{
							My.route('/login');
							dispatch({type:'changeInfo',info:{}});
						})
				} },
		]);
	}

	return(
		<div>
			<div className={'person_center'}>
				<div className={'person_center_head'}>
					<img src={'../../logo.jpg'}/>
					<div>
						<p>{userinfo.name}</p>
						<p>{userinfo.intro}</p>
					</div>
				</div>
				<div className={'person_center_list'}>
					<Link to={'/my_recruiting'}><div><i className={'iconfont icon-skip'}></i>抢单中<i className={'iconfont icon-jiantouyou'}></i></div></Link>
					<Link to={'/my_demanding'}><div><i className={'iconfont icon-lvyoutehui'}></i>请求中<i className={'iconfont icon-jiantouyou'}></i></div></Link>
					<Link to={'/my_recruite'}><div><i className={'iconfont icon-xiaoxi'}></i>我的抢单<i className={'iconfont icon-jiantouyou'}></i></div></Link>
					<Link to={'/my_demands'}><div><i className={'iconfont icon-ceshishenqing'}></i>我的请求<i className={'iconfont icon-jiantouyou'}></i></div></Link>
					<Link to={'/change_info'}><div><i className={'iconfont icon-wanshanxinxi-'}></i>修改信息<i className={'iconfont icon-jiantouyou'}></i></div></Link>
					<Link to={'/test'}><div><i className={'iconfont icon-shezhi'}></i>更换头像<i className={'iconfont icon-jiantouyou'}></i></div></Link>
					<Link to={'/test'}><div><i className={'iconfont icon-shezhi'}></i>测试<i className={'iconfont icon-jiantouyou'}></i></div></Link>
				</div>
				<Button type={'primary'} size={'small'} style={{margin:'10px',touchAction: 'none'}} onClick={btnClick}>退出登录</Button>
			</div>
			<MyFooter/>
		</div>
	)
}

export default PersonCenter;