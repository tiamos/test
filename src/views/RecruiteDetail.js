import React,{useEffect,useState,useContext} from 'react';
import MyHead from "./MyHead";
import {Button, Modal} from "antd-mobile";
import My from "../My";
import {MyContext} from "../reducer";

function RecruiteDetail(props){

	const {userinfo} = useContext(MyContext)
	const id = props.location.query.id;
	const [data,dataChange] = useState({})

	useEffect(()=>{
		My.loading();
		My.post('/demands/recruite_detail',{'id':id},(resq)=>{
			let dt = resq.data.objres[0]
			dataChange(dt);
			My.loadingHide()
		})
	},[]);

	const btnClick = ()=>{
		if(My.getCookie('account') === null){
			My.route('/login')
		}
		else {
			Modal.alert('确定接单吗', '', [
				{ text: '取消', onPress: () => {}},
				{ text: '确定', onPress: () => {postEvent()}},
			]);
		}
	}

	const postEvent = ()=>{
		let postData = {
			person:{
				name:userinfo.name,
				account:userinfo.account,
				choice:false
			},
			id:id
		}
		My.loading()
		My.post('/demands/recruite',postData,(resq)=>{
			My.loadingHide();
			let resdata = resq.data;
			if(resdata.result === 0){
				My.successTips('接单成功,请在抢单中查看进度',2,'/index')
			}
			else if(resdata.msg == "你已接单"){
				My.tips("你已接单");
			}
			else if(resdata.msg == "请求人不能与发起人一致"){
				My.tips("请求人不能与发起人一致");
			}
		})
	}

	return (
		<div>
			<MyHead name={'请求详情'}/>
			<div className="dd_box dd_list">
				<div className="dd_head"><span className="state">【{data.stateZh}】</span>{data.title}</div>
				<div className="dd_info">{data.title}</div>
				<div className="dd_unit">
					<div>要求：</div>
					<div>{data.require}</div>
				</div>
				<div className="dd_unit">
					<div>时间：</div>
					<div>{data.time}</div>
				</div>
				<div className="dd_unit">
					<div>地址：</div>
					<div>{data.addr}</div>
				</div>
				<div className="dd_unit">
					<div>联系人：</div>
					<div>{data.name}</div>
				</div>
				<div className="dd_unit">
					<div>费用：</div>
					<div>{data.price}</div>
				</div>
				<Button type={'primary'} size={'small'} style={{margin:'10px',touchAction: 'none'}} onClick={btnClick}>抢单</Button>
			</div>
		</div>
	)
}

export default RecruiteDetail;