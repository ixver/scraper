import React, {useState, createContext, useContext, useEffect} from "react";

export const AccountContext = createContext();
export const AccountUpdateContext = createContext();

export function useAccount() {
	return useContext(AccountContext);
}
export function useAccountUpdate() {
	return useContext(AccountUpdateContext);
}

export const AccountProvider0 = ({children}) => {
	const [accounttogglestate, setaccounttogglestate] = useState(true);
	useEffect(() => {}, [accounttogglestate]);
	function handleaccounttoggle() {
		setaccounttogglestate((accounttogglestate) => !accounttogglestate);
	}
	return (
		<AccountContext.Provider value={accounttogglestate}>
			<AccountUpdateContext.Provider value={handleaccounttoggle}>{children}</AccountUpdateContext.Provider>
		</AccountContext.Provider>
	);
};

export const AccountProvider = ({children}) => {
	const [accounttogglestate, setaccounttogglestate] = useState(true);
	useEffect(() => {}, [accounttogglestate]);
	function handleaccounttoggle() {
		setaccounttogglestate((accounttogglestate) => !accounttogglestate);
		console.log("context check", accounttogglestate);
	}
	return (
		<AccountContext.Provider value={accounttogglestate}>
			<AccountUpdateContext.Provider value={handleaccounttoggle}>{children}</AccountUpdateContext.Provider>
		</AccountContext.Provider>
	);
};
