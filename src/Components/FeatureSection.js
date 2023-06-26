import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import axios from 'axios'

// THIRD PARTY
import { Formik } from 'formik'
import * as Yup from 'yup'

// OTHERS
import { SYNTHESIA_API_URL } from '../config'

const features = [
  {
    name: 'Easy',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Fast',
    description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
    icon: LockClosedIcon,
  },
]

export default function FeatureSection({setFetch, fetch}) {

  return (
    <div className="overflow-hidden bg-slate-200 pt-24 sm:pt-32 pb-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Convert text to speech</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Syntheisa.io</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Enter text in the text area and get a virtual person delivering it!
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <Formik
            initialValues={{
              script: '',
              title: '',
              description: ''
            }}

            validationSchema={
              Yup.object().shape({
                script: Yup.string().required(),
                title: Yup.string().required(),
                description: Yup.string().required()
              })
            }

            onSubmit={async (values) => {
              // Create video
              axios.post(`${SYNTHESIA_API_URL}`, {
                "test": true,
                "title": values?.title,
                "description": values?.description,
                "visibility": "public",
                "callbackId": "hassan@contrivers.dev",
                "input": [{
                  "scriptText": values?.script,
                  "avatar": "anna_costume1_cameraA",
                  "avatarSettings": {
                    "voice": "1364e02b-bdae-4d39-bc2d-6c4a34814968",
                    "horizontalAlign": "center",
                    "scale": 1.0,
                    "style": "rectangular",
                    "backgroundColor": "#F2F7FF",
                    "seamless": false
                  },
                  "background": "off_white",
                  "backgroundSettings": {
                    "videoSettings": {
                      "shortBackgroundContentMatchMode": "freeze",
                      "longBackgroundContentMatchMode": "trim"
                    }
                  }
                }],
                "soundtrack": "urban"
              }, {
                headers: {
                  Authorization: `${process.env.REACT_APP_SYNTHESIA_API_KEY}`
                }
              }).then((res)=>{
                console.log("Create Video: ", res.data)
                setFetch(!fetch)
              }).catch((err)=>{
                console.log("Create video error: ", err)
              })
            }}
          >
            {({
              errors,
              handleChange,
              handleSubmit,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-y-4">
                  {/* TITLE */}
                  <div>
                    <label className='text-base font-semibold leading-7 text-indigo-600'>Enter Title</label>
                    <input
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      className='w-[48rem] max-w-none rounded-xl shadow-xl outline-none sm:w-[57rem] md:-ml-4 lg:-ml-0 xl:pr-48 pl-6 py-6 text-gray-700'
                    ></input>
                    {errors.title ? (
                      <span className="text-xs text-red-500">{errors.title}</span>
                    ) : null}
                  </div>

                  {/* DESCRIPTION */}
                  <div>
                    <label className='text-base font-semibold leading-7 text-indigo-600'>Enter Description</label>
                    <input
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      className='w-[48rem] max-w-none rounded-xl shadow-xl outline-none sm:w-[57rem] md:-ml-4 lg:-ml-0 xl:pr-48 pl-6 py-6 text-gray-700'
                    ></input>
                    {errors.description ? (
                      <span className="text-xs text-red-500">{errors.description}</span>
                    ) : null}
                  </div>

                  {/* SCRIPT */}
                  <div>
                    <label className='text-base font-semibold leading-7 text-indigo-600'>Enter Script</label>
                    <textarea
                      name="script"
                      value={values.script}
                      rows={8}
                      onChange={handleChange}
                      className='w-[48rem] max-w-none rounded-xl shadow-xl outline-none sm:w-[57rem] md:-ml-4 lg:-ml-0 xl:pr-48 pl-6 py-6 text-gray-700'
                    ></textarea>
                    {errors.script ? (
                      <span className="text-xs text-red-500">{errors.script}</span>
                    ) : null}
                  </div>
                </div>

                <div className="">
                  <button
                    className="mt-4 text-indigo-500 hover:text-indigo-700"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </Formik>

          {/* <img
            src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
            alt="Product screenshot"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          /> */}
        </div>
      </div>
    </div>
  )
}
