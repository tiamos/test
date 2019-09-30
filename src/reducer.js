import React,{createContext,useReducer} from 'react'

export const MyContext = createContext({})

const reducer =(state,action)=>{
	let newState = JSON.parse(JSON.stringify(state));
	switch (action.type) {
		case 'changeInfo':{
			newState = action.info;
			return newState;
		}

	}
}

export const Mycomponent = props =>{

	const [userinfo,dispatch] = useReducer(reducer,{});

	return (
		<MyContext.Provider value={{userinfo,dispatch}}>
			{props.children}
		</MyContext.Provider>
	)
}