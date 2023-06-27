// Component Imports
import Header from "./Components/Header";
import FeatureSection from "./Components/FeatureSection";
import VideoPlayer from "./Components/VideoPlayer";

// React Imports
import { useEffect, useState } from "react";

// REDUX
import { useSelector } from "react-redux";

// Third Party Imports
import axios from "axios";

// Other Imports
import { SYNTHESIA_API_URL } from './config'

// ICONS
import { ReactComponent as PlayIcon } from './icons/playButton.svg'

// GPT
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: "org-Ag8sVoxMZ3zgVnva3VSgwArb",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

function App() {

  ///// STATES /////
  const [videoUrl, setVideoUrl] = useState(null)
  const [videoList, setVideoList] = useState([]);
  const [fetch, setFetch] = useState(false);

  // REDUX
  const { user_email } = useSelector((state) => state.user);

  ///// METHODS /////

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

  // PLAY VIDEO ON CLICK
  const handleVideoPlayClick = (id, disable) => {
    setVideoUrl(null)
    if (!disable) {
      getVideo(id);
    }
  }

  ///// USEEFFECT //////
  useEffect(() => {

    // (async () => {
    //   const response = await openai.createCompletion({
    //     "model": "gpt-3.5-turbo",
    //     "messages": [{"role": "user", "content": "Say this is a test!"}],
    //     "temperature": 0.7
    //   });
    //   console.log("TEST:", response);
    // })()

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

  }, [fetch])

  return (
    <div className="bg-slate-200 min-h-screen">
      <Header />
      <FeatureSection setFetch={setFetch} fetch={fetch} />

      {/* List of Videos */}
      <div className="grid grid-cols-3 gap-x-6 gap-y-6 py-10 px-32">
        {
          videoList.map((video) => {
            console.log("callback: ",video.callbackId, user_email)
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
    </div>
  );
}

export default App;
