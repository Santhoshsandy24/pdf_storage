'use client'
import { uploadToS3 } from '@/lib/s3';
import { useMutation } from '@tanstack/react-query';
import { Inbox, Loader2 } from 'lucide-react';
import React ,{useState}from 'react'
import {useDropzone} from "react-dropzone"
import axios from "axios";
import toast from 'react-hot-toast';



const Fileupload = () => {
   
    const {mutate,} = useMutation({
        mutationFn: async ({
            file_key,
            file_name,
        }:{ 
            file_key:string;
            file_name:string;
            
        }
        )=>{
            const response = await axios.post("/api/create-chat",{file_key,file_name
            });
            return response.data;

        }

    })
    const {getRootProps , getInputProps} = useDropzone({
        accept:{'application/pdf':[".pdf"]},
        maxFiles:1,
        onDrop:async (acceptedFile)=>{
            console.log(acceptedFile);
            const file = acceptedFile[0]
            if (file.size > 10 *1024*1024){
                toast.error("File to large ➖")
            
                return 
            }
            try {
                
                const data = await uploadToS3(file)
                if(!data?.file_key || !data.file_name){
                   toast.error("something went wrong ")
                    return ;

                }

                mutate(data,{
                    onSuccess:(data)=>{
                        console.log(data);


                    },
                    onError:(err)=>
                    toast.error("error creating chat"),
                })
                
            } catch (error) {
                console.log(error);

                
            }
            finally{
                
            }
            
        }
    });
    
  return (
    <div className='p-2 bg-white rounded-xl'>
        <div{...getRootProps({
            className:'border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col'
        }
        )}>
            <input{...getInputProps()} />
            
                
            
                <>
                <Inbox className='w-10 h-10 text-blue-500'/>
                <p className='mt-2 text-sm text-slate-400'>Drop PDF here 😍 </p>
                </>
                
            
           
        </div>
        


    </div>
  )
}

export default Fileupload

function async(arg0: { file_key: any; file_name: any; }, arg1: {}) {
    throw new Error('Function not implemented.');
}
