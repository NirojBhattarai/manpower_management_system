import React from 'react'
import arrowBackIcon from '../../../../assets/icons/arrow_back.svg'
import locationIcon from '../../../../assets/icons/location.svg'
import contactIcon from '../../../../assets/icons/contact.svg'
import { useNavigate } from 'react-router-dom'

const PreApprovalDofeDetail: React.FC = () => {
   const navigate = useNavigate()

   const handleClickNavigate = () => {
      navigate('/jobs/jobs-applicants')
   }
   return (
      <div className='h-full w-full px-5 py-6 bg-surface rounded-lg'>

         {/* Heading */}
         <div className='flex items-center justify-start'>
            <div className='flex justify-start gap-4'>
               <img
                  onClick={handleClickNavigate}
                  className='cursor-pointer'
                  src={arrowBackIcon}
                  alt="" />
               <span className='typography-heading-poppins-medium text-Black-700'>Job Applicants Details</span>
            </div>
         </div>

         {/* Details*/}
         <div className='mt-10 px-2 flex flex-col gap-2'>

            {/* Name and status */}
            <div className='flex items-center gap-3.5'>
               <span className='typography-p1-medium text-Black-300'>Suman Bhatt</span>
               <span className='typography-caption-c1 px-2.5 py-1 bg-yellow/30 rounded-lg'>Applied</span>
            </div>

            {/* Address */}
            <div className='flex items-center gap-0.5'>
               <img src={locationIcon} alt="" />
               <span className='typography-caption-c1-semibold text-Black-200'>Kathmandu, Nepal</span>
            </div>

            {/* Contact */}
            <div className='flex items-center gap-0.5'>
               <img src={contactIcon} alt="" />
               <span className='typography-caption-c1 text-primary'>9801108822</span>
            </div>
         </div>


         {/* Details */}
         <div className='mt-5'>
            <div className='px-6 pt-6 pb-12 mt-8 bg-white rounded-lg'>
               <p className='typography-p2-semibold text-text-color'>Job Applicants (Apply For a Job)</p>

               <div className='mt-6 w-full flex flex-col justify-center gap-5'>

                  {/* Title */}
                  <div className='flex items-center gap-8'>
                     <p className='w-1/4 typography-p2-regular text-Black-300'>Full Name</p>
                     <p className='w-3/4 typography-p2-regular text-Black-300'>Suman Bhatt</p>
                  </div>

                  {/* Country */}
                  <div className='flex items-center gap-8'>
                     <p className='w-1/4 typography-p2-regular text-Black-300'>Country</p>
                     <p className='w-3/4 typography-p2-regular text-Black-300'>Dubai</p>
                  </div>



                  {/* Company Name */}
                  <div className='flex items-center gap-8'>
                     <p className='w-1/4 typography-p2-regular text-Black-300'>Comapany Name</p>
                     <p className='w-3/4 typography-p2-regular text-Black-300'>XYZ company</p>
                  </div>

                  {/* Job Vacancy */}
                  <div className='flex items-center gap-8'>
                     <p className='w-1/4 typography-p2-regular text-Black-300'>Job Vaccancy</p>
                     <p className='w-3/4 typography-p2-regular text-Black-300'>Frontend Developer</p>
                  </div>

                  {/* Country */}
                  <div className='flex items-center gap-8'>
                     <p className='w-1/4 typography-p2-regular text-Black-300'>Country</p>
                     <p className='w-3/4 typography-p2-regular text-Black-300'>Full-stack developer with expertise in React.js and Node.js. I have built scalable web applications. Full-stack developer with expertise in React.js and Node.js. I have built scalable web applications  </p>
                  </div>


               </div>
            </div>
         </div>

      </div>

   )
}

export default PreApprovalDofeDetail