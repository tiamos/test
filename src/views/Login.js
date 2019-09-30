import React,{useState} from 'react';
import MyHead from "./MyHead";
import {Button, InputItem, List} from "antd-mobile";
import My from "../My";
import {Link} from "react-router-dom";

function Login() {
	const [formData,formChange] = useState({account:'',password:""})

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

		// 后台验证
		else {
			My.loading();
			My.post('/users/login',formData,
				(resq)=>{
					if(resq.data.result === 0){
						My.loadingHide();
						My.route('/index')
					}
					else{
						My.loadingHide();
						My.tips('账号或密码错误')
					}
				})
		}
	}

	return (
		<div>
			<MyHead name={'累了么'} back={false}/>
			<div className={'dd_list'} style={{marginTop:'30px'}}>
				<List style={{padding:'15px 15px 0'}}>
					<InputItem value={formData.account} onChange={(e)=>{changeForm(e,'account')}}>账号</InputItem>
					<InputItem type={"password"} value={formData.password} onChange={(e)=>{changeForm(e,'password')}}>密码</InputItem>
				</List>
				<div className={'login_link'}>
					<span><Link to={'/register'}>注册账号</Link></span>
					<span><Link to={'/recruite'}>进入大厅</Link></span>
				</div>
				<Button type={'primary'} size={'small'} style={{margin:'10px',touchAction: 'none'}} onClick={btnClick}>登录</Button>
			</div>
		</div>
	)
}

export default Login;