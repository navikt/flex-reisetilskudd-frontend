import React, { useEffect, useRef, useState } from 'react'
import Vis from '../diverse/vis'
import { useAppStore } from '../../data/stores/app-store'


interface AnimateOnMountProps {
    mounted: boolean;
    enter: string;
    leave: string;
    start: string;
    children: React.ReactElement;
}

const AnimateOnMount = (props: AnimateOnMountProps) => {
    const { mounted, enter, leave, start, children } = props
    const { top, setTop } = useAppStore()
    const [ styles, setStyles ] = useState<string>(null as any)
    const [ show, setShow ] = useState<boolean>(mounted)
    const animRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (animRef!.current!.offsetTop > top) {
            setTop(animRef!.current!.offsetTop - 100)
        }
        if (mounted) {
            setShow(true)
            setStyles(enter)
        } else {
            setStyles(leave)
        }
        // eslint-disable-next-line
    }, [ mounted ]);

    const onTransitionEnd = () => {
        window.scrollTo({ top: top, behavior: 'smooth' })
        if (styles === leave) {
            setShow(false)
        }
    }

    return (
        <div ref={animRef} className={`${start} ${styles}`} onTransitionEnd={onTransitionEnd}>
            <Vis hvis={show}>
                {children}
            </Vis>
        </div>
    )
}

export default AnimateOnMount
