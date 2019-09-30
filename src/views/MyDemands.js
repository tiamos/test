import React,{useState,useEffect} from 'react';
import MyHead from "./MyHead";
import {Link} from "react-router-dom";
import MyFooter from "./MyFooter";
import My from "../My";

function MyDemands(){

	const [list,listChange] = useState([]);
	const [dom,domChange] = useState(<p></p>);

	useEffect(()=>{
		My.loading();
		My.get('/demands/mydemand_data',(resq)=>{
			let MyData = resq.data.objres;
			if(MyData === undefined){
				domChange(<p style={{textAlign:'center'}}>暂无请求</p>)
			}
			else {
				listChange(MyData);
			}
			My.loadingHide();
		})
	},[])

	return (
		<div>
			<MyHead name={'我的请求'}/>
			<div className={'dd_list'}>
				{
					list.map((item,index)=>{
						return (
							<Link to={{pathname:'/my_demand_detail',query:{id:item._id}}} key={index}>
								<div  className={'demand_unit'}>
									<div>
										<p>{item.title}</p>
										<p>{item.time}</p>
										<p>{item.addr}</p>
									</div>
									<div>￥{item.price}</div>
								</div>
							</Link>
						)
					})
				}
			</div>
			{dom}
			<MyFooter/>
		</div>
	)
}

export default MyDemands;