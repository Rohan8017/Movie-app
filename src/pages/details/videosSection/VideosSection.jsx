import React, { useState } from 'react';
import ContentWrapper from '../../../component/contentWrapper/ContentWrapper';
import Img from '../../../component/lazyloding/Img';
import { PlayIcon } from "../Playbtn";
import "./style.scss";
import VideoPopup from '../../../component/videoPopup/VideoPopup';

const VideosSection = ({ data, loading }) => {
    const [showIndex, setShowIndex] = useState(-1)
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className='videosSection'>
            <ContentWrapper>
                <div className="sectionHeading">Official Videos</div>
                {!loading ? (
                    <div className="videos">
                        {data?.map((video,index) => {
                            return (
                                <div 
                                    className="videoItem" 
                                    key={video.id} 
                                    onClick={() => {
                                        setVideoId(video.key);
                                        setShow(true);
                                    }}
                                >
                                    <div className="videoThumbnail">
                                        <Img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} />
                                        <PlayIcon />
                                    </div>
                                    {video.name.split(' ').length <= 6 ? (
                                        <div className="videoTitle">
                                            {video.name}
                                        </div>
                                    ) : (
                                        <div className="videoTitle " onClick={()=>setShowIndex(index)}>
                                            {showIndex === index ? (<>
                                                {video.name}
                                            </>):(
                                                <>
                                                {video.name.split(' ').slice(0, 6).join(' ')}
                                                <span>...</span>
                                                </>
                                            )}
                                        </div>
                                    )}

                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )
                }
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    )
}

export default VideosSection
