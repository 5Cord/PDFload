import { Responses404 } from '@consta/uikit/Responses404';
import cl from './styles.module.css'

export default function NotFound() {
    return (
        <div className={cl.containerErrorResponse}>
            <Responses404 />
        </div>
    )
}
