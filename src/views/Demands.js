import React, {useState,useContext} from 'react';
import MyHead from "./MyHead";
import MyFooter from "./MyFooter";

import {List, InputItem, TextareaItem, Button, DatePicker, Modal} from 'antd-mobile';
import {MyContext} from "../reducer";
import My from "../My";

function Demands(){

	const nowTimeStamp = Date.now();
	const now = new Date(nowTimeStamp);
	const [formData,formChange] = useState({time:now,title:'',info:"",require:"",addr:"",price:""})
	const changeForm = (e,type)=>{
		let newData = JSON.parse(JSON.stringify(formData));
		newData.time = formData.time;
		newData[type] = e;
		formChange(newData);
	}

	const {userinfo} = useContext(MyContext)

	const btnClick = ()=>{

		if(formData.title === ''){My.tips('标题不能为空')}
		else if(formData.info === ''){My.tips('内容不能为空')}
		else if(formData.require === ''){My.tips('要求不能为空')}
		else if(formData.addr === ''){My.tips('地点不能为空')}
		else if(formData.price === ''){My.tips('费用不能为空')}
		else {
			Modal.alert('确定发布需求吗', '', [
				{ text: '取消', onPress: () => {}},
				{ text: '确定', onPress: () => {
						newDemand()
					} },
			]);
		}
	}

	const newDemand = ()=>{
		let data = JSON.parse(JSON.stringify(formData));
		data.time = formData.time.toLocaleDateString();
		data.state = "recruiting";
		data.stateZh = "应征中";
		data.account = userinfo.account;
		data.name = userinfo.name;
		data.list = [];
		My.loading();
		My.post('/demands/new_demand',data,()=>{
			My.loadingHide();
			My.successTips('新增需求成功，请到请求中关注进度',2.5,'/index');
		})
	}

	return (
		<div>
			<MyHead name={'发起请求'}/>
			<div className={'dd_list'}>
				<List>
					<InputItem value={formData.title} onChange={(e)=>{changeForm(e,'title')}}>请求标题</InputItem>
					<TextareaItem
						title="请求内容"
						autoHeight
						value={formData.info}
						onChange={(e)=>{changeForm(e,'info')}}
					/>
					<TextareaItem
						title="要求"
						autoHeight
						value={formData.require}
						onChange={(e)=>{changeForm(e,'require')}}
					/>
					<DatePicker
						mode="date"
						title="选择日期"
						value={formData.time}
						onChange={(e)=>{changeForm(e,'time')}}
					>
						<List.Item arrow="horizontal">Date</List.Item>
					</DatePicker>
					<InputItem value={formData.addr} onChange={(e)=>{changeForm(e,'addr')}}>地点</InputItem>
					<InputItem value={formData.price}  onChange={(e)=>{changeForm(e,'price')}}>费用</InputItem>
				</List>
				<Button type={'primary'} size={'small'} style={{margin:'10px',touchAction: 'none'}} onClick={()=>{btnClick()}}>add</Button>
			</div>
			<MyFooter/>
		</div>
	)
}

export default Demands;