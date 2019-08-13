import React from 'react'
import matter from 'gray-matter';
import Link from 'next/link';
import { MdContext } from '../utils/mdContext'

const MdPages = function(props) {

    return (
        <>
            <MdContext.Consumer>
                {pages => (
                    pages.map(({ document: { data }, slug }) => (
                        <li className={props.itemClass}  key={slug}>
                        <Link href="/markdown/[id]" as={`/markdown/${slug}`}>
                        <a className={props.linkClass}>{data.title}</a>
                        </Link>
                        </li>
                    )
                    )
                )}
            </MdContext.Consumer>
        </>
    )
}


export default MdPages;