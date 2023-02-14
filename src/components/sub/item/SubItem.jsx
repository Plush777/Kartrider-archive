import React from 'react';
import SubTab from '../SubTab';
import SubVisual from '../SubVisual';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import ItemContents from './ItemContents';
import Meta from '../../../Meta/MetaTag';
import FootDonate from '../../article/FootDonate';

const SubItem = (props) => {

    const metaData = {
        title: 'KartRider Tips | 모드 | 아이템전',
        robots: 'index, follow'
    }

    return (  
        <>
            <Meta data={metaData}/>
            <Header/>
            <main role="main" id='main'>
                <SubVisual/>
                <SubTab commonContents={props.commonContents}/>
                <ItemContents itemContents={props.itemContents}/>
                <FootDonate/>
                <Footer/>
            </main>
        </>
    );
}

export default SubItem;