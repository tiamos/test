import React,{useState,useEffect} from 'react';
import MyHead from "./MyHead";
import {Button, Modal, TextareaItem} from "antd-mobile";
import My from "../My";

function MyDemandingDetail(props){

	const id = props.location.query.id;
	const [data,dataChange] = useState({});
	const [domNum,domNumChange] = useState(0);

	useEffect(()=>{
		My.loading();
		My.post('/demands/detail_data',{'id':id},(resq)=>{
			let dt = resq.data.objres[0]
			dataChange(dt);
			My.loadingHide();
			if(dt.list.length === 0){
				domNumChange(1);
			}
			else if(dt.state === 'recruiting'){
				domNumChange(2);
			}
			else {
				domNumChange(3);
			}
		})
	},[]);

	function returnDom(){
		switch (domNum) {
			case 1:return noman();break;
			case 2:return manList(data.list);break;
			case 3:return doneDemand();break;
		}
	}

	function noman(){
		return (
			<div style={{textAlign:'center'}}>暂时无人抢单</div>
		)
	}

	function manList(manList){
		return (
			<div>
				<div className={'MDD_manlist'}>
					{
						manList.map((item,index)=>{
							return(<div key={index}>{item.name}<Button style={{float:'right'}}  size={'small'} type={'primary'} onClick={()=>{showAlert(item.account)}}>选择此人</Button></div>)
						})
					}
				</div>
				<p style={{margin:'0 auto',width:'85%'}}>点击名称查看信息</p>
			</div>
		)
	}

	const showAlert = (account)=>{
		Modal.alert('确定选择此人吗', '', [
			{ text: '取消', onPress: () => {}},
			{ text: '确定', onPress: () => {postData(account)}},
		]);
	}

	const postData = (account)=>{
		let postData = {account:account,id:id}
		My.loading()
		My.post('/demands/choice_recruite',postData,()=>{
			My.loadingHide();
			My.successTips('选择成功，请联系对方',2,'/index');
		})
	}


	const [modal,modalChange] = useState(false);
	const [modalInfo,modalInfoChange] = useState({title:'评价',evalute:'',btn:'完成'})

	const doneEvent = (boo)=>{
		modalChange(true);
		if(boo === true){
			modalInfoChange({title:'评价',evalute:'',btn:'完成'})
		}
		else {
			modalInfoChange({title:'原因',evalute:'',btn:'未完成'})
		}
	}

	const infoChange = (e)=>{
		let newm = JSON.parse(JSON.stringify(modalInfo));
		newm.evalute = e;
		modalInfoChange(newm)
	}

	function evalPostData(btn,info){
		if(btn == '完成'){
			let postData = {id:id,info:info}
			My.loading()
			My.post('/demands/done',postData,()=>{
				My.loadingHide();
				My.successTips('提交成功',2,'/index');
			})
		}
		else {
			let postData = {id:id,info:info}
			My.loading()
			My.post('/demands/undone',postData,()=>{
				My.loadingHide();
				My.successTips('提交成功',2,'/index');
			})
		}
	}

	function doneDemand(){
		return (
			<div className={'MDD_doneBtn'}>
				<Button size={"small"} type={'primary'} onClick={()=>{doneEvent(true)}}>完成工作</Button>
				<Button size={"small"} onClick={()=>{doneEvent(false)}}>未完成</Button>
				<Modal
					popup
					visible={modal}
					onClose={()=>{modalChange(false)}}
					animationType="slide-up"
				>
					<div className={'padding'}>
						<div>{modalInfo.title}</div>
						<div style={{border:'solid 1px #ddd',borderRadius:'5px',margin:'15px 0'}}>
							<TextareaItem  autoHeight value={modalInfo.evalute} onChange={(e)=>{infoChange(e)}}/>
						</div>
						<Button type="primary" size={'small'} onClick={()=>{evalPostData(modalInfo.btn,modalInfo.evalute)}}>{modalInfo.btn}</Button>
					</div>
				</Modal>
			</div>
		)
	}



	return (
		<div>
			<MyHead name={'请求详情'}/>
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
				{returnDom()}
			</div>
		</div>
	)
}

export default MyDemandingDetail;