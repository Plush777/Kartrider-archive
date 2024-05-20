import * as S from "style/components/sub/Sidebar.style";
import SCangleArrow from 'svg/ico-angle-arrow.svg';
import Link from "next/link";

export default function Sidebar({ 
    wrapClassName, 
    dimmedClassName, 
    groupData, 
    detailsData, 
    listData, 
    children, 
    sidebarRef  
}) {
    return (
        <>
            <S.Wrap ref={sidebarRef} className={wrapClassName}>
                <S.Inner>
                    {children}
                    {groupData.map((group, groupIndex) => {
                        // console.log(Object.values(detailsData[groupIndex])[0])

                        return (
                            <S.Group key={groupIndex}>
                                <S.SectionText>{group.title}</S.SectionText>

                                {detailsData[groupIndex]?.group.map((details, detailsIndex) => {
                                    // console.log(listData[groupIndex].group[detailsIndex].item)

                                    return (
                                        <S.DetailsWrap key={detailsIndex}>
                                            <S.Details>
                                                <S.Summary>{details}</S.Summary>
                                                <S.List>
                                                    {listData[groupIndex].group[detailsIndex]?.item.map((list, listIndex) => {
                                                        return (
                                                            <S.Item key={listIndex}>
                                                                <Link href={list.href}>{list.title}</Link>
                                                            </S.Item>
                                                        )
                                                    })}
                                                </S.List>
                                            </S.Details>
                                            <SCangleArrow width="34px" height="34px" fill="var(--text1)" />
                                        </S.DetailsWrap>
                                        
                                    )
                                })}

                            </S.Group>
                        )
                    })}
                </S.Inner>
            </S.Wrap>
            <S.Dimmed aria-hidden="true" className={dimmedClassName} />
        </>
       
    )
}