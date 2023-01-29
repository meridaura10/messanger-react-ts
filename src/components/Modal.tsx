import React, { FC, useEffect } from 'react'
import Arrrow from '../img/Arrrow'

interface ModalProps {
    children: React.ReactNode,
    close: () => void,
    headerText: string,
}

const Modal: FC<ModalProps> = ({
    children,
    close,
    headerText,
}) => {
    useEffect(() => {

    }, [])
    return (
        <div className='absolute  bg-overlay w-full h-full top-0 left-0 flex flex-col justify-center  bottom-0 right-0'>
            <div className='w-full p-2 max-w-[600px] rounded-lg h-full max-h-[600px] bg-white mx-auto'>
                <div className='flex justify-between items-center'>
                    <div className='cursor-pointer' onClick={close}>
                        <Arrrow />
                    </div>
                    <div className='font-bold w-full text-center text-lg'>
                        {headerText}
                    </div>
                </div>
                <div className='py-2'>
                    {
                        children
                    }
                </div>
            </div>
        </div>
    )
}

export default Modal