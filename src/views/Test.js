import React from 'react';
import MyFooter from "./MyFooter";
import MyHead from "./MyHead";
import {Button} from "antd-mobile";
import axios from 'axios'

function Test(){

	const test = ()=>{
		fetch('/users/test')
			.then((res)=>res.json())
			.then(data=>{
				console.log(data)
			})
	}

	const post = ()=>{
		let data = {page:'1',row:'2'}
		axios.post('users/posttest',data)
			.then((resq)=>{
				console.log(resq)
			})
	}

	const setCookieTest = ()=>{
		let data = {page:'lalala',row:'qweqweqwe'}
		axios.post('users/cookie_set_test',data)
			.then((resq)=>{
				console.log(resq)
			})
	}

	const checkCookie = ()=>{
		axios.get('users/check_cookie')
			.then((resq)=>{
				console.log(resq)
			})
	}

	const dbTest = ()=>{
		axios.get('users/db_test')
			.then((resq)=>{
				console.log(resq)
			})
	}

	return (
		<div>
			<MyHead name={'Test'}/>
			<Button onClick={test}>add</Button>
			<Button onClick={post}>post</Button>
			<Button onClick={setCookieTest}>setCookieTest</Button>
			<Button onClick={checkCookie}>checkCookie</Button>
			<Button onClick={dbTest}>dbTest</Button>
			<MyFooter/>
		</div>
	)
}

export default Test;