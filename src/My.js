import axios from 'axios'
import {Toast} from "antd-mobile";
import {createHashHistory} from 'history'


const My = {
	getCookie:(name)=>{
		let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg))
			return unescape(arr[2]);
		else
			return null;
	},
	get:(url,thenfn=()=>{},catchfn=()=>{})=>{
		axios.get(url)
			.then((resq)=>{
				console.log(resq);
				thenfn(resq)
			})
			.catch((resq)=>{
				console.log(resq);
				catchfn(resq)
			})
	},
	post:(url,data,thenfn=()=>{},catchfn=()=>{})=>{
		axios.post(url,data)
			.then((resq)=>{
				console.log(resq);
				thenfn(resq)
			})
			.catch((resq)=>{
				console.log(resq);
				catchfn(resq)
			})
	},
	loading:()=>{
		Toast.loading('Loading...', 0);
	},
	loadingHide:()=>{
		Toast.hide();
	},
	tips:(info,time=1.5)=>{
		Toast.info(info,time);
	},
	successTips:(info,time=1.5,path=null)=>{
		Toast.success(info,time);
		const history = createHashHistory();
		if(path == null){}
		else {setTimeout(()=>{
			history.push(path)
		},time*1000)}
	},
	route:(path)=>{
		const history = createHashHistory();
		history.push(path)
	}
}

export default My