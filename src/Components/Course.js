import React, { useRef, useEffect, useState } from 'react'
import Header from './Header'
import CourseNavigation from './CourseNavigation'
import VideoPlayer from './VideoPlayer'

// IMAGES
import AWSLogo from '../images/aws-logo.png'

// Third party
import axios from 'axios'

// REDUX
import { useSelector } from 'react-redux'

// Config
import { SYNTHESIA_API_URL } from '../config'

// ICONS
import { ReactComponent as PlayIcon } from '../icons/playButton.svg'

const Course = () => {

    // STATES
    const [videoList, setVideoList] = useState([])
    const [videoUrl, setVideoUrl] = useState(null)

    // REF
    const divRefs = [
        useRef(null),
        useRef(null),
    ];

    // REDUX
    const { user_email } = useSelector((state => state.user))

    // METHODS
    const handleClick = (index) => {
        divRefs[index]?.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // PLAY VIDEO ON CLICK
    const handleVideoPlayClick = (id, disable) => {
        setVideoUrl(null)
        if (!disable) {
            getVideo(id);
        }
    }

    // GET VIDEO - BASED ON ID
    const getVideo = (id) => {
        axios.get(`${SYNTHESIA_API_URL}/${id}`, {
            headers: {
                Authorization: `${process.env.REACT_APP_SYNTHESIA_API_KEY}`
            }
        }).then((res) => {
            setVideoUrl(res?.data?.download)
        }).catch((err) => {
            console.log("GET VIDEO ERROR: ", err)
        })
    }

    ///// USEEFFECT //////
    useEffect(() => {
        // GET ALL VIDEOS
        axios.get(`${SYNTHESIA_API_URL}`, {
            headers: {
                Authorization: `${process.env.REACT_APP_SYNTHESIA_API_KEY}`
            }
        }).then((res) => {
            setVideoList(res?.data?.videos)
        }).catch((err) => {
            console.log("GET ALL VIDEOS ERROR: ", err);
        })

    }, [])

    return (
        <>
            <Header />

            {/* HERO SECTION */}
            <div className=' bg-indigo-500 h-52 px-10 py-14 flex justify-between items-center'>
                <p className=' text-white text-4xl font-bold'>Amazon Web Services</p>
                <img src={AWSLogo} className=' object-contain w-52 h-20'></img>
            </div>

            {/* Course Navigation */}
            <CourseNavigation handleClick={handleClick} />

            {/* Course Details */}
            <div className=' h-72 bg-gray-100 px-10 py-10 grid grid-cols-12 place-items-center' ref={divRefs[0]}>
                <div className='col-span-9'>
                    <p className='text-gray-800 text-2xl'>About this course</p>
                    <p className='text-md text-gray-800 text-justify mt-3 pr-8'>Indigenous Canada is a 12-lesson Massive Open Online Course (MOOC) from the Faculty of Native Studies that explores the different histories and contemporary perspectives of Indigenous peoples living in Canada. From an Indigenous perspective, this course explores complex experiences Indigenous peoples face today from a historical and critical perspective highlighting national and local Indigenous-settler relations. Topics for the 12 lessons include the fur trade and other exchange relationships, land claims and environmental impacts, legal systems and rights, political conflicts and alliances, Indigenous political activism, and contemporary Indigenous life, art and its expressions.</p>
                </div>
                <div className='col-span-3'></div>
            </div>

            {/* Course Modules */}
            <div ref={divRefs[1]} className='grid grid-cols-1 divide-y-2'>
                <div className='grid-cols-12 grid gap-y-4 pt-10 mb-8'>
                    <div className='col-span-2 grid grid-cols-1 gap-y-6 place-items-center'>
                        <p>WEEK</p>
                        <p className=' text-5xl'>1</p>
                    </div>
                    <div className='col-span-10 grid grid-cols-1 gap-y-4 p-3'>
                        <p>2 hours to complete</p>
                        <p className='text-xl'>AWS</p>
                        <p>In this introductory module, students learn the significance of stories and storytelling in Indigenous societies. We explore history that comes from Indigenous worldviews, this includes worldviews from the Inuit, Nehiyawak, Kanien:keha’ka and Tlingit peoples.</p>
                        <p>4 videos (Total 51 min), 2 readings, 1 quiz</p>
                    </div>
                </div>

                <div className='grid-cols-12 grid gap-y-4 pt-10 pb-10'>
                    <div className='col-span-2 grid grid-cols-1 gap-y-6 place-items-center'>
                        <p>WEEK</p>
                        <p className=' text-5xl'>1</p>
                    </div>
                    <div className='col-span-10 grid grid-cols-1 gap-y-4 p-3'>
                        <p>2 hours to complete</p>
                        <p className='text-xl'>AWS</p>
                        <p>In this introductory module, students learn the significance of stories and storytelling in Indigenous societies. We explore history that comes from Indigenous worldviews, this includes worldviews from the Inuit, Nehiyawak, Kanien:keha’ka and Tlingit peoples.</p>
                        <p>4 videos (Total 51 min), 2 readings, 1 quiz</p>
                    </div>
                </div>
            </div>

            {/* VIDEOS */}
            {/* List of Videos */}
            <div className="grid grid-cols-3 gap-x-6 gap-y-6 py-10 px-32 bg-gray-800">
                {
                    videoList.map((video) => {
                        console.log("callback: ", video.callbackId, user_email)
                        return (video?.callbackId && video?.callbackId === user_email) ? <div className="px-6 py-5 rounded-md bg-gray-50 grid grid-cols-8 gap-x-0 cursor-pointer hover:bg-gray-100" onClick={() => handleVideoPlayClick(video?.id, video.status === 'in_progress')}>
                            <PlayIcon className="text-orange-600 col-span-1" />
                            <span className={`${video.status === 'in_progress' ? 'col-span-5' : 'col-span-7'} pt-1 `}>{video?.title}</span>
                            {
                                video.status === 'in_progress' ? <span className="text-xs rounded-full col-span-2 bg-indigo-600 p-2 text-center text-white">Processing</span> : <></>
                            }
                        </div> : <></>
                    })
                }
            </div>
            {
                videoUrl ? <VideoPlayer videoUrl={videoUrl} /> : <></>
            }

        </>
    )
}

export default Course