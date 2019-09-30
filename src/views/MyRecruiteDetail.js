import React,{useState,useEffect} from 'react';
import MyHead from "./MyHead";
import My from "../My";

function MyRecruiteDetail(props){

	const id =props.location.query.id;
	const [data,dataChange] = useState([]);

	useEffect(()=>{
		My.loading();
		My.post('/demands/detail_data',{'id':id},(resq)=>{
			let dt = resq.data.objres[0]
			dataChange(dt);
			My.loadingHide();
		})
	},[]);

	return (
		<div>
			<MyHead name={'抢单详情'}/>
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
			</div>
		</div>
	)
}

export default MyRecruiteDetail;