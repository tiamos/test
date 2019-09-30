import React,{useState,useEffect} from 'react';
import MyFooter from "./MyFooter";
import MyHead from "./MyHead";
import {Link} from "react-router-dom";
import My from "../My";

function Recruite(){

	const [list,listChange] = useState([]);
	const [dom,domChange] = useState(<p></p>);

	useEffect(()=>{
		My.loading();
		My.get('/demands/recruiting_data',(resq)=>{
			let MyData = resq.data.objres;
			if(MyData === undefined){
				domChange(<p style={{textAlign:'center'}}>暂无请求信息</p>)
			}
			else {
				listChange(MyData);
			}
			My.loadingHide();
		})
	},[])


	return (
		<div>
			<MyHead name={'抢单大厅'}  back={false}/>
			<div className={'dd_list'}>
				{
					list.map((item,index)=>{
						return (
							<Link to={{pathname:'/recruite_detail',query:{id:item._id}}} key={index}>
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

export default Recruite;