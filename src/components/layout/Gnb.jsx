import * as Headerstyled from "../style/layout/Header.style";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Gnb = () => {

    let gnbData = useSelector(state => state.gnb);

    return ( 
        <>
            <Headerstyled.Gnb role="navigation">
                <Headerstyled.GnbList>
                    {gnbData.map((item,index) => {
                        return(
                            <Headerstyled.GnbItem className={item.className} key={index} 
                            onClick={() => {index === 3 && alert('준비중인 콘텐츠에요.')}}>
                                <NavLink to={item.link} title={item.name} className={({isActive}) => isActive ? 'active' : null}>{item.name}</NavLink>
                            </Headerstyled.GnbItem>
                        )
                    })}
                </Headerstyled.GnbList>
            </Headerstyled.Gnb>
        </>
     );
}

export default Gnb;