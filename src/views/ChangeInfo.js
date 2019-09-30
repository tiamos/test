import React,{useState,useContext} from 'react';
import MyHead from "./MyHead";
import {Button, InputItem, List, TextareaItem} from "antd-mobile";
import MyFooter from "./MyFooter";
import {MyContext} from '../reducer'
import My from "../My";

function ChangeInfo() {

	const {userinfo} = useContext(MyContext);
	const {dispatch} = useContext(MyContext)

	const [formData,formChange] = useState(userinfo)

	const changeForm = (e,type)=>{
		let newData = JSON.parse(JSON.stringify(formData));
		newData[type] = e;
		formChange(newData);
	}

	const btnClick = ()=>{
		dispatch({type:'changeInfo',info:formData});
		My.loading();
		My.post('/users/change_info',formData,()=>{
			My.loadingHide();
			My.route('/index');
		});
	}



	return (
		<div>
			<MyHead name={'修改信息'}/>
			<div className={'dd_list'}>
				<List>
					<InputItem value={formData.name} onChange={(e)=>{changeForm(e,'name')}}>昵称</InputItem>
					<InputItem type="phone" value={formData.phone} onChange={(e)=>{changeForm(e,'phone')}}>手机号</InputItem>
					<TextareaItem title="个人简介" autoHeight value={formData.intro} onChange={(e)=>{changeForm(e,'intro')}}/>
				</List>
				<Button type={'primary'} size={'small'} style={{margin:'10px',touchAction: 'none'}} onClick={()=>{btnClick()}}>保存修改</Button>
			</div>
			<MyFooter/>
		</div>
	)
}

export default ChangeInfo;