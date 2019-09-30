import React from 'react';

function MyHead(props){

	const returnfn = ()=>{
		window.history.go(-1);
	}

	let back;
	if(props.back !== false){
		back = <i className={'iconfont icon-qiehuanqizuo'} onClick={()=>{returnfn()}}></i>
	}

	return (
		<div className={'MyHead'}>
			{back}
			{props.name}
		</div>
	)
}

export default MyHead;