import React,{useState} from 'react';
import MyHead from "./MyHead";
import {Button, InputItem, List, TextareaItem} from "antd-mobile";
import MyFooter from "./MyFooter";
import My from "../My";

function Register() {

	// 数据初始化
	const [formData,formChange] = useState({account:'',password:'',password2:'',name:'',phone:'',intro:''})

	// 数据change
	const changeForm = (e,type)=>{
		let newData = JSON.parse(JSON.stringify(formData));
		newData[type] = e;
		formChange(newData);
	}

	// 数据提交
	const btnClick = ()=>{

		// 前台验证
		console.log(formData);
		if(formData.account === ''){My.tips('账号不能为空')}
		else if(formData.password === ''){My.tips('密码不能为空')}
		else if(formData.password2 === ''){My.tips('确认密码不能为空')}
		else if(formData.name === ''){My.tips('昵称不能为空')}
		else if(formData.phone === ''){My.tips('手机不能为空')}
		else if(formData.intro === ''){My.tips('手机不能为空')}
		else if(formData.password !== formData.password2){My.tips('输入密码需要一致')}

		// 后台验证
		else {
			My.loading();
			My.post('/users/register',formData,
				(resq)=>{
					if(resq.data.result === 0){
						My.loadingHide();
						My.successTips('创建成功',2,'login')
					}
					else if(resq.data.msg === '账号已存在'){
						My.loadingHide();
						My.tips('账号已存在')
					}
					else if(resq.data.msg === '昵称已存在'){
						My.loadingHide();
						My.tips('昵称已存在')
					}
				})
		}
	}

	return (
		<div>
			<MyHead name={'注册账号'}/>
			<div className={'dd_list'}>
				<List>
					<InputItem value={formData.account} onChange={(e)=>{changeForm(e,'account')}}>账号</InputItem>
					<InputItem type={"password"} value={formData.password} onChange={(e)=>{changeForm(e,'password')}}>密码</InputItem>
					<InputItem type={"password"} value={formData.password2} onChange={(e)=>{changeForm(e,'password2')}}>确认密码</InputItem>
					<InputItem value={formData.name} onChange={(e)=>{changeForm(e,'name')}}>昵称</InputItem>
					<InputItem type="phone" value={formData.phone} onChange={(e)=>{changeForm(e,'phone')}}>手机号</InputItem>
					<TextareaItem title="个人简介" autoHeight value={formData.intro} onChange={(e)=>{changeForm(e,'intro')}}/>
				</List>
				<Button type={'primary'} size={'small'} style={{margin:'10px',touchAction: 'none'}} onClick={btnClick}>add</Button>
			</div>
			<MyFooter/>
		</div>
	)
}

export default Register;