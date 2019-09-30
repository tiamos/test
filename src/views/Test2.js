import React,{useState} from 'react'
import { Modal, List, Button, WhiteSpace, WingBlank, Icon } from 'antd-mobile';



function Test2(){

	const [modal,modalChange] = useState(false);

	return (
		<WingBlank>
			<Button onClick={()=>{modalChange(true)}}>popup</Button>
			<WhiteSpace />
			<Modal
				popup
				visible={modal}
				onClose={()=>{modalChange(false)}}
				animationType="slide-up"
				afterClose={() => { alert('afterClose'); }}
			>
				<List renderHeader={() => <div>委托买入</div>} className="popup-list">
					{['股票名称', '股票代码', '买入价格'].map((i, index) => (
						<List.Item key={index}>{i}</List.Item>
					))}
					<List.Item>
						<Button type="primary" onClick={()=>{modalChange(false)}}>买入</Button>
					</List.Item>
				</List>
			</Modal>
		</WingBlank>
	);
}




export  default Test2;