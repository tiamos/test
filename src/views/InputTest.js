import { DatePicker, List } from 'antd-mobile';
import React,{Component} from 'react';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);



class Demo extends Component {
	state = {
		date: now
	}
	render() {
		return (
			<List className="date-picker-list" style={{ backgroundColor: 'white' }}>

				<DatePicker
					mode="date"
					title="Select Date"
					extra="Optional"
					value={this.state.date}
					onChange={date => this.setState({ date })}
				>
					<List.Item arrow="horizontal">Date</List.Item>
				</DatePicker>


			</List>
		);
	}
}

export default Demo

