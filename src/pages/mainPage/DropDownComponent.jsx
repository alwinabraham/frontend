import { Fragment,useState,useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { reportPost } from "../../api/PostRequests";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function DropdownComponent({postId,userId}) {
  
    const [reportModal,setReportModal] = useState("")
    const [report,setReport] = useState(null)

    const reportObj = {
      userId:userId,
      postId:postId,
      reason:report
    }
    
    const handleReport = async () =>{
      if(reportObj.reason){
        await reportPost(reportObj)
      }
    }

    useEffect(() => {
      handleReport()
      setReport(null)
    }, [report])
    
    return (
      <>
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex justify-center text-sm font-medium text-gray-700 ">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                </Menu.Button>
            </div>
 
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                  <Menu.Item>
                      {({ active }) => (
                          <button
                              // type="submit"
                              className={classNames(
                                  active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                  "block w-full text-left px-4 py-2 text-sm"
                              )}
                              onClick={() => setReportModal(true)}
                          >
                              Report
                          </button>
                          )}
                          </Menu.Item>
                      </div>
                  </Menu.Items>
              </Transition>
          </Menu>
          
          {reportModal ? (
            <>
              <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">
                        Reason For Report
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setReportModal(false)}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <p className="p-2 cursor-pointer" onClick={()=>{setReport("I just dont Like it"),setReportModal(false)}}>I just dont Like it</p>
                      <p className="p-2 cursor-pointer" onClick={()=>{setReport("It's spam"),setReportModal(false)}}>It's spam</p>
                      <p className="p-2 cursor-pointer" onClick={()=>{setReport("Nudity or sexual activity"),setReportModal(false)}}>Nudity or sexual activity</p>
                      <p className="p-2 cursor-pointer" onClick={()=>{setReport("Hate speech or symbols"),setReportModal(false)}}>Hate speech or symbols</p>
                      <p className="p-2 cursor-pointer" onClick={()=>{setReport("False information"),setReportModal(false)}}>False information</p>
                      <p className="p-2 cursor-pointer" onClick={()=>{setReport("Bullying or harassment"),setReportModal(false)}}>Bullying or harassment</p>
                      <p className="p-2 cursor-pointer" onClick={()=>{setReport("Scam or fraud"),setReportModal(false)}}>Scam or fraud</p>
                      <p className="p-2 cursor-pointer" onClick={()=>{setReport("Violence or dangerous organizations"),setReportModal(false)}}>Violence or dangerous organizations</p>
                      <p className="p-2 cursor-pointer" onClick={()=>{setReport("Intellectual property violation"),setReportModal(false)}}>Intellectual property violation</p>
                      <p className="p-2 cursor-pointer" onClick={()=>{setReport("Sale of illeagal or regulated goods"),setReportModal(false)}}>Sale of illeagal or regulated goods</p>
                      <p className="p-2 cursor-pointer" onClick={()=>{setReport("Suicide or self-injury"),setReportModal(false)}}>Suicide or self-injury</p>
                      <p className="p-2 cursor-pointer" onClick={()=>{setReport("Eating disorders"),setReportModal(false)}}>Eating disorders</p>
                      <p className="p-2 cursor-pointer" onClick={()=>{setReport("Something else"),setReportModal(false)}}>Something else</p>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setReportModal(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
      </>                    
    );
}