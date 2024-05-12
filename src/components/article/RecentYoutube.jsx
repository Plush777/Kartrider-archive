import RecentYoutubeList from 'components/article/RecentYoutubeList';
import VideoState from 'components/article/VideoState';
import * as Mainstyled from 'components/style/common/Area.style';
import Select from 'components/common/Select';
import MainTitle from 'components/article/MainTitle';
import { useQuery } from '@tanstack/react-query';
import { fetchRecentLists } from 'scripts/api/rssYoutube';
import { keyArray, getRandomKey } from 'data/recent';
import { useState } from 'react';
import { lottieSrc, mainTitle } from 'const';

const RecentYoutube = ({ sectionName }) => {
    let [selectKey, setSelectKey] = useState(getRandomKey(keyArray));

    const { data, isLoading, isError } = useQuery({
        queryKey: ["youtubeRecentLists", selectKey],
        queryFn: () => fetchRecentLists(selectKey),
        staleTime: 1000 * 60 * 5, // 5분
        gcTime: 1000 * 60 * 10, // 10분
        retry: 1
    })

    return(
        <Mainstyled.MainComponentBox data-section-name={sectionName}>
            <MainTitle
                lottieName="youtube"
                lottieSrc={lottieSrc.youtube}
                title={mainTitle.youtube}
                marginBottom="20px"
                right={<Select data="channels" selectKey={selectKey} setSelectKey={setSelectKey} 
                width="190px" height="36px" />}
            />
            
            <Mainstyled.MainInner minHeight="var(--mainHeightDefault)">
                {isError && <VideoState type='error'/>}

                {
                    isLoading ? 
                    <VideoState type='loading'/> 
                    : 
                    <RecentYoutubeList data={data} isLoading={isLoading} selectKey={selectKey} setSelectKey={setSelectKey}/>
                }
            </Mainstyled.MainInner>
        </Mainstyled.MainComponentBox>
    )
}

export default RecentYoutube;