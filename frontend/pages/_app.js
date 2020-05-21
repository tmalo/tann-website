import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCommentDots} from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCommentDots)

function MyApp({ Component, pageProps }) {
    return (
    <Component {...pageProps} />
    )
}

export default MyApp