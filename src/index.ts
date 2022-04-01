import Main from "./api/main";


Main('spar')

setInterval(()=> {
	Main('spar')
}, 60000 * 240)