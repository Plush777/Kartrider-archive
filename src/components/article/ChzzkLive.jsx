import ChzzkLiveList from 'components/article/ChzzkLiveList';
import VideoState from 'components/article/VideoState';
import LoadingSpinner from 'components/article/LoadingSpinner';
import * as Mainstyled from 'components/style/common/Area.style';
import * as Buttonstyled from 'components/style/common/Button.style';
import { useInfiniteQuery } from "@tanstack/react-query";
import useImageTransition from 'hooks/useImageTransition';
import SCarrowDown from 'svg/ico-select-arrow-down.svg';
import SCrefresh from 'svg/ico-refresh.svg';
import MainTitle from 'components/article/MainTitle';
import { useState } from 'react';
import { fetchChzzkLiveLists } from 'scripts/api/chzzkLive';
import styled from 'styled-components';
import { format } from 'date-fns';
import { M500, Min768 } from 'components/style/mobile/MediaQuery';
import { lottieSrc, mainTitle, message } from 'const';

const RefetchButton = styled.button`
    display: flex;
    align-items: center;
    column-gap: 6px;
    margin-top: auto;
    transition: .3s ease-in-out;

    &[disabled]{
        opacity: 0.5;
        pointer-events: none;
    }

    ${({ theme }) => theme.mobile`
        height: 30px;

        svg {
            margin-top: -2px;
            width: 22px;
            height: 22px;
        }

        span:not(.hidden) {
            color: var(--text1);
            font-size: .8125rem;
        }
    `};
`

const LastUpdate = styled.time`
    font-size: .8125rem;
    color: var(--description);
    white-space: nowrap;

    ${({ theme }) => theme.mobile`
        white-space: pre-wrap;
    `};
`

const RightGroup = styled.div`
    display: flex;
    align-items: flex-end;
    column-gap: 10px;
   

    ${({ theme }) => theme.mobile`
        flex-direction: column-reverse;
        flex-wrap: wrap;
        align-items: flex-start;
        margin-right: auto;
        margin-top: 10px;
    `};
`

const ChzzkLive = ({ sectionName }) => {
    let [click, setClick] = useState(false);

    const clickMoreButton = () => {
        setClick(true);
    }

    const { 
        data: chzzk, 
        isLoading: chzzkLoading, 
        fetchNextPage: chzzkFetchNextPage, 
        hasNextPage: chzzkHasNextPage, 
        isFetchingNextPage: chzzkFetchingNextPage,
        isError: chzzkError,
        refetch: chzzkRefetch,
        isRefetching: chzzkRefetching,
        isFetched: chzzkFetched,
        dataUpdatedAt: chzzkUpdatedAt,
    } = useInfiniteQuery({
        queryKey: ["chzzkLists"],
        queryFn: fetchChzzkLiveLists,
        initialPageParam: 0,
        staleTime: 0,
        refetchInterval: 1000 * 60 * 5, // 5분
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === 0 ? undefined : allPages.length;
        }
    });

    const { isShow } = useImageTransition(chzzkLoading, 300);

    // console.log(chzzk);

    const renderMoreButton = () => {
        if (chzzk) {
            if (chzzk.pages[0].length < 3) return;
            if (chzzkHasNextPage && !chzzkRefetching) {
                return (
                    <Buttonstyled.BtnWrap className={!chzzkLoading && !chzzkFetchingNextPage && isShow}>
                        <Buttonstyled.BtnArea outline>
                            <Buttonstyled.Button hasIcon type='button' minWidth="100px" onClick={
                                () => {
                                    chzzkFetchNextPage();
                                    clickMoreButton();
                                }
                            }>
                                <span>더보기</span>
                                <SCarrowDown width="20px" height="20px"/>
                            </Buttonstyled.Button>
                        </Buttonstyled.BtnArea>
                    </Buttonstyled.BtnWrap>
                )
            }
            
        }
    }

    const renderEmpty = () => {
        if (chzzk) {
            if (chzzk.pages[0].length === 0 && !chzzkRefetching) {
                return <VideoState type='empty' emptyText={message.empty}/>
            }
        }
    }

    const renderLiveList = () => {
        if (chzzk) {
            if (chzzkLoading || chzzkRefetching) {
                return <VideoState type='loading' styleClassName='item3'/>
            } 
            
            if (!chzzkLoading || !chzzkRefetching && chzzk.pages[0].length > 0) {
                return <ChzzkLiveList data={chzzk} loading={chzzkLoading}/>
            }
        }
    }

    const disabledCondition = chzzkLoading || chzzkError || chzzk && chzzk.pages[0].length === 0 ? true : false;
    const formattedUpdatedAt = format(new Date(chzzkUpdatedAt),'yyyy-MM-dd HH:mm:ss');
    const noDataCondition = click == true && chzzk && !chzzkHasNextPage;
   
    return(
        <Mainstyled.MainComponentBox data-section-name={sectionName}>
            <MainTitle 
                lottieName="live"
                lottieSrc={lottieSrc.live}
                title={mainTitle.live}
                marginBottom="20px"
                right={
                    <RightGroup>
                        {chzzkFetched && <LastUpdate>{`마지막 업데이트: ${formattedUpdatedAt}`}</LastUpdate>}
                        <RefetchButton 
                            type="button" 
                            disabled={disabledCondition} 
                            onClick={chzzkRefetch}>
                            <SCrefresh width="30px" height="30px" fill="var(--text1)"/>
                            <Min768>
                                <span className="hidden">새로고침</span> 
                            </Min768>
                            <M500>
                                <span>새로고침</span>
                            </M500>
                        </RefetchButton>
                    </RightGroup>
                }
            />
           
            <Mainstyled.MainInner minHeight="var(--mainHeightDefault)">
                {chzzkError && <VideoState type='error' styleClassName='item3'/>}
               
                {renderLiveList()}

                {chzzkFetchingNextPage && <LoadingSpinner/>}

                {renderEmpty()}

                {noDataCondition && <Mainstyled.LoadText>{message.noData}</Mainstyled.LoadText>}

                {renderMoreButton()}
            </Mainstyled.MainInner>
        </Mainstyled.MainComponentBox>
    )
}

export default ChzzkLive;