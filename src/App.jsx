import GlobalStyle from './GlobalStyle';
import './font.scss';
import { useEffect, useState } from 'react';
import Main from './components/Main';
import { Route, Routes } from "react-router-dom";
import SubSpeed from "./components/sub/speed/SubSpeed";
import SubItem from "./components/sub/item/SubItem";
import SubCommonKartbody from "./components/sub/kartbody/common/SubCommonKartbody";
import SubCommonCharacter from "./components/sub/character/common/SubCommonCharacter";
import itemContentsData from './data/mode/itemMode/contents.json';
import speedContentsData from './data/mode/speedMode/contents.json';
import kartbodyCommonContentsData from './data/kartbody/common/contents.json';
import characterCommonContentsData from './data/character/common/contents.json';
import Notfound from "./components/Notfound";
import { ThemeProvider } from 'styled-components';
import theme from './components/style/theme';
import mixins from './components/style/mixins';
import RouteScroll from './Routes/RouteScroll';
import { useLocation } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import { setRouterScroll } from './redux/store/store';
import SkipNavigation from './components/SkipNavigation';

const App = () => {
	let [itemContents] = useState(itemContentsData);
    let [speedContents] = useState(speedContentsData);
	let [commonContents] = useState(kartbodyCommonContentsData);
	let [characterCommonContents] = useState(characterCommonContentsData);
	const { pathname } = useLocation();
	let dispatch = useDispatch();
	let routerScroll = useSelector(state => state.routerScroll);

	useEffect(() => {
		if(pathname === '/' || pathname.startsWith('/mode')){
			dispatch(setRouterScroll(true));
		}
	},[pathname,dispatch]);

	return (
		<>
			<SkipNavigation/>
			{routerScroll && <RouteScroll/>}
			<GlobalStyle/>
			<ThemeProvider theme={theme} mixins={mixins}>
				<Routes>
					<Route path="/" element={<Main/>}/>
					<Route path="/mode/speed" element={<SubSpeed speedContents={speedContents}/>}/>
					<Route path="/mode/item" element={<SubItem itemContents={itemContents}/>}/>
					<Route path={`/kartbody/common/:id`} element={<SubCommonKartbody commonContents={commonContents}/>}/>
					<Route path="/character/common" element={<SubCommonCharacter characterCommonContents={characterCommonContents}/>}/>
					<Route path="*" element={<Notfound/>} />
        		</Routes>
			</ThemeProvider>
		</>  
	);
}

export default App;
