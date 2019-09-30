import React from 'react';
import {Link} from "react-router-dom";

function MyFooter(){
	return (
		<div className={'MyFooter'}>
			<Link to={'/recruite'}>
				<div>
					<i className={'iconfont icon-huaban-'}></i>
					<p>抢单</p>
				</div>
			</Link>
			<Link to={'/demands'}>
				<div>
					<i className={'iconfont icon-tianjia'}></i>
					<p>新增需求</p>
				</div>
			</Link>
			<Link to={'/index'}>
				<div>
					<i className={'iconfont icon-huiyuan'}></i>
					<p>个人中心</p>
				</div>
			</Link>
		</div>
	)
}

export default MyFooter;