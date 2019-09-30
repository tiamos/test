import React from 'react';
import MyHead from "./MyHead";
import {Button} from "antd-mobile";

function MyRecruitingDetail(){
	return(
		<div>
			<div>
				<MyHead name={'请求详情'}/>
				<div className="dd_box dd_list">
					<div className="dd_head"><span className="state">【请求中】</span>室内清洁2小时，200平米</div>
					<div className="dd_info">室内清洁2小时，200平米</div>
					<div className="dd_unit">
						<div>要求：</div>
						<div>要求很大要求很大</div>
					</div>
					<div className="dd_unit">
						<div>时间：</div>
						<div>22018-48-48</div>
					</div>
					<div className="dd_unit">
						<div>地址：</div>
						<div>中山市时期区裕华花园娱乐园2039座</div>
					</div>
					<div className="dd_unit">
						<div>联系人：</div>
						<div>黄小姐</div>
					</div>
					<div className="dd_unit">
						<div>费用：</div>
						<div>2588</div>
					</div>
					<Button type={'primary'} size={'small'} style={{margin:'10px',touchAction: 'none'}} >抢单</Button>
				</div>
			</div>
		</div>
	)
}

export default MyRecruitingDetail;